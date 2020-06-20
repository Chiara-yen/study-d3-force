import { nodeConfig } from '../configs';

export default function insertHull(enter) {
  return enter
    .append('path')
    .attr('class', 'hull')
    .style('stroke', (d) => nodeConfig.getGroupNumberColor(d))
    .style('fill', (d) => nodeConfig.getGroupNumberColor(d));
}
