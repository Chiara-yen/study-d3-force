import { nodeConfig } from '../configs';

export default function updateNode(update) {
  update
    .selectAll('circle')
    .attr('fill', (d) => nodeConfig.getGroupNumberColor(d.group));
  return update;
}
