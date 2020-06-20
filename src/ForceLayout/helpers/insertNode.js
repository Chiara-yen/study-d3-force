import { nodeConfig } from '../configs';

export default function insertNode(enter) {
  const wrap = enter
    .append('g')
    .attr('class', nodeConfig.CLASS_NAME_SELECTOR)
    .attr('node-id', (d) => d.id);

  wrap
    .append('circle')
    .attr('class', 'node')
    .attr('r', nodeConfig.CIRCLE_RADIUS)
    .attr('fill', (d) => nodeConfig.getGroupNumberColor(d.group));

  wrap
    .append('text')
    .attr('class', 'node-label')
    .text((d) => d.text);

  return wrap;
}
