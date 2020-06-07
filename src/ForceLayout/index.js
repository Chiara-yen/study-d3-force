import React, { useRef, useEffect } from "react";
import setSVG from "./setSVG";

export const ForceLayout = (data) => {
  const svgRef = useRef(null);
  useEffect(() => {
    setSVG(svgRef.current);
  });
  return <svg ref={svgRef} />;
};
