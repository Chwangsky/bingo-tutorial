// App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import BingoBoard from "./component/BingoBoard";
import { gameStateImpl } from "./models";
import GameState from "./models/GameState";
import styled from "styled-components";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const App = () => {
  const MAX_NUMBER = 15;
  const BINGO_SIZE = 3;
  // TODO const MAX_PLAYERS = 5;

  const [gamePhase, setGamePhase] = useState<"initial" | "start">("initial");

  const [gameState, setGameState] = useState<GameState>(
    gameStateImpl(BINGO_SIZE)
  );

  const [playersNumbers, setPlayersNumbers] = useState<number[][][]>([]);

  const [playersMatches, setPlayersMatches] = useState<boolean[][][]>([]);

  const [isStartCondition, setIsStartCondition] = useState<boolean>(false);

  // function: playersNumbers의 유효성을 체크하는 함수 //
  function isStartConditionSatisfied(): boolean {
    if (!playersNumbers) return false;

    // 만약 2명 미만의 플레이어가 존재하지 않으면 false 반환
    if (playersNumbers.length < 2) {
      enqueueSnackbar("2명 이상의 플레이어가 필요합니다.", {
        variant: "error",
      });
      return false;
    }

    // 만약 player들 중 같은 숫자를 중복해서 가지고 있는 플레이어가 있다면 false 반환
    for (const numbers of playersNumbers) {
      if (isArrayHasDuplicatedValue(numbers)) {
        enqueueSnackbar(`하나의 플레이어에 중복된 숫자가 존재합니다.`, {
          variant: "error",
        }); // TODO 플레이어 번호를 수정하도록 고칠 것
        return false;
      }
    }

    // 만약 숫자들 중 어느 하나라도 MAX_NUMBER보다 크다면 false 반환. 그렇지않으면 true 반환
    for (const numbers of playersNumbers) {
      if (numbers.flat().some((value) => value > MAX_NUMBER || value <= 0)) {
        enqueueSnackbar(
          `범위를 벗어났습니다. 0부터 ${MAX_NUMBER}까지 숫자만 입력하세요`,
          { variant: "error" }
        );
        return false;
      }
    }

    // 위 조건을 충족하면 true 반환
    return true;
  }

  // function: 2중 배열 중 중복된 값이 존재하는지 확인하는 함수 //
  function isArrayHasDuplicatedValue(array: number[][]): boolean {
    const seenValues = new Set<any>();
    for (const value of array.flat()) {
      if (seenValues.has(value)) {
        return true; // 중복된 값이 존재하면 false 반환
      }
      seenValues.add(value);
    }
    return false; // 중복된 값이 없으면 true 반환
  }

  // handler: start 버튼을 클릭한 경우
  const onStartButtonClickHandler = (): void => {
    if (!isStartConditionSatisfied()) {
      return;
    }
    if (!playersNumbers) return;
    gameState.addAllPlayer(playersNumbers);
    setGamePhase("start");
  };

  const onResetButtonClickHandler = (): void => {
    setGamePhase("initial");
    setPlayersNumbers([]);
    setPlayersMatches([]);
    setGameState(new GameState(BINGO_SIZE));
  };

  const onAddPlayerButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    console.log(playersNumbers); //
    setPlayersNumbers((prev) => {
      return [
        ...prev,
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
      ];
    });
    setPlayersMatches((prev) => {
      return [
        ...prev,
        [
          [false, false, false],
          [false, false, false],
          [false, false, false],
        ],
      ];
    });
  };

  const onCallNumberInputKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const givenNumber = parseInt(event.currentTarget.value, 10);
      if (givenNumber > MAX_NUMBER || givenNumber <= 0) {
        enqueueSnackbar(`1 이상 15 이하의 숫자를 입력하고 엔터키를 눌러주세요`, {
          variant: "error",
        });
        return;
      }
      gameState.callNumber(givenNumber);
      setPlayersMatches(gameState.getMatchesOfAllPlayers());
    }
  };

  const handleNumbersChange = (playerIdx: number, newNumbers: number[][]) => {
    const newPlayersNumbers = playersNumbers.map((nums, pIdx) =>
      pIdx === playerIdx ? newNumbers : nums
    ) as number[][][];
    setPlayersNumbers(newPlayersNumbers);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        {gamePhase === "initial" && (
          <div className="initial-button-box">
            <button onClick={onStartButtonClickHandler}>START</button>
            <button onClick={onAddPlayerButtonClickHandler}>ADD PLAYER</button>
          </div>
        )}
        {gamePhase === "start" && (
          <div>
            <div className="start-button-box">
              <CallNumberInput
                type="number"
                placeholder={`1에서 ${MAX_NUMBER}까지의 숫자를 입력하세요`}
                onKeyDown={onCallNumberInputKeyDownHandler}
              />
              <button onClick={onResetButtonClickHandler}>RESET</button>
            </div>
          </div>
        )}
        <div className="bingo-boards-box">
          {playersMatches! &&
            playersNumbers! &&
            playersNumbers.map((player, playerIdx) => (
              <>
              <div>
                {playerIdx+1}번째 플레이어
              </div>
              <BingoBoard
                key={`${playerIdx}`}
                numbers={playersNumbers[playerIdx]}
                onNumbersChange={(newNumbers: number[][]) =>
                  handleNumbersChange(playerIdx, newNumbers)
                }
                matches={playersMatches[playerIdx]}
                gamePhase={`${gamePhase}`}
              />
              </>
            ))} 
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default App;

const CallNumberInput = styled.input`
  width: 100%;
  background-color: white;
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
`;
