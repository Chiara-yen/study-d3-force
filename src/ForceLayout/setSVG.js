import * as d3 from 'd3';
import { svgConfig } from './configs';

const setSvg = (d3Container) => {
  const svg = d3
    .select(d3Container)
    .attr('width', svgConfig.WIDTH)
    .attr('height', svgConfig.HEIGHT);

  console.log('svg.node() =>', svg.node());
};

export default setSvg;
