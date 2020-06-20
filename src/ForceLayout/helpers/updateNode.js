import { nodeConfig } from '../configs';

export default function updateNode(update) {
  return update.attr('fill', (d) => nodeConfig.getGroupNumberColor(d.group));
}
