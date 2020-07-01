import { nodeConfig } from '../configs';

export default function selectAllNode(svg) {
  return svg
    .select(`.${nodeConfig.GROUP_CLASS_NAME_SELECTOR}`)
    .selectAll(`.${nodeConfig.CLASS_NAME_SELECTOR}`);
}
