import { useState, useEffect, useRef } from "react";
import { buildDeck } from "../utils/utils.js";

export function useGameLogic({ handleCountUpdate }) {
  const [deckInfo, setDeckInfo] = useState({
    status: "idle",
    data: null,
    level: 1,
  });

  const [flipCard, setFlipCard] = useState([]);
  const [matchedCard, setMatchedCard] = useState(new Set());
  const [isLocked, setIsLocked] = useState(false);
  const timerRef = useRef(null);

  const generateDeck = (level = 1) => {
    const data = buildDeck(level);
    setDeckInfo({ status: "ready", data, level });
    setFlipCard([]);
    setMatchedCard(new Set());
    setIsLocked(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleCardFlip = (card) => {
    if (
      isLocked ||
      flipCard.some((c) => c.id === card.id) ||
      matchedCard.has(card.id)
    ) {
      return;
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
        timerRef.current = setTimeout(() => {
          setFlipCard([]);
          setIsLocked(false);
        }, 700);
      }
    }
  };

  useEffect(() => {
    generateDeck(1);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const count = matchedCard.size / 2;
    handleCountUpdate(count);
  }, [matchedCard, handleCountUpdate]);

  return {
    deckInfo,
    flipCard,
    matchedCard,
    handleCardFlip,
    generateDeck,
  };
}
