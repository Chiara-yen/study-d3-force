import { nodeConfig, EVENTS, eventDispatch } from '../configs';

export default function insertHull(enter) {
  return enter
    .append('path')
    .attr('class', 'hull')
    .style('stroke', (d) => nodeConfig.getGroupNumberColor(d))
    .style('fill', (d) => nodeConfig.getGroupNumberColor(d))
    .on('click', (d) => eventDispatch.call(EVENTS.CLICK_HULL, this, d));
}
