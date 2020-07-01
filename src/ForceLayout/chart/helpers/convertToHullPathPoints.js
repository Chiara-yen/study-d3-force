import * as d3 from 'd3';
import * as _ from 'lodash';

const offset = 30;

export default function convertToHullPathPoints(nodes) {
  if (_.isEmpty(nodes)) return [];

  const points = nodes.reduce((acc, node, i) => {
    if (acc[i] && acc[i].length < 2) return acc;
    acc.push([node.x - offset, node.y - offset]);
    acc.push([node.x - offset, node.y + offset]);
    acc.push([node.x + offset, node.y - offset]);
    acc.push([node.x + offset, node.y + offset]);
    return acc;
  }, []);
  const hullPoints = d3.polygonHull(points);
  hullPoints.push(hullPoints[0]); // to make path complete

  return hullPoints;
}
