import * as d3 from 'd3';
import { svgConfig, nodeConfig, linkConfig } from './configs';

export const ticked = (svg) => {
  d3.select(svg)
    .selectAll(`.${nodeConfig.CLASS_NAME_SELECTOR}`)
    .attr('transform', (d) => `translate(${d.x},${d.y})`);

  d3.select(svg)
    .selectAll(`.${linkConfig.CLASS_NAME_SELECTOR}`)
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);
};

const setSimulation = (svg, nodes, links) => {
  const simulation = d3
    .forceSimulation()
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(svgConfig.WIDTH / 2, svgConfig.HEIGHT / 2))
    .force('collision', d3.forceCollide(nodeConfig.CIRCLE_RADIUS))
    .force(
      'link',
      d3
        .forceLink()
        .id((d) => d.id)
        .distance(200)
    );

  /**
   * https://github.com/d3/d3-force#simulation_nodes
   * will append 5 props index, vx, vy, x, v on each node object
   */
  // simulation.nodes(nodes, (d) => d.id);
  // simulation.force('link').links(links, (d) => d.id);
  // simulation.on('tick', () => ticked(svg));

  return simulation;
};

export default setSimulation;
