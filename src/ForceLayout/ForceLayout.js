import React, { useRef, useEffect } from 'react';
import './ForceLayout.css';
import createChart from './chart/createChart';

export default function ForceLayout({ data }) {
  const svgRef = useRef(null);
  let chartRef = useRef(null);

  useEffect(() => {
    chartRef.current = createChart(svgRef.current);
    chartRef.current.setNodeClickCallback((node) =>
      console.log('clicked node =>', node)
    );
  }, [svgRef]);

  useEffect(() => {
    chartRef.current.update(data);
  }, [data]);

  return <svg ref={svgRef} />;
}
