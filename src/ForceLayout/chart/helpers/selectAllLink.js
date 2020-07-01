import { linkConfig } from '../configs';

export default function selectAllLink(svg) {
  return svg
    .select(`.${linkConfig.GROUP_CLASS_NAME_SELECTOR}`)
    .selectAll(`.${linkConfig.CLASS_NAME_SELECTOR}`);
}
