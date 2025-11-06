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

  const resetGame = useCallback((level = 1) => {
    const data = buildDeck(level);
    setDeckInfo({ status: "ready", data, level });
    setFlipCard([]);
    setMatchedCard(new Set());
    setIsLocked(false);

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    setIsTimerRunning(false);
    setTimeLeft(45);
    setIsTimeUp(false);
    setCount(0);
    setHistory([]);
  }, []);

  const handleCardFlip = (card) => {
    if (
      isLocked ||
      flipCard.some((c) => c.id === card.id) ||
      matchedCard.has(card.id)
    ) {
      return;
    }

    if (!isTimerRunning && !isTimeUp) {
      setIsTimerRunning(true);
    }

    if (flipCard.length === 0) {
      setFlipCard([card]);
      return;
    }

    if (flipCard.length === 1) {
      setIsLocked(true);
      const newflipCard = [flipCard[0], card];
      setFlipCard(newflipCard);

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

    if (newCount === 8) {
      setIsTimerRunning(false);
      setIsLocked(true);
    }
  }, [matchedCard]);

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
  };
}
