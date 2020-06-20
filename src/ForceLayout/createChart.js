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

    // Update chart data
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
