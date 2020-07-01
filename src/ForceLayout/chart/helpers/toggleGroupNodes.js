import * as _ from 'lodash';
import { getNodesData, getLinksData, getGroupsData } from '../state';
import updateChart from '../updateChart';

export default function toggleGroupNodes(svg, simulation, groupId) {
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
}
