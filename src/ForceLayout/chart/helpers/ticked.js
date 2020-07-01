import * as d3 from 'd3';
import convertToHullPathPoints from './convertToHullPathPoints';
import selectAllNode from './selectAllNode';
import selectAllLink from './selectAllLink';
import selectAllHull from './selectAllHull';
import { getGroupsData } from '../state';

export default function ticked(svg) {
  selectAllNode(svg).attr('transform', (d) => `translate(${d.x},${d.y})`);

  selectAllLink(svg)
    .attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);

  selectAllHull(svg).attr('d', (g) => {
    const nodeGroups = getGroupsData();
    const hullPathPoints = convertToHullPathPoints(nodeGroups[g]);
    return d3.line()(hullPathPoints);
  });
}
