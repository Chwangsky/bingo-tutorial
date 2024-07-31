import Observable from "./Observable";
import Observer from "./Observer";
import Player from "./Player";

export default class GameState implements Observable {

    private boardSize: number = 3;
    private players: Observer[] = [];

    public constructor(boardSize: number) {
        this.boardSize = boardSize;
    }

    // override // 
    public addPlayer(numbers: number[][]): void {
        const player: Observer = new Player(this.boardSize);
        player.setNumbers(numbers);
        this.players.push(player);
    }

    // override //
    public removePlayer(index: number): void {
        this.players = this.players.splice(index, 1);
    }

    // override //
    public callNumber(calledNumber: number) {
        this.notifyWithCalledNumber(calledNumber);
    }

    // override //
    public notifyWithCalledNumber(calledNumber: number) {
        for (const player of this.players) {
            player.updateMatches(calledNumber);
        }
    }

    /**
    * Retrieves the match states of all players as a 3D boolean array
    * 
    * { index of player, index of row, index of column } -> number
    */
    public getNumbersOfAllPlayers(): number[][][] {
        return this.players.map(player => player.getNumbers());
    }
    
    /**
    * Retrieves the match states of all players as a 3D boolean array
    * 
    * { index of player, index of row, index of column } -> isMatched
    */
    public getMatchesOfAllPlayers(): boolean[][][] {
        return this.players.map(player => player.getMatches());
    }

    public getBingoCountOfAllPlayers(): number[] {
        return this.players.map(player => player.getBingoCount());
    }


}