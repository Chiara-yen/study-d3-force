import { nodeConfig, EVENTS, eventDispatcher } from '../configs';

export default function insertHull(enter) {
  return enter
    .append('path')
    .attr('class', 'hull')
    .style('stroke', (d) => nodeConfig.getGroupNumberColor(d))
    .style('fill', (d) => nodeConfig.getGroupNumberColor(d))
    .on('click', (d) => eventDispatcher.call(EVENTS.CLICK_HULL, this, d));
}
