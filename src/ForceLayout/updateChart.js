import * as _ from 'lodash';
import insertHull from './helpers/insertHull';
import insertLink from './helpers/insertLink';
import insertNode from './helpers/insertNode';
import updateNode from './helpers/updateNode';
import selectAllHull from './helpers/selectAllHull';
import selectAllLink from './helpers/selectAllLink';
import selectAllNode from './helpers/selectAllNode';
import { updateData } from './state';

export default function updateChart(svg, simulation, { nodes, links }) {
  const node = selectAllNode(svg);
  // Make a shallow copy to protect against mutation, while
  // recycling old nodes to preserve position and velocity.
  const old = new Map(node.data().map((d) => [d.id, d]));
  const nodesData = nodes.map((d) => Object.assign(old.get(d.id) || {}, d));
  const linksData = links.map((d) => Object.assign({}, d));

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

  updateData(nodesData, linksData);
}
