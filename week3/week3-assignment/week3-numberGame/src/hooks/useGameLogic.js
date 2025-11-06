import { useState, useEffect, useRef, useCallback } from "react";
import { buildDeck } from "../utils/utils.js";

export function useGameLogic() {
  const [deckInfo, setDeckInfo] = useState({
    status: "idle",
    data: null,
    level: 1,
  });

  const [flipCard, setFlipCard] = useState([]);
  const [matchedCard, setMatchedCard] = useState(new Set());
  const [isLocked, setIsLocked] = useState(false);

  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const flipTimerRef = useRef(null);
  const gameTimerRef = useRef(null);

  const [history, setHistory] = useState([]);
  const [totalPairs, setTotalPairs] = useState(8);

  const [notice, setNotice] = useState(false);

  const resetGame = useCallback((level) => {
    const data = buildDeck(level);
    setDeckInfo({ status: "ready", data, level });
    setFlipCard([]);
    setMatchedCard(new Set());
    setIsLocked(false);

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    setIsTimerRunning(false);
    setIsTimeUp(false);
    setCount(0);
    setHistory([]);
    setNotice(false);

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

  const handleCardFlip = (card) => {
    if (
      isLocked ||
      flipCard.some((c) => c.id === card.id) ||
      matchedCard.has(card.id)
    ) {
      setNotice(true);
      return;
    }

    if (!isTimerRunning && !isTimeUp) {
      setIsTimerRunning(true);
    }

    if (flipCard.length === 0) {
      setFlipCard([card]);
      setNotice(false);
      return;
    }

    if (flipCard.length === 1) {
      setIsLocked(true);
      const newflipCard = [flipCard[0], card];
      setFlipCard(newflipCard);
      setNotice(false);

      if (newflipCard[0].value === newflipCard[1].value) {
        setMatchedCard((prev) =>
          new Set(prev).add(card.id).add(flipCard[0].id)
        );
        setFlipCard([]);
        setIsLocked(false);

        const newHistory = {
          id: Date.now(),
          card1: newflipCard[0].value,
          card2: newflipCard[1].value,
          result: "성공",
        };
        setHistory((prev) => [newHistory, ...prev].slice(0, 10));
      } else {
        const newHistory = {
          id: Date.now(),
          card1: newflipCard[0].value,
          card2: newflipCard[1].value,
          result: "실패",
        };
        setHistory((prev) => [newHistory, ...prev].slice(0, 10));
        flipTimerRef.current = setTimeout(() => {
          setFlipCard([]);
          setIsLocked(false);
        }, 700);
      }
    }
  };

  useEffect(() => {
    resetGame(1);
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    };
  }, [resetGame]);

  useEffect(() => {
    const newCount = matchedCard.size / 2;
    setCount(newCount);

    if (newCount === totalPairs) {
      setIsTimerRunning(false);
      setIsLocked(true);
    }
  }, [matchedCard, totalPairs]);

  useEffect(() => {
    if (isTimerRunning) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.01;

          if (newTime <= 0) {
            clearInterval(gameTimerRef.current);
            setIsTimerRunning(false);
            setIsLocked(true);
            setIsTimeUp(true);
            return 0;
          }

          return newTime;
        });
      }, 10);
    } else {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
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
