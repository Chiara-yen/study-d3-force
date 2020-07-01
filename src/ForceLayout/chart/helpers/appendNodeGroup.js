import { nodeConfig } from '../configs';

export default function appendNodeGroup(svg) {
  svg.append('g').attr('class', nodeConfig.GROUP_CLASS_NAME_SELECTOR);
}
