import * as d3 from 'd3';
import { nodeConfig } from './configs';

const generateColors = (data) => {
  const domain = data.map((d) => d.group);
  const colors = d3.scaleOrdinal(domain, d3.schemeCategory10);
  return colors;
};

const drawNodes = (svgElement, data, onNodeClick) => {
  const colors = generateColors(data);
  const svg = d3.select(svgElement);
  const group = svg.append('g').attr('class', 'nodes');
  const updateNodeGroups = group
    .selectAll(`.${nodeConfig.CLASS_NAME_SELECTOR}`)
    .data(data, (d) => d.id);
  const enterNodeGroups = updateNodeGroups.enter();
  const exitNodeGroups = updateNodeGroups.exit();
  const enterNode = enterNodeGroups
    .append('g')
    .attr('class', nodeConfig.CLASS_NAME_SELECTOR);

  // 1. append node
  enterNode
    .append('circle')
    .attr('class', 'node')
    .attr('r', nodeConfig.CIRCLE_RADIUS)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('fill', (d) => colors(d.group))
    .on('click', onNodeClick);

  // 2. append node label
  enterNode
    .append('text')
    .attr('class', 'node-label')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .text((d) => d.text);

  // 3. update each node position
  updateNodeGroups
    .selectAll('.node')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y);

  // 4. update each node label
  updateNodeGroups.selectAll('.node-label').text((d) => d.text);

  // 5. remove unused node group
  exitNodeGroups.remove();
};

export default drawNodes;
