import * as d3 from 'd3';
import { svgConfig } from '../configs';

export default function setSvg(d3Container) {
  const svg = d3
    .select(d3Container)
    .attr('width', svgConfig.WIDTH)
    .attr('height', svgConfig.HEIGHT);

  return svg;
}
