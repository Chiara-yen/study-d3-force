import { nodeConfig } from '../configs';

export default function insertNode(enter) {
  return enter
    .append('circle')
    .attr('class', nodeConfig.CLASS_NAME_SELECTOR)
    .attr('r', nodeConfig.CIRCLE_RADIUS)
    .attr('fill', (d) => nodeConfig.getGroupNumberColor(d.group));
}
