import styled from "styled-components";
import BingoCell from "./BingoCell";
import { useEffect, useRef, useState } from "react";
import CellStatus from "../types/CellStatus";

// TODO
interface BingoBoardProps {
  numbers: number[][];
  onNumbersChange: (newNumbers: number[][]) => void;
  matches: boolean[][];
  gameState: "initial" | "start";
}

export default function BingoBoard({
  numbers,
  onNumbersChange,
  matches,
  gameState,
}: BingoBoardProps) {

  const [modes, setModes] = useState<CellStatus[][]>([[{ value: "matched" }]]);

  let boardSize = useRef<number>(3);

  useEffect(() => {
    boardSize.current = numbers.length;
  }, []);

  useEffect(() => {
    if (gameState === "initial") {
      setModes(Array.from({ length: boardSize.current }, () => Array(boardSize.current).fill( {value : "form"} as CellStatus)));
    } else if (gameState === "start") {
      const tmpModes: CellStatus[][] = matches.map((rows: boolean[]) =>
        rows.map((match: boolean) => {
          return { value : match ? "matched" : "unmatched" } as CellStatus
        })
      );
      setModes(tmpModes);
    }
    
    console.log(modes); // TODO
  }, [gameState, JSON.stringify(matches)]); // 이중배열의 경우 각각의 요소가 바뀌게 되면 useEffect롤 호출하기 위해 JSON.stringify를 사용할 수 있음

  const handleNumberChange = (
    rowIdx: number,
    colIdx: number,
    newNumber: number
  ) => {
    const newNumbers = numbers.map((row, rIdx) =>
      row.map((num, cIdx) =>
        (rIdx === rowIdx && cIdx === colIdx) ? newNumber : num
      )
    );
    onNumbersChange(newNumbers);
  };

  return (
    <StyledBoard columns={boardSize.current}>
      {numbers.map((row, rowIdx) =>
        row.map((number, colIdx) => (
          <BingoCell
            key={`${rowIdx}-${colIdx}`}
            number={numbers[rowIdx][colIdx]}
            mode={modes[rowIdx][colIdx]}
            onNumberChange={(newNumber: number) =>
              handleNumberChange(rowIdx, colIdx, newNumber)
            }
          />
        ))
      )}
    </StyledBoard>
  );
}

const StyledBoard = styled.div<{ columns: number }>`
  background-color: grey;
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 10px;
`;
