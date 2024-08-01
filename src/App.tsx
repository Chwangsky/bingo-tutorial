// App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import BingoBoard from './component/BingoBoard';
import BingoCell from './component/BingoCell';

function App() {
  const [number, setNumber] = useState<number>(5);
  const [numbers, setNumbers] = useState<number[][]>([[1,2,3],[4,5,6],[7,8,9]]);


  //TODO DELETE THIS



  // just for test
  // TODO fix this
  useEffect(() => {
    console.log(number);
    console.log(numbers); 
  }, [number]);

  return (
    <div className="App">
      <BingoCell number={number} mode="matched" onNumberChange={(newNumber: number) => setNumber(newNumber)} />
      <BingoBoard numbers={numbers} mode='form' onNumbersChange={setNumbers}/>
    </div>
  );
}

export default App;
