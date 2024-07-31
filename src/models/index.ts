import GameState from "./GameState";

const gamestate = new GameState(3);
gamestate.addPlayer([[1,2,3],[4,5,6],[7,8,9]]);
gamestate.addPlayer([[2,3,4],[5,6,7],[8,9,10]]);
gamestate.callNumber(1);
gamestate.callNumber(2);
gamestate.callNumber(3);
console.log(gamestate.getMatchesOfAllPlayers);
console.log(gamestate.getNumbersOfAllPlayers);

