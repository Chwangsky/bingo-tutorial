import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GameState from './models/GameState';

function App() {

  // just for test
  // TODO fix this
  useEffect(() => {
    const gamestate = new GameState(3);
    gamestate.addPlayer([[1,2,3],[4,5,6],[7,8,9]]);
    gamestate.addPlayer([[2,3,4],[5,6,7],[8,9,10]]);
    gamestate.callNumber(4);
    gamestate.callNumber(6);
    gamestate.callNumber(8);
    gamestate.callNumber(2);
    gamestate.callNumber(10);
    console.log(gamestate.getMatchesOfAllPlayers());
    console.log(gamestate.getNumbersOfAllPlayers());
    console.log(gamestate.getBingoCountOfAllPlayers());

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
