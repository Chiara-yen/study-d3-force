import * as d3 from 'd3';
import * as _ from 'lodash';
import { EVENTS, eventDispatch } from './configs';
import setSvg from './helpers/setSVG';
import setSimulation from './helpers/setSimulation';
import insertHull from './helpers/insertHull';
import insertLink from './helpers/insertLink';
import insertNode from './helpers/insertNode';
import updateNode from './helpers/updateNode';
import convertToHullPathPoints from './helpers/convertToHullPathPoints';
import appendHullGroup from './helpers/appendHullGroup';
import appendLinkGroup from './helpers/appendLinkGroup';
import appendNodeGroup from './helpers/appendNodeGroup';
import selectAllHull from './helpers/selectAllHull';
import selectAllLink from './helpers/selectAllLink';
import selectAllNode from './helpers/selectAllNode';

export default function createChart(svgRef) {
  const svg = setSvg(svgRef);
  const simulation = setSimulation();
  simulation.on('tick', ticked);
  appendHullGroup(svg);
  appendLinkGroup(svg);
  appendNodeGroup(svg);

  let nodesData = [];
  let linksData = [];

  eventDispatch.on(EVENTS.CLICK_HULL, (groupId) => {
    const groups = _.groupBy(nodesData, 'group');
    const clickedGroup = groups[groupId];
    const originalNodes = _.get(clickedGroup, '[0].nodes');
    const nodesDataWithoutGroup = nodesData.filter((d) => d.group !== groupId);
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

      const newNodes = nodesDataWithoutGroup.concat(mergedNode);

      const newLinks = linksData.map((link) => {
        if (link.source.group === groupId) {
          link.sourceOriginalId = _.clone(link.source.id);
          link.source = `group-${groupId}`;
        }

        if (link.target.group === groupId) {
          link.targetOriginalId = _.clone(link.target.id);
          link.target = `group-${groupId}`;
        }

        return link;
      });

      update({ nodes: newNodes, links: newLinks });
    }

    if (isNeedToExpand) {
      const newNodes = nodesDataWithoutGroup.concat(originalNodes);

      const newLinks = linksData.map((link) => {
        if (link.source.group === groupId) {
          link.source = link.sourceOriginalId;
        }
        if (link.target.group === groupId) {
          link.target = link.targetOriginalId;
        }
        return link;
      });

      update({ nodes: newNodes, links: newLinks });
    }
  });

  function ticked() {
    selectAllNode(svg).attr('transform', (d) => `translate(${d.x},${d.y})`);

    selectAllLink(svg)
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    selectAllHull(svg).attr('d', (g) => {
      const nodeGroups = _.groupBy(nodesData, 'group');
      const hullPathPoints = convertToHullPathPoints(nodeGroups[g]);
      return d3.line()(hullPathPoints);
    });
  }

  function update({ nodes, links }) {
    const node = selectAllNode(svg);
    // Make a shallow copy to protect against mutation, while
    // recycling old nodes to preserve position and velocity.
    const old = new Map(node.data().map((d) => [d.id, d]));
    nodesData = nodes.map((d) => Object.assign(old.get(d.id) || {}, d));
    linksData = links.map((d) => Object.assign({}, d));

    // Update chart selections
    node.data(nodesData, (d) => d.id).join(insertNode, updateNode);
    selectAllLink(svg)
      .data(linksData, (d) => [d.source, d.target])
      .join(insertLink);
    selectAllHull(svg)
      .data(_.unionBy(nodesData.map((node) => node.group)), (d) => d)
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
