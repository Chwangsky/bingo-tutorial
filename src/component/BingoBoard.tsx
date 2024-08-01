import styled from 'styled-components';
import BingoCell from './BingoCell';


// TODO
interface BingoBoardProps {
  numbers: number[][];
  mode: 'form' | 'unmatched' | 'matched';
  onNumbersChange: (newNumbers: number[][]) => void;
}

export default function BingoBoard({ numbers, mode, onNumbersChange }: BingoBoardProps) {

  const handleNumberChange = (rowIndex: number, colIndex: number, newNumber: number) => {
    const newNumbers = numbers.map((row, rIdx) => 
      row.map((num, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? newNumber : num))
    );
    onNumbersChange(newNumbers);
  };

  return (
    <Board>
      {numbers.map((row, rowIndex) =>
        row.map((number, colIndex) => (
          <BingoCell
            key={`${rowIndex}-${colIndex}`}
            number={numbers[rowIndex][colIndex]}
            mode={mode}
            onNumberChange={(newNumber: number) => handleNumberChange(rowIndex, colIndex, newNumber)}
          />
        ))
      )}
    </Board>
  );
}

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
