import { linkConfig } from '../configs';

export default function insertLink(enter) {
  return enter.append('line').attr('class', linkConfig.CLASS_NAME_SELECTOR);
}
