/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";
import { useState } from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import CardDeck from "./CardDeck.jsx";

const gameBoard = css`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 80vw;
  padding: 4rem;
  background-color: ${theme.colors.secondary};
  border-radius: 1.6rem;
`;

const cardDeck = css`
  padding: 5rem;
  margin-left: 5rem;
`;

const wrapper = css`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const board__title = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 3rem;
  }

  button {
    padding: 1rem 2rem;
    border-radius: 1.6rem;
    border: none;
    font-size: 1.5rem;
    background-color: ${theme.colors.point};
    color: white;
    transition: all 0.5s ease;
  }

  button:hover {
    transform: translateY(-0.5rem);
  }
`;

const board__control = css`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  gap: 3rem;
  background-color: ${theme.colors.section};
  margin-left: 10rem;
  padding: 3rem;
  border-radius: 1.6rem;
`;

const board__score = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    background-color: ${theme.colors.secondary};
    border-radius: 0.8rem;
  }
`;

const board__notice = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: white;

  p {
    font-size: 2rem;
  }

  div {
    padding: 3rem 1rem;
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.main};
    border-radius: 0.8rem;
  }

  div > p {
    font-weight: 700;
  }
`;

const board__level = css`
  padding: 1rem;
  font-size: 2rem;
  border-radius: 0.8rem;
  border: none;
  color: ${theme.colors.main};
`;

const board__history = css`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 2rem;
  color: white;
  font-size: 2rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.main};
  }
`;

const GameBoard = () => {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleCountUpdate = (count) => {
    setCount(count);
  };

  const handleTimeUpdate = (time) => {
    setTimeLeft(time);
  };

  const handleTimeUp = (isTimeUp) => {
    setIsTimeUp(isTimeUp);
  };

  const { deckInfo, flipCard, matchedCard, handleCardFlip, generateDeck } =
    useGameLogic({
      handleCountUpdate,
      handleTimeUpdate,
      handleTimeUp,
    });

  const handleResetGame = () => {
    generateDeck(1);
  };

  return (
    <div css={wrapper}>
      <div css={gameBoard}>
        <div>
          <div css={board__title}>
            <h3>게임 보드</h3>
            <button onClick={handleResetGame}>게임 리셋</button>
          </div>
          <div css={cardDeck}>
            <CardDeck
              deckInfo={deckInfo}
              flipCard={flipCard}
              matchedCard={matchedCard}
              handleCardFlip={handleCardFlip}
            />
          </div>
        </div>
        <div css={board__control}>
          <select css={board__level}>
            <option value="1">Level 1</option>
          </select>
          <div css={board__score}>
            <div>
              <p>남은 시간</p>
              <p>{timeLeft.toFixed(2)}</p>
            </div>
            <div>
              <p>성공한 짝</p>
              <p>{count}/8</p>
            </div>
            <div>
              <p>남은 짝</p>
              <p>{8 - count}</p>
            </div>
          </div>
          <div css={board__notice}>
            <p> 안내 메시지</p>
            <div>
              <p>카드를 눌러 게임을 시작</p>
            </div>
          </div>
          <div css={board__history}>
            <p>최근 히스토리</p>
            <div>
              <p>아직 뒤집은 카드가 없어요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
