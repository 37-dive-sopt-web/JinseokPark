/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";
import { useState, useEffect, useCallback } from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import { Wrapper, Title } from "../styles/CommonStyles.js";
import CardDeck from "./CardDeck.jsx";
import Modal from "./Modal.jsx";

const gameBoard = css`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 80vw;
  padding: 4rem;
  border-radius: 1.6rem;
  background-color: ${theme.colors.secondary};
`;

const cardDeck = css`
  padding: 5rem;
  margin-left: 5rem;
`;

const board__control = css`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  gap: 3rem;
  margin-left: 10rem;
  padding: 3rem;
  border-radius: 1.6rem;
  background-color: ${theme.colors.section};
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
    border-radius: 0.8rem;
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.main};
  }

  div > p {
    font-weight: 700;
  }
`;

const board__level = css`
  padding: 1rem;
  font-size: 2rem;
  border-radius: 1.6rem;
  border: none;
  color: ${theme.colors.main};
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

const board__historyItem = (result) => css`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  background-color: ${result === "성공" ? theme.colors.main : theme.colors.red};
  color: white;
`;

const board__scoreItem = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p:nth-of-type(2) {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${theme.colors.main};
  }
`;

const GameBoard = () => {
  // 모달 창 관리, 레벨 설정, 클리어 시간 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [level, setLevel] = useState(1);
  const [clearTimeRecord, setClearTimeRecord] = useState(0);

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
    totalPairs,
    notice,
  } = useGameLogic(); // 필요한 요소 가져오기

  // 게임 초기화
  const handleResetGame = useCallback(() => {
    resetGame(level);
    setIsModalOpen(false);
  }, [resetGame, level]);

  // 레벨 달라지면 게임 재시작
  useEffect(() => {
    resetGame(level);
  }, [level, resetGame]);

  // 클리어하거나, 시간이 다 지나면 모달창 띄우기. (성공했다면 현재 기록 localStorage 저장)
  useEffect(() => {
    if (count === totalPairs || isTimeUp) {
      if (count === totalPairs && !isTimeUp) {
        let totalTime = 45;
        if (deckInfo.level === 2) totalTime = 60;
        if (deckInfo.level === 3) totalTime = 100;

        const clearTime = totalTime - timeLeft;
        setClearTimeRecord(clearTime);

        // 기록 객체 만들기
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

      // 3초 뒤 게임 초기화
      const timer = setTimeout(() => {
        handleResetGame();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [count, isTimeUp, handleResetGame, totalPairs]);

  return (
    <Wrapper>
      <div css={gameBoard}>
        <div>
          <Title>
            <h3>게임 보드</h3>
            <button onClick={handleResetGame}>게임 리셋</button>
          </Title>
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
          <select
            css={board__level}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          >
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </select>
          <div css={board__score}>
            <div css={board__scoreItem}>
              <p>남은 시간</p>
              <p>{timeLeft.toFixed(2)}</p>
            </div>
            <div css={board__scoreItem}>
              <p>성공한 짝</p>
              <p>
                {count}/{totalPairs}
              </p>
            </div>
            <div css={board__scoreItem}>
              <p>남은 짝</p>
              <p>{totalPairs - count}</p>
            </div>
          </div>
          <div css={board__notice}>
            <p> 안내 메시지</p>
            <div>
              {/* 선택했던 카드를 다시 선택하거나, 이미 매치된 카드 다시 클릭하면 안내 메시지 전달 */}
              {!notice ? (
                <p>카드를 선택해주세요!</p>
              ) : (
                <p>선택할 수 없는 카드입니다!</p>
              )}
            </div>
          </div>
          <div css={board__history}>
            <p>최근 히스토리</p>
            <div css={board__historyList}>
              {history.length === 0 ? (
                <p>아직 뒤집은 카드가 없어요</p>
              ) : (
                history.map((ele) => (
                  <div key={ele.id} css={board__historyItem(ele.result)}>
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
          {/* 시간 초과일 때, 성공일 때 Modal의 children 다르게 렌더링 */}
          {isTimeUp ? (
            <>
              <h2>실패입니다!</h2>
              <p>제한 시간이 초과되었습니다!</p>
            </>
          ) : (
            <>
              <h2>축하합니다!</h2>
              <p>모든 짝을 맞췄습니다!</p>
              <p>{clearTimeRecord.toFixed(2)}초만에 통과했어요!</p>
            </>
          )}
          <p>3초 후 자동으로 새 게임을 시작해요</p>
        </Modal>
      )}
    </Wrapper>
  );
};

export default GameBoard;
