import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CellStatus from "../types/CellStatus";


interface BingoCellProps {
  number: number;
  mode: CellStatus;
  onNumberChange: (newNumber: number) => void;
}

export default function BingoCell({
  number,
  mode,
  onNumberChange,
}: BingoCellProps) {
  const [color, setColor] = useState<string>("yellow");

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value); 
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      onNumberChange(numberValue); 
    }
  };

  useEffect(() => {
    switch (mode.value) {
      case "form":
        setColor("lightyellow");
        break;
      case "unmatched":
        setColor("lightgreen");
        break;
      case "matched":
        setColor("lightblue");
        break;
      default:
        setColor("grey");
        break;
    }
  }, [mode]);

  return (
    <BingoTile color={color}>
      {mode.value === "form" && (
        <NumberInput
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
      {mode.value === "unmatched" && <NumberDiv>{inputValue}</NumberDiv>}
      {mode.value === "matched" && <NumberDiv>{inputValue}</NumberDiv>}
    </BingoTile>
  );
}

const BingoTile = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border: none;
  margin: 10px;
  width: 50px; /* 필요시 수정 */
  height: 50px; /* 필요시 수정 */
  border-radius: 50%;
  display: flex;
  flex-direction: center;
  align-items: center;
`;

const NumberInput = styled.input`
  width: 100%;
  background-color: transparent;
  text-align: center;
  font-size: 20px;
  text-align: center;
  border: none;
  outline: none;

  /* 스핀 버튼 제거 */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const NumberDiv = styled.div`
  width: 100%;
  background-color: transparent;
  text-align: center;
  font-size: 20px;
  text-align: center;
  border: none;
  outline: none;
`;
