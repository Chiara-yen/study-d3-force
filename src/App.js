import React from 'react';
import './App.css';
import { ForceLayout } from './ForceLayout';
import DataPrinter from './DataPrinter';
import data from './data';

function App() {
  return (
    <>
      <ForceLayout data={data} />
      <DataPrinter data={data} />
    </>
  );
}

export default App;
