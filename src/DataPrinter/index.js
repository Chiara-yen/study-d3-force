import React from 'react';

export default function DataPrinter({ data }) {
  const { links, nodes } = data;
  return (
    <>
      <h1>Data</h1>
      <hr />
      <h2>Node List</h2>
      <code>{JSON.stringify(nodes)}</code>
      <hr />
      <h2>Link List</h2>
      <code>{JSON.stringify(links)}</code>
    </>
  );
}
