import { nodeConfig, EVENTS, eventDispatch } from '../configs';

export default function insertNode(enter) {
  const wrap = enter
    .append('g')
    .attr('class', nodeConfig.CLASS_NAME_SELECTOR)
    .attr('node-id', (d) => d.id)
    .on('click', (d) => eventDispatch.call(EVENTS.CLICK_NODE, this, d));

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
