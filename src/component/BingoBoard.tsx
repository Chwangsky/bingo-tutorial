import styled from "styled-components";
import BingoCell from "./BingoCell";
import { useLayoutEffect, useState } from "react";
import CellStatus from "../types/CellStatus";
import { BINGO_SIZE } from "../constant";

// TODO
interface BingoBoardProps {
  numbers: number[][];
  onNumbersChange: (newNumbers: number[][]) => void;
  matches: boolean[][];
  gamePhase: "initial" | "start";
}

export default function BingoBoard({
  numbers,
  onNumbersChange,
  matches,
  gamePhase
}: BingoBoardProps) {

  const [modes, setModes] = useState<CellStatus[][]>(
    Array.from({ length: BINGO_SIZE }, () =>
      Array(BINGO_SIZE).fill({ value: "form" } as CellStatus)
    )
  );

  const stringifyMatches = JSON.stringify(matches); // eslint 경고문 제거를 위해
  useLayoutEffect(() => {
    if (gamePhase === "initial") {
      setModes(
        Array.from({ length: BINGO_SIZE }, () =>
          Array(BINGO_SIZE).fill({ value: "form" } as CellStatus)
        )
      );
    } else if (gamePhase === "start") {
      const tmpModes: CellStatus[][] = matches.map((rows: boolean[]) =>
        rows.map((match: boolean) => {
          return { value: match ? "matched" : "unmatched" } as CellStatus;
        })
      );
      setModes(tmpModes);
    }
  }, [gamePhase, stringifyMatches, matches]); // 이중배열의 경우 각각의 요소가 바뀌게 되면 useEffect롤 호출하기 위해 JSON.stringify를 사용할 수 있음

  const handleNumberChange = (
    rowIdx: number,
    colIdx: number,
    newNumber: number
  ) => {
    const newNumbers = numbers.map((row, rIdx) =>
      row.map((num, cIdx) =>
        rIdx === rowIdx && cIdx === colIdx ? newNumber : num
      )
    );
    onNumbersChange(newNumbers);

    if (gamePhase === "start") {
      const tmpModes: CellStatus[][] = matches.map((rows: boolean[]) =>
        rows.map((match: boolean) => {
          return { value: match ? "matched" : "unmatched" } as CellStatus;
        })
      );
      setModes(tmpModes);
    }
    

  };

  return (
    <StyledBoard columns={BINGO_SIZE} boxSize={70 * BINGO_SIZE + 50}>
      {numbers.map((row, rowIdx) =>
        row.map((number, colIdx) => (
          <BingoCell
            key={`${rowIdx}-${colIdx}`}
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

const StyledBoard = styled.div<{ columns: number; boxSize: number}>`
  width: ${(props) => props.boxSize}px; /* 적당하게 조절할 것 */
  background-color: grey;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  gap: 10px;
`;
