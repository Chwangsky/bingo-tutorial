interface Observer {
    setNumbers(numbers: number[][]): void;
    updateMatches(givenNumber: number): void;
    getNumbers(): number[][];
    getMatches(): boolean[][]; //FIXME
    getBingoCount(): number;
}

export default Observer;