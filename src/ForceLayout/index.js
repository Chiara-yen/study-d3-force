import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import './ForceLayout.css';
import setSVG from './setSVG';
import setSimulation, { ticked } from './setSimulation';
import drawNodes from './drawNodes';
import drawLinks from './drawLinks';

export default function ForceLayout({ data }) {
  const svgRef = useRef(null);
  useEffect(() => {
    let simulation = null;
    const svgElement = svgRef.current;
    const { links, nodes } = data;
    const onNodeClick = ({ group }) => {
      d3.selectAll('.nodes').remove();
      d3.selectAll('.links').remove();

      const resultNodes = _.groupBy(nodes, (node) => node.group === group);
      const nodeIds = resultNodes.true.map((node) => node.id);
      const nodeIdString = nodeIds.join('_');
      const mergedNodes = {
        id: nodeIdString,
        group,
        result: resultNodes.true,
      };
      const newNodes = resultNodes.false.concat(mergedNodes);

      const newLinks = links.map((link) => {
        const isSrcHit = nodeIds.includes(link.source.id);
        const isTargetHit = nodeIds.includes(link.target.id);
        if (isSrcHit) {
          link.source = nodeIdString;
        }
        if (isTargetHit) {
          link.target = nodeIdString;
        }
        return link;
      });

      console.log('newNodes =>', newNodes);
      console.log('newLinks =>', newLinks);

      drawLinks(svgElement, newLinks);
      drawNodes(svgElement, newNodes, onNodeClick);
      // setSimulation(svgElement, newNodes, newLinks);
      simulation.nodes(newNodes, (d) => d.id);
      simulation.force('link').links(newLinks, (d) => d.id);
      simulation.on('tick', () => ticked(svgElement));
    };

    setSVG(svgElement);
    drawLinks(svgElement, links);
    drawNodes(svgElement, nodes, onNodeClick);
    simulation = setSimulation(svgElement, nodes, links);
    simulation.nodes(nodes, (d) => d.id);
    simulation.force('link').links(links, (d) => d.id);
    simulation.on('tick', () => ticked(svgElement));
  });
  return <svg ref={svgRef} />;
}
