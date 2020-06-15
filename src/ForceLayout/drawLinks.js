import * as d3 from 'd3';
import { linkConfig } from './configs';

const drawLinks = (svgElement, data) => {
  const svg = d3.select(svgElement);
  const updateLink = svg
    .append('g')
    .attr('class', 'links')
    .selectAll(`.${linkConfig.CLASS_NAME_SELECTOR}`)
    .data(data, (d) => d.id);
  const enterLink = updateLink.enter();
  const exitLink = updateLink.exit();

  // 1. append link
  enterLink
    .append('line')
    .attr('class', linkConfig.CLASS_NAME_SELECTOR)
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);

  // 2. update each link
  updateLink
    .selectAll(`.${linkConfig.CLASS_NAME_SELECTOR}`)
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);

  // 3. remove unused link
  exitLink.remove();

  return updateLink;
};

export default drawLinks;
