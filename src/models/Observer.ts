interface Observer {
    setNumbers(numbers: number[][]): void;
    updateMatches(givenNumber: number): void;
    getNumbers(): number[][];
    getMatches(): boolean[][];
    getBingoCount(): number;
}

export default Observer;