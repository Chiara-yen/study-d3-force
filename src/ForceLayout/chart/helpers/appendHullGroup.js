import { hullConfig } from '../configs';

export default function appendHullGroup(svg) {
  svg.append('g').attr('class', hullConfig.GROUP_CLASS_NAME_SELECTOR);
}
