// App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import BingoBoard from './component/BingoBoard';

function App() {
  const [numbers, setNumbers] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);

  const [matches, setMatches] = useState<boolean[][]>([
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ]);

  const [gameState, setGameState] = useState<"initial" | "start">("initial");

  // just for test
  useEffect(() => {
    console.log('Numbers:', numbers);
    console.log('Matches:', matches);
  }, [numbers, matches]);

  const onNumbersChange = (newNumbers: number[][]) => {
    setNumbers(newNumbers);
  };

  return (
    <div className="App">
      <BingoBoard
        numbers={numbers}
        onNumbersChange={onNumbersChange}
        matches={matches}
        gameState={gameState}
      />
      <button onClick={() => setGameState("start")}>Start Game</button>
    </div>
  );
}

export default App;