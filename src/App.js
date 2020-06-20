import React, { useState } from 'react';
import './App.css';
import ForceLayout from './ForceLayout';
import DataPrinter from './DataPrinter';
import data from './data';
import data2 from './data2';

function App() {
  const [state, setstate] = useState(data);
  const onButtonClick = () => setstate(data2);

  return (
    <>
      <ForceLayout data={state} />
      <button type='button' onClick={onButtonClick}>
        Set data 2
      </button>
      <DataPrinter data={state} />
    </>
  );
}

export default App;
