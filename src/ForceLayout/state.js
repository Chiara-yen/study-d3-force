let nodesData = [];
let linksData = [];

function updateData(nodes = [], links = []) {
  nodesData = nodes;
  linksData = links;
}

function getNodesData() {
  return nodesData;
}

function getLinksData() {
  return linksData;
}

export { updateData, getNodesData, getLinksData };
