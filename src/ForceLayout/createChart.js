import * as d3 from 'd3';
import setSvg from './helpers/setSVG';
import setSimulation from './helpers/setSimulation';

const color = d3.scaleOrdinal(d3.schemeTableau10);

export default function createChart(svgRef) {
  const svg = setSvg(svgRef);

  const simulation = setSimulation();
  simulation
      .on("tick", ticked);

  let link = svg.append("g")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("line");

  let node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle");

  function ticked() {
    node.attr("cx", d => d.x)
        .attr("cy", d => d.y)

    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
  }

  const update = ({nodes, links}) => {
    // Make a shallow copy to protect against mutation, while
    // recycling old nodes to preserve position and velocity.
    const old = new Map(node.data().map(d => [d.id, d]));
    nodes = nodes.map(d => Object.assign(old.get(d.id) || {}, d));
    links = links.map(d => Object.assign({}, d));

    node = node
      .data(nodes, d => d.id)
      .join(enter => enter.append("circle")
        .attr("r", 8)
        .attr("fill", d => color(d.id)));

    link = link
      .data(links, d => [d.source, d.target])
      .join("line");

    /**
     * https://github.com/d3/d3-force#simulation_nodes
     * will append 5 props index, vx, vy, x, v on each node object
     */
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
  }

  const chartInterface = {
    update,
  };
  const chart = Object.assign(svg.node(), chartInterface);
  return chart;
}
