import Observer from "./Observer";

export default interface Observable {
    addPlayer(numbers: number[][]): void;
    removePlayer(index: number): void;
    notifyWithCalledNumber(calledNumber: number): void;
}