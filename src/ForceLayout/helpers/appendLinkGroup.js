import { linkConfig } from '../configs';

export default function appendLinkGroup(svg) {
  svg.append('g').attr('class', linkConfig.GROUP_CLASS_NAME_SELECTOR);
}
