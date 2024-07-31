import Observer from "./Observer";

export default class Player implements Observer {

    private numbers: number [][] = [[]];
    private matches: boolean[][] = [[]];
    private bingoSize: number = 0;
    private bingoCount: number = 0;

    public constructor(bingoSize: number) {
        this.numbers = Array.from({ length: bingoSize }, () => Array.from({ length: bingoSize }, () => 0)); // 각 요소가 0이면서, bingoSize * bingoSize 크기의 이중배열
        this.matches = Array.from({ length: bingoSize }, () => Array.from({ length: bingoSize }, () => false));
        this.bingoSize = bingoSize;
        this.bingoCount = 0;
    }

    public setNumbers(numbers: number[][]): void {
        this.numbers = numbers;
    }
    
    public updateMatches(givenNumber: number): void {
        
        let isUpdated: boolean = false;
        this.numbers.forEach((row, i) => {
            row.forEach((num, j) => {
                if (num === givenNumber) {
                    this.matches[i][j] = true;
                    isUpdated = true;
                }
            })
        });

        if (isUpdated) { // update 된 경우에만, bingoCount 갱신
            this.bingoCount = this.updateCountBingo(); 
        }
    }

    public getBingoCount(): number {
        return this.bingoCount;
    }

    public getNumbers(): number[][] {
        return this.numbers;
    }

    public getMatches(): boolean[][] {
        return this.matches;
    }

    private updateCountBingo(): number {
        let ret: number = 0;
        let tmpCount: number;

        // count through horizontally
        for (let i = 0; i < this.bingoSize; i++) {
            tmpCount = 0;
            for (let j = 0; j < this.bingoSize; j++) {
                if (this.matches[i][j]) tmpCount++;
            }
            if (tmpCount === this.bingoSize) ret++;
        }

        // count through vertically
        for (let i = 0; i < this.bingoSize; i++) {
            tmpCount = 0;
            for (let j = 0; j < this.bingoSize; j++) {
                if (this.matches[j][i]) tmpCount++;
            }
            if (tmpCount === this.bingoSize) ret++;
        }

        // count through diagonally from top-left to bottom-right 
        tmpCount = 0;
        for (let i = 0; i < this.bingoSize; i++) {
            if (this.matches[i][i]) tmpCount++;
        }
        if (tmpCount === this.bingoSize) ret++;

        // count through diagonally from top-right to bottom-left
        tmpCount = 0;
        for (let i = 0; i < this.bingoSize; i++) {
            if (this.matches[i][this.bingoSize - 1 - i]) tmpCount++;
        }
        if (tmpCount === this.bingoSize) ret++;

        return ret;
    }
}