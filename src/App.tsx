// App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import BingoBoard from "./component/BingoBoard";
import { gameStateImpl } from "./models";
import GameState from "./models/GameState";
import styled from "styled-components";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { BINGO_COUNT_FOR_WIN, BINGO_SIZE, MAX_NUMBER } from "./constant";



const App = () => {
  
  // TODO const MAX_PLAYERS = 5;

  const [gamePhase, setGamePhase] = useState<"initial" | "start">("initial");

  const [gameState, setGameState] = useState<GameState>(
    gameStateImpl(BINGO_SIZE)
  );

  const [playersNumbers, setPlayersNumbers] = useState<number[][][]>([]);

  const [playersMatches, setPlayersMatches] = useState<boolean[][][]>([]);

  const [isPlayerWin, setIsPlayerWin] = useState<boolean[]>([]);

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
        enqueueSnackbar(`하나의 플레이어에 중복된 수가 존재합니다.`, {
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

  // function: 2중 배열 중 중복된 값이 존재하는지 확인하는 메소드
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

  // handler: start 버튼을 클릭한 경우 실행할 메소드
  const onStartButtonClickHandler = (): void => {
    if (!isStartConditionSatisfied()) {
      return;
    }
    if (!playersNumbers) return;
    gameState.addAllPlayer(playersNumbers);
    setGamePhase("start");
  };

  // handler; reset 버튼을 클릭한 경우 실행할 메소드
  const onResetButtonClickHandler = (): void => {
    setGamePhase("initial");
    setPlayersNumbers([]);
    setPlayersMatches([]);
    setIsPlayerWin([]);
    setGameState(new GameState(BINGO_SIZE));
  };

  const onAddPlayerButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setPlayersNumbers((prev) => {
      const newBingoBoard = Array.from({ length: BINGO_SIZE }, () =>
        Array.from({ length: BINGO_SIZE }, () => 0)
      );

      return [...prev, newBingoBoard];
    });
    setPlayersMatches((prev) => {
      return [
        ...prev,
        Array.from({ length: BINGO_SIZE }, () =>
          Array.from({ length: BINGO_SIZE }, () => false)
        ),
      ];
    });
    setIsPlayerWin((prev) => {
      return [...prev, false];
    });
  };

  const onCallNumberInputKeyDownHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const processWinningPlayer = () => {
      gameState.getBingoCountsOfAllPlayers().forEach((val, idx) => {
        if (isPlayerWin[idx] === false && val >= BINGO_COUNT_FOR_WIN) {
          enqueueSnackbar(`${idx + 1}번째 플레이어가 승리하였습니다!`, {
            variant: "success",
          });
          setIsPlayerWin((prev) => {
            return prev.map((val, idx_) => (idx_ === idx ? true : val));
          });
        }
      });
    };

    if (event.key === "Enter") {
      const givenNumber = parseInt(event.currentTarget.value, 10);
      if (givenNumber > MAX_NUMBER || givenNumber <= 0) {
        enqueueSnackbar(`범위를 벗어난 숫자입니다.`, { variant: "error" });
        return;
      }
      gameState.callNumber(givenNumber);
      setPlayersMatches(gameState.getMatchesOfAllPlayers());
      processWinningPlayer();
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
        <HeadBingo>
          <div>BINGO!</div>
          <div>
            <_0woo_>dev. _0woo_</_0woo_>
          </div>
        </HeadBingo>
        {gamePhase === "initial" && (
          <InitialButtonBox>
            <StyledButton onClick={onStartButtonClickHandler}>
              START
            </StyledButton>
            <StyledButton onClick={onAddPlayerButtonClickHandler}>
              ADD PLAYER
            </StyledButton>
          </InitialButtonBox>
        )}
        {gamePhase === "start" && (
          <div>
            <div className="start-button-box">
              <CallNumberInput
                type="number"
                placeholder={`1에서 ${MAX_NUMBER}사이의 수를 입력하고 Enter키를 누르세요`}
                onKeyDown={onCallNumberInputKeyDownHandler}
              />
              <button onClick={onResetButtonClickHandler}>RESET</button>
            </div>
          </div>
        )}
        <BingoBoardBox>
          {playersMatches! &&
            playersNumbers! &&
            playersNumbers.map((player, playerIdx) => (
              <>
                <PlayerInfoBox>PLAYER #{playerIdx + 1}</PlayerInfoBox>
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
        </BingoBoardBox>
      </div>
    </SnackbarProvider>
  );
};

export default App;

const HeadBingo = styled.div`
  font-size: 100px;
  color: white;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const _0woo_ = styled.div`
  font-size: 20px;
`;

const BingoBoardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InitialButtonBox = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #7796b7;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;

const PlayerInfoBox = styled.div`
  color: white;
  font-size: 30px;
  padding: 20px 0px;
`;

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
  }
`;
