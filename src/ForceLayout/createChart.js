import * as d3 from 'd3';
import * as _ from 'lodash';
import { linkConfig, nodeConfig, EVENTS, eventDispatch } from './configs';
import setSvg from './helpers/setSVG';
import setSimulation from './helpers/setSimulation';
import insertHull from './helpers/insertHull';
import insertLink from './helpers/insertLink';
import insertNode from './helpers/insertNode';
import updateNode from './helpers/updateNode';
import convertToHullPathPoints from './helpers/convertToHullPathPoints';

export default function createChart(svgRef) {
  const svg = setSvg(svgRef);
  const simulation = setSimulation();
  simulation.on('tick', ticked);

  let hull = svg.append('g').attr('class', 'hulls').selectAll('.hull');

  let link = svg
    .append('g')
    .attr('class', 'links')
    .selectAll(`.${linkConfig.CLASS_NAME_SELECTOR}`);

  let node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll(`.${nodeConfig.CLASS_NAME_SELECTOR}`);

  let nodesData = [];
  let linksData = [];

  eventDispatch.on(EVENTS.CLICK_HULL, (groupId) => {
    const groups = _.groupBy(nodesData, 'group');
    const clickedGroup = groups[groupId];
    const originalNodes = _.get(clickedGroup, '[0].nodes');
    const isNeedToCollapse = clickedGroup.length >= 2;
    const isNeedToExpand = !isNeedToCollapse && Boolean(originalNodes);

    if (isNeedToCollapse) {
      const mergedNode = {
        nodes: clickedGroup,
        id: `group-${groupId}`,
        text: `group-${groupId}`,
        group: groupId,
        x: _.meanBy(clickedGroup, 'x'),
        y: _.meanBy(clickedGroup, 'y'),
        vx: _.meanBy(clickedGroup, 'vx'),
        vy: _.meanBy(clickedGroup, 'vy'),
      };

      const newNodes = nodesData
        .filter((d) => d.group !== groupId)
        .concat(mergedNode);

      const newLinks = linksData.map((link) => {
        const originalSource = _.cloneDeep(link.source);
        const originalTarget = _.cloneDeep(link.target);

        if (link.source.group === groupId) {
          link.source = _.cloneDeep(mergedNode);
          link.source.originalId = originalSource.id;
        }

        if (link.target.group === groupId) {
          link.target = _.cloneDeep(mergedNode);
          link.target.originalId = originalTarget.id;
        }

        return link;
      });

      update({ nodes: newNodes, links: newLinks });
    }

    if (isNeedToExpand) {
      const newNodes = nodesData
        .filter((d) => d.group !== groupId)
        .concat(originalNodes);

      const newLinks = linksData.map((link) => {
        if (link.source.group === groupId) {
          const original = newNodes.filter(
            (n) => n.id === link.source.originalId
          );
          link.source = original[0];
        }
        if (link.target.group === groupId) {
          const original = newNodes.filter(
            (n) => n.id === link.target.originalId
          );
          link.target = original[0];
        }
        return link;
      });

      update({ nodes: newNodes, links: newLinks });
    }
  });

  function ticked() {
    node.attr('transform', (d) => `translate(${d.x},${d.y})`);

    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    hull.attr('d', (g) => {
      const nodeGroups = _.groupBy(nodesData, 'group');
      const hullPathPoints = convertToHullPathPoints(nodeGroups[g]);
      return d3.line()(hullPathPoints);
    });
  }

  function update({ nodes, links }) {
    // Make a shallow copy to protect against mutation, while
    // recycling old nodes to preserve position and velocity.
    const old = new Map(node.data().map((d) => [d.id, d]));
    nodesData = nodes.map((d) => Object.assign(old.get(d.id) || {}, d));
    linksData = links.map((d) => Object.assign({}, d));

    // Update chart selections
    node = node.data(nodesData, (d) => d.id).join(insertNode, updateNode);
    link = link.data(linksData, (d) => [d.source, d.target]).join(insertLink);
    hull = hull
      .data(_.unionBy(nodesData.map((node) => node.group)))
      .join(insertHull);

    simulation.nodes(nodesData); // will append 5 props index, vx, vy, x, v on each node object
    simulation.force('link').links(linksData); // will replace source and target props with the correlate node object
    simulation.alpha(1).restart();
  }

  const chartInterface = {
    update,
    setNodeClickCallback: (callback) =>
      eventDispatch.on(EVENTS.CLICK_NODE, callback),
  };
  const chart = Object.assign(svg.node(), chartInterface);
  return chart;
}
