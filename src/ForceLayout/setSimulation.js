import * as d3 from "d3";
import { svgConfig, nodeConfig } from "./configs";

const ticked = (svg) => {
  d3.select(svg)
    .selectAll(".node")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);
};

const setSimulation = (svg, nodes) => {
  d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(svgConfig.WIDTH / 2, svgConfig.HEIGHT / 2))
    .force("collision", d3.forceCollide(nodeConfig.CIRCLE_RADIUS))
    .nodes(nodes, (d) => d.id)
    .on("tick", () => ticked(svg));
};

export default setSimulation;
