/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";
import { useState, useEffect, useCallback } from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import CardDeck from "./CardDeck.jsx";
import Modal from "./Modal.jsx";

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
  border-radius: 1.6rem;
`;

const board__history = css`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 2rem;

  > p {
    font-size: 2rem;
    color: white;
  }
`;

const board__historyList = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.6rem;
  border-radius: 1.6rem;
  background-color: ${theme.colors.secondary};

  > p {
    color: ${theme.colors.main};
    margin: auto;
  }
`;

const board__historyItem = css`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  color: white;
  background-color: ${theme.colors.main};
  border-radius: 0.8rem;
`;

const GameBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    deckInfo,
    flipCard,
    matchedCard,
    handleCardFlip,
    count,
    timeLeft,
    isTimeUp,
    resetGame,
    history,
  } = useGameLogic();

  const handleResetGame = useCallback(() => {
    resetGame();
    setIsModalOpen(false);
  }, [resetGame]);

  useEffect(() => {
    if (count === 8 || isTimeUp) {
      if (count === 8 && !isTimeUp) {
        const clearTime = 45 - timeLeft;
        const newRecord = {
          level: deckInfo.level,
          time: clearTime,
          date: new Date().toISOString(),
        };

        const ranking = JSON.parse(localStorage.getItem("rankings") || "[]");
        ranking.push(newRecord);
        localStorage.setItem("rankings", JSON.stringify(ranking));
      }

      setIsModalOpen(true);

      const timer = setTimeout(() => {
        handleResetGame();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [count, isTimeUp, handleResetGame]);

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
            <div css={board__historyList}>
              {history.length === 0 ? (
                <p>아직 뒤집은 카드가 없어요</p>
              ) : (
                history.map((ele) => (
                  <div key={ele.id} css={board__historyItem}>
                    <span>{`${ele.card1}, ${ele.card2}`}</span>
                    <span>{ele.result}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal>
          {isTimeUp ? (
            <>
              <h2>실패입니다!</h2>
              <p>제한 시간이 초과되었습니다!</p>
            </>
          ) : (
            <>
              <h2>축하합니다!</h2>
              <p>모든 짝을 맞췄습니다!</p>
            </>
          )}
          <p>3초 후 자동으로 새 게임을 시작해요</p>
        </Modal>
      )}
    </div>
  );
};

export default GameBoard;
