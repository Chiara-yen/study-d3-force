export default function (nodes = [], links = []) {
  const result = [];
  for (let i = 0; i < links.length; ++i) {
    const link = { ...links[i] };
    link.source = nodes[link.source];
    link.target = nodes[link.target];
    result.push(link);
  }
  return result;
}
