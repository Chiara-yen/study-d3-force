import * as d3 from 'd3';
import { nodeConfig } from '../configs';
import drawNodes from './drawNodes';
import drawLinks from './drawLinks';

export default function updateGraph(svg, nodes, links, simulation) {
  // Make a shallow copy to protect against mutation, while recycling old nodes to preserve position and velocity.
  const old = new Map(
    d3
      .select(svg)
      .selectAll(`.${nodeConfig.CLASS_NAME_SELECTOR}`)
      .data()
      .map((d) => [d.id, d])
  );
  const newNodes = nodes.map((d) => Object.assign(old.get(d.id) || {}, d));
  const newLinks = links.map((d) => Object.assign({}, d));

  drawNodes(svg, newNodes);
  drawLinks(svg, newLinks);

  simulation.nodes(newNodes);
  simulation.force('link').links(newLinks);
  simulation.alpha(1).restart();
}
