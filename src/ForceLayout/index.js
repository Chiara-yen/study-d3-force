import React, { useRef, useEffect } from 'react';
import './ForceLayout.css';
import createChart from './createChart';

export default function ForceLayout({ data }) {
  const svgRef = useRef(null);
  let chartRef = useRef(null);

  useEffect(() => {
    chartRef.current = createChart(svgRef.current);
  }, [svgRef]);

  useEffect(() => {
    chartRef.current.update(data);
  }, [data]);

  return <svg ref={svgRef} />;
}
