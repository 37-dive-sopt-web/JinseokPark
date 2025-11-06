/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";

const getColumns = (level) => {
  switch (level) {
    case 2:
      return 6;
    case 3:
      return 6;
    default:
      return 4;
  }
};

const getSize = (level) => {
  switch (level) {
    case 2:
      return 12;
    case 3:
      return 12;
    default:
      return 18;
  }
};

const cardDeck = (level) => css`
  display: grid;
  grid-template-columns: repeat(${getColumns(level)}, ${getSize(level)}rem);
  gap: 1rem;
`;

const cardInnerStyle = (isFlipped, level) => css`
  position: relative;
  width: ${getSize(level)}rem;
  height: ${getSize(level)}rem;
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const cardFaceStyle = (level) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.8rem;
  line-height: ${getSize(level)}rem;
  text-align: center;
  font-size: 2.5rem;
`;

const cardFront = (isMatched) => css`
  background-color: ${isMatched ? theme.colors.point : theme.colors.secondary};
  color: ${isMatched ? theme.colors.secondary : theme.colors.text};
  border: 1px solid ${isMatched ? theme.colors.point : theme.colors.main};
  transform: rotateY(180deg);
`;

const cardBack = css`
  background-color: ${theme.colors.main};
  color: white;
`;

function CardDeck({ deckInfo, flipCard, matchedCard, handleCardFlip }) {
  return (
    <div>
      {deckInfo.status === "ready" && (
        <div>
          <div css={cardDeck(deckInfo.level)}>
            {deckInfo.data.map((card) => {
              const isMatched = matchedCard.has(card.id);
              const isFlipped =
                flipCard.some((c) => c.id === card.id) ||
                matchedCard.has(card.id);

              return (
                <div
                  key={card.id}
                  css={cardInnerStyle(isFlipped, deckInfo.level)}
                  onClick={() => handleCardFlip(card)}
                >
                  <div
                    css={[cardFaceStyle(deckInfo.level), cardFront(isMatched)]}
                  >
                    {card.value}
                  </div>
                  <div css={[cardFaceStyle(deckInfo.level), cardBack]}>?</div>
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
