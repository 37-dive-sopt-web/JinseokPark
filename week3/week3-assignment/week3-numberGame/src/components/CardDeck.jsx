/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { theme } from "../theme";

function shuffle(array, rng = Math.random) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck(level = 1) {
  const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };

  const [rows, cols] = LEVEL_TO_GRID[level] ?? [4, 4];
  const total = rows * cols;

  if (total % 2 !== 0) throw new Error("카드 개수는 짝수여야 해요.");

  const pairs = total / 2;
  const base = Array.from({ length: pairs }, (_, i) => i + 1);

  const duplicated = [];
  for (let i = 0; i < base.length; i += 1) {
    const v = base[i];
    duplicated.push({ id: `${v}-a`, value: v });
    duplicated.push({ id: `${v}-b`, value: v });
  }

  return shuffle(duplicated);
}

const cardDeck1 = css`
  display: grid;
  grid-template-columns: repeat(4, 10rem);
  gap: 1rem;
`;

const cardInnerStyle = (isFlipped) => css`
  position: relative;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const cardFaceStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.8rem;
  line-height: 10rem;
  text-align: center;
  font-size: 2.5rem;
`;

const cardFront = css`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.main};
  transform: rotateY(180deg);
`;

const cardBack = css`
  background-color: ${theme.colors.main};
  color: white;
`;

function CardDeck() {
  const [deckInfo, setDeckInfo] = useState({
    status: "idle",
    data: null,
    level: 1,
  });

  const [flipCard, setFlipCard] = useState(new Set());

  const generateDeck = (level = deckInfo.level) => {
    const data = buildDeck(level);
    setDeckInfo({ status: "ready", data, level });
    setFlipCard(new Set());
  };

  const handleCardFlip = (cardId) => {
    setFlipCard((prevIds) => new Set(prevIds).add(cardId));
  };

  useEffect(() => {
    generateDeck(1);
  }, []);

  return (
    <div>
      {deckInfo.status === "ready" && (
        <div>
          <div css={cardDeck1}>
            {deckInfo.data.map((card) => {
              const isFlipped = flipCard.has(card.id);

              return (
                <div
                  key={card.id}
                  css={cardInnerStyle(isFlipped)}
                  onClick={() => handleCardFlip(card.id)}
                >
                  <div css={[cardFaceStyle, cardFront]}>{card.value}</div>
                  <div css={[cardFaceStyle, cardBack]}>?</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDeck;
