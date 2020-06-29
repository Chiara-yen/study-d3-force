import * as _ from 'lodash';
import { EVENTS, eventDispatcher } from './configs';
import setSvg from './helpers/setSVG';
import setSimulation from './helpers/setSimulation';
import appendHullGroup from './helpers/appendHullGroup';
import appendLinkGroup from './helpers/appendLinkGroup';
import appendNodeGroup from './helpers/appendNodeGroup';
import { getNodesData, getLinksData, getGroupsData } from './state';
import ticked from './helpers/ticked';
import updateChart from './updateChart';

export default function createChart(svgRef) {
  const svg = setSvg(svgRef);
  const simulation = setSimulation();
  simulation.on('tick', () => ticked(svg));
  appendHullGroup(svg);
  appendLinkGroup(svg);
  appendNodeGroup(svg);

  eventDispatcher.on(EVENTS.CLICK_HULL, (groupId) => {
    const nodesData = getNodesData();
    const linksData = getLinksData();
    const groups = getGroupsData();
    const clickedGroup = groups[groupId];
    const originalNodes = _.get(clickedGroup, '[0].nodes');
    const nodesDataWithoutGroup = nodesData.filter((d) => d.group !== groupId);
    const isNeedToCollapse = clickedGroup.length >= 2;
    const isNeedToExpand = !isNeedToCollapse && Boolean(originalNodes);

    if (isNeedToCollapse) {
      const mergedNode = {
        nodes: clickedGroup,
        id: `group-${groupId}`,
        text: `group-${groupId}`,
        group: groupId,
        x: _.meanBy(clickedGroup, 'x'),
        y: _.meanBy(clickedGroup, 'y'),
        vx: _.meanBy(clickedGroup, 'vx'),
        vy: _.meanBy(clickedGroup, 'vy'),
      };

      const newNodes = nodesDataWithoutGroup.concat(mergedNode);

      const newLinks = linksData.map((link) => {
        if (link.source.group === groupId) {
          link.sourceOriginalId = _.clone(link.source.id);
          link.source = `group-${groupId}`;
        }

        if (link.target.group === groupId) {
          link.targetOriginalId = _.clone(link.target.id);
          link.target = `group-${groupId}`;
        }

        return link;
      });

      updateChart(svg, simulation, { nodes: newNodes, links: newLinks });
    }

    if (isNeedToExpand) {
      const newNodes = nodesDataWithoutGroup.concat(originalNodes);

      const newLinks = linksData.map((link) => {
        if (link.source.group === groupId) {
          link.source = link.sourceOriginalId;
        }
        if (link.target.group === groupId) {
          link.target = link.targetOriginalId;
        }
        return link;
      });

      updateChart(svg, simulation, { nodes: newNodes, links: newLinks });
    }
  });

  const chartInterface = {
    update: (data = {}) => updateChart(svg, simulation, data),
    setNodeClickCallback: (callback) =>
      eventDispatcher.on(EVENTS.CLICK_NODE, callback),
  };
  const chart = Object.assign(svg.node(), chartInterface);
  return chart;
}
