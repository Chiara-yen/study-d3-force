import { EVENTS, eventDispatcher } from './configs';
import setSvg from './helpers/setSVG';
import setSimulation from './helpers/setSimulation';
import appendHullGroup from './helpers/appendHullGroup';
import appendLinkGroup from './helpers/appendLinkGroup';
import appendNodeGroup from './helpers/appendNodeGroup';
import ticked from './helpers/ticked';
import toggleGroupNodes from './helpers/toggleGroupNodes';
import updateChart from './updateChart';

export default function createChart(svgRef) {
  const svg = setSvg(svgRef);
  const simulation = setSimulation();
  simulation.on('tick', () => ticked(svg));
  appendHullGroup(svg);
  appendLinkGroup(svg);
  appendNodeGroup(svg);

  eventDispatcher.on(EVENTS.CLICK_HULL, (groupId) =>
    toggleGroupNodes(svg, simulation, groupId)
  );

  const chartInterface = {
    update: (data = {}) => updateChart(svg, simulation, data),
    setNodeClickCallback: (callback) =>
      eventDispatcher.on(EVENTS.CLICK_NODE, callback),
  };
  const chart = Object.assign(svg.node(), chartInterface);
  return chart;
}
