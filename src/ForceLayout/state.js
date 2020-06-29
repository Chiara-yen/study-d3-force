import * as _ from 'lodash';

let nodesData = [];
let linksData = [];
let groupsData = {};

function updateData(nodes = [], links = []) {
  nodesData = nodes;
  linksData = links;
  groupsData = _.groupBy(nodes, 'group');
}

function getNodesData() {
  return nodesData;
}

function getLinksData() {
  return linksData;
}

function getGroupsData() {
  return groupsData;
}

export { updateData, getNodesData, getLinksData, getGroupsData };
