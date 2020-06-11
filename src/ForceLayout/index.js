import React, { useRef, useEffect } from 'react';
import './ForceLayout.css';
import setSVG from './setSVG';
import setSimulation from './setSimulation';
import drawNodes from './drawNodes';
import drawLinks from './drawLinks';

export default function ForceLayout({ data }) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svgElement = svgRef.current;
    const { links, nodes } = data;

    setSVG(svgElement);
    drawLinks(svgElement, links);
    drawNodes(svgElement, nodes);
    setSimulation(svgElement, nodes, links);
  });
  return <svg ref={svgRef} />;
}
