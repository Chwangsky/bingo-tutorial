// App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import BingoBoard from './component/BingoBoard';
import GameState from './models/GameState';

function App() {

  const [gameState, setGameState] = useState<"initial" | "start">("initial");

  // TODO const [game, ] = useState(new GameState(3));


  const onNumbersChange = (newNumbers: number[][]) => {
    setNumbers(newNumbers);
  };



  //FIXME
  const [numbers, setNumbers] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);

  //FIXME
  const [matches, setMatches] = useState<boolean[][]>([
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ]);


  

  //FIXME just for test
  useEffect(() => {
    console.log('Numbers:', numbers);
    console.log('Matches:', matches);
  }, [numbers, matches]);

  

  return (
    <div className="App">
      { gameState === "initial" &&
        <div>
          시작!
        </div>
      }
      <button onClick={() => setGameState("initial")}>Start Game</button>

      <BingoBoard
        numbers={numbers}
        onNumbersChange={onNumbersChange}
        matches={matches}
        gameState={gameState}
      />
    </div>
  );
}

export default App;