import React, { useRef, useEffect } from 'react';
import './ForceLayout.css';
import setSVG from './setSVG';
import setSimulation from './setSimulation';
import drawNodes from './drawNodes';
import drawLinks from './drawLinks';
// import updateGraph from './updateGraph';

export default function ForceLayout({ data }) {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const { links, nodes } = data;

  useEffect(() => {
    const svgElement = svgRef.current;
    setSVG(svgElement);
  }, [svgRef]);

  useEffect(() => {
    const svgElement = svgRef.current;
    const linksGroup = drawLinks(svgElement, links);
    const nodesGroup = drawNodes(svgElement, nodes);
    simulationRef.current = setSimulation(svgElement, nodes, links);
    // updateGraph(svgElement, nodes, links, simulation);
    return () => {
      console.log('clear');
      linksGroup.data(null);
      nodesGroup.data(null);
      simulationRef.current.stop();
      simulationRef.current.nodes([]);
      simulationRef.current.force('link').links([]);
    };
  }, [links, nodes]);

  return <svg ref={svgRef} />;
}
