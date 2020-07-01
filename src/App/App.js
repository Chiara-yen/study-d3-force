import React, { useState } from 'react';
import './App.css';
import ForceLayout from '../ForceLayout';
import DataPrinter from '../DataPrinter';
import data1 from '../data/data1';
import data2 from '../data/data2';

function App() {
  const [data, setData] = useState(data1);
  const setData1 = () => setData(data1);
  const setData2 = () => setData(data2);

  return (
    <>
      <ForceLayout data={data} />
      <button type='button' onClick={setData1}>
        Set data 1
      </button>
      <button type='button' onClick={setData2}>
        Set data 2
      </button>
      <DataPrinter data={data} />
    </>
  );
}

export default App;
