import * as d3 from 'd3';
import { svgConfig, nodeConfig } from '../configs';

export default function setSimulation() {
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

  return simulation;
};
