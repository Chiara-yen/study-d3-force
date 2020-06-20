import * as d3 from 'd3';
import { nodeConfig } from '../configs';

const color = d3.scaleOrdinal(d3.schemeTableau10);

export default function insertNode(enter) {
  return enter
    .append('circle')
    .attr('class', nodeConfig.CLASS_NAME_SELECTOR)
    .attr('r', nodeConfig.CIRCLE_RADIUS)
    .attr('fill', (d) => color(d.group));
}
