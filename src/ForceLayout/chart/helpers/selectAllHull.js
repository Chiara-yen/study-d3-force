import { hullConfig } from '../configs';

export default function selectAllHull(svg) {
  return svg
    .select(`.${hullConfig.GROUP_CLASS_NAME_SELECTOR}`)
    .selectAll(`.${hullConfig.CLASS_NAME_SELECTOR}`);
}
