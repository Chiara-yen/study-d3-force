import React, { useRef, useEffect } from "react";
import "./ForceLayout.css";
import setSVG from "./setSVG";
import drawNodes from "./drawNodes";

export const ForceLayout = ({ data }) => {
  const svgRef = useRef(null);
  useEffect(() => {
    const svgElement = svgRef.current;
    setSVG(svgElement);
    drawNodes(svgElement, data.nodes);
  });
  return <svg ref={svgRef} />;
};
