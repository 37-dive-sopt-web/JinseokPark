import { useState, useEffect, useRef, useCallback } from "react";
import { buildDeck } from "../utils/utils.js";

export function useGameLogic() {
  const [deckInfo, setDeckInfo] = useState({
    status: "idle",
    data: null,
    level: 1,
  });

  const [flipCard, setFlipCard] = useState([]); // 카드 flip 여부 관리
  const [matchedCard, setMatchedCard] = useState(new Set()); // 매치된 카드들 관리
  const [isLocked, setIsLocked] = useState(false); // 현재 클릭 가능/불가능 관리

  const [count, setCount] = useState(0); // 맞춘 카드 개수 관리
  const [timeLeft, setTimeLeft] = useState(45); // 남은 시간 관리
  const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 실행, 정지 관리
  const [isTimeUp, setIsTimeUp] = useState(false); // 시간 초과 관리

  const [history, setHistory] = useState([]); // 클릭한 카드 히스토리 관리
  const [totalPairs, setTotalPairs] = useState(8); // 전체 카드 짝 개수 관리

  const [notice, setNotice] = useState(false); // 안내 메시지 조건 관리

  const flipTimerRef = useRef(null); // flip과 관련한 타이머 관리
  const gameTimerRef = useRef(null); // game 전체 타이머 관리

  // 게임 초기화 (재시작) 로직
  const resetGame = useCallback((level) => {
    // 새로운 덱 생성
    const data = buildDeck(level);
    setDeckInfo({ status: "ready", data, level });

    // state 초기화
    setFlipCard([]);
    setMatchedCard(new Set());
    setIsLocked(false);
    setIsTimerRunning(false);
    setIsTimeUp(false);
    setCount(0);
    setHistory([]);
    setNotice(false);

    // 타이머 초기화
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    // 레벨에 따른 전체 카드 짝 수, 남은 시간 설정
    switch (level) {
      case 2:
        setTotalPairs(12);
        setTimeLeft(60);
        break;
      case 3:
        setTotalPairs(18);
        setTimeLeft(100);
        break;
      default:
        setTotalPairs(8);
        setTimeLeft(45);
    }
  }, []);

  // 카드 뒤집기 로직
  const handleCardFlip = (card) => {
    // 잠긴 상태이거나, 이미 뒤집은 카드이거나, 이미 매치된 카드이면 안내 띄우기
    if (
      isLocked ||
      flipCard.some((c) => c.id === card.id) ||
      matchedCard.has(card.id)
    ) {
      setNotice(true);
      return;
    }

    // 타이머 실행 (첫 클릭 때만)
    if (!isTimerRunning && !isTimeUp) {
      setIsTimerRunning(true);
    }

    // 아직 첫 번째 클릭이면 배열에 넣고 종료
    if (flipCard.length === 0) {
      setFlipCard([card]);
      setNotice(false);
      return;
    }

    // 두 번째 카드 클릭이면 비교
    if (flipCard.length === 1) {
      setIsLocked(true); // 잠시 클릭 못하게 잠금
      const newflipCard = [flipCard[0], card];
      setFlipCard(newflipCard);
      setNotice(false);

      if (newflipCard[0].value === newflipCard[1].value) {
        // 일치
        setMatchedCard(
          (prev) => new Set(prev).add(card.id).add(flipCard[0].id) // 매치된 카드 Set에 추가
        );
        setFlipCard([]);
        setIsLocked(false);

        // 히스토리 객체 생성해서 추가 (10개까지만)
        const newHistory = {
          id: Date.now(),
          card1: newflipCard[0].value,
          card2: newflipCard[1].value,
          result: "성공",
        };
        setHistory((prev) => [newHistory, ...prev].slice(0, 10));
      } else {
        // 불일치
        const newHistory = {
          id: Date.now(),
          card1: newflipCard[0].value,
          card2: newflipCard[1].value,
          result: "실패",
        };
        setHistory((prev) => [newHistory, ...prev].slice(0, 10));

        // 클릭 후 700ms 후 카드를 다시 뒤집고 잠금 해제 (2장 클릭하고 바로 다른 클릭 방지)
        flipTimerRef.current = setTimeout(() => {
          setFlipCard([]);
          setIsLocked(false);
        }, 700);
      }
    }
  };

  // 처음 게임 시작할 때 초기화
  useEffect(() => {
    resetGame(1);
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [resetGame]);

  // 매치된 카드 Set 활용해서 맞춘 카드 수 업데이트
  useEffect(() => {
    const newCount = matchedCard.size / 2;
    setCount(newCount);

    if (newCount === totalPairs) {
      setIsTimerRunning(false);
      setIsLocked(true);
    }
  }, [matchedCard, totalPairs]);

  // 게임 전체 타이머 설정
  useEffect(() => {
    if (isTimerRunning) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.1;

          if (newTime <= 0) {
            clearInterval(gameTimerRef.current);
            setIsTimerRunning(false);
            setIsLocked(true);
            setIsTimeUp(true);
            return 0;
          }

          return newTime;
        });
      }, 100);
    }

    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, [isTimerRunning]);

  return {
    deckInfo,
    flipCard,
    matchedCard,
    handleCardFlip,
    resetGame,
    count,
    timeLeft,
    isTimeUp,
    history,
    totalPairs,
    notice,
  };
}
