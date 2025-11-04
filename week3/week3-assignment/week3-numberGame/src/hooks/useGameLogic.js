import { useState, useEffect, useRef } from "react";
import { buildDeck } from "../utils/utils.js";

export function useGameLogic({
  handleCountUpdate,
  handleTimeUpdate,
  handleTimeUp,
}) {
  const [deckInfo, setDeckInfo] = useState({
    status: "idle",
    data: null,
    level: 1,
  });

  const [flipCard, setFlipCard] = useState([]);
  const [matchedCard, setMatchedCard] = useState(new Set());
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const flipTimerRef = useRef(null);
  const gameTimerRef = useRef(null);

  const generateDeck = (level = 1) => {
    const data = buildDeck(level);
    setDeckInfo({ status: "ready", data, level });
    setFlipCard([]);
    setMatchedCard(new Set());
    setIsLocked(false);

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);

    setIsTimerRunning(false);
    setTimeLeft(45);

    if (handleTimeUpdate) handleTimeUpdate(45);
    if (handleTimeUp) handleTimeUp(false);
  };

  const handleCardFlip = (card) => {
    if (
      isLocked ||
      flipCard.some((c) => c.id === card.id) ||
      matchedCard.has(card.id)
    ) {
      return;
    }

    if (matchedCard.size === 0 && flipCard.length === 0 && !isTimerRunning) {
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
      } else {
        flipTimerRef.current = setTimeout(() => {
          setFlipCard([]);
          setIsLocked(false);
        }, 700);
      }
    }
  };

  useEffect(() => {
    generateDeck(1);
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const count = matchedCard.size / 2;
    handleCountUpdate(count);
  }, [matchedCard, handleCountUpdate]);

  useEffect(() => {
    if (isTimerRunning) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.01;

          if (handleTimeUpdate) handleTimeUpdate(newTime);

          if (newTime <= 0) {
            clearInterval(gameTimerRef.current);
            setIsTimerRunning(false);
            setIsLocked(true);
            if (handleTimeUp) handleTimeUp(true);
            return 0;
          }

          return newTime;
        });
      }, 10);
    }
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, [isTimerRunning, handleTimeUpdate, handleTimeUp]);

  return {
    deckInfo,
    flipCard,
    matchedCard,
    handleCardFlip,
    generateDeck,
  };
}
