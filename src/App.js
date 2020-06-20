import React, { useState } from 'react';
import './App.css';
import ForceLayout from './ForceLayout';
import DataPrinter from './DataPrinter';
import data from './data';
import data2 from './data2';

function App() {
  const [state, setstate] = useState(data);

  setTimeout(() => {
    setstate(data2);
  }, 3000);

  return (
    <>
      <ForceLayout data={state} />
      <DataPrinter data={state} />
    </>
  );
}

export default App;
