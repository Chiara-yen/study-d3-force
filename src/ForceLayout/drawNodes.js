import * as d3 from "d3";
import { nodeConfig } from "./configs";

const drawNodes = (svgElement, data) => {
  const svg = d3.select(svgElement);
  const group = svg.append("g").attr("class", "nodes");
  const updateNodes = group.selectAll(".node").data(data, (d) => d.id);
  const enterNodes = updateNodes.enter();
  const exitNodes = updateNodes.exit();
  const visibleNodes = updateNodes.merge(enterNodes);

  enterNodes
    .append("circle")
    .attr("class", "node")
    .attr("r", nodeConfig.CIRCLE_RADIUS)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);

  exitNodes.remove();

  visibleNodes
    .append("text")
    .attr("class", "node-label")
    .text((d) => d.text);
};

export default drawNodes;
