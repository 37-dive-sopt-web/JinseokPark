/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";
import { useGameLogic } from "../hooks/useGameLogic";

const cardDeck1 = css`
  display: grid;
  grid-template-columns: repeat(4, 18rem);
  gap: 1rem;
`;

const cardInnerStyle = (isFlipped) => css`
  position: relative;
  width: 18rem;
  height: 18rem;
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
  line-height: 18rem;
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

function CardDeck({ handleCountUpdate }) {
  const { deckInfo, flipCard, matchedCard, handleCardFlip } = useGameLogic({
    handleCountUpdate,
  });

  return (
    <div>
      {deckInfo.status === "ready" && (
        <div>
          <div css={cardDeck1}>
            {deckInfo.data.map((card) => {
              const isFlipped =
                flipCard.some((c) => c.id === card.id) ||
                matchedCard.has(card.id);

              return (
                <div
                  key={card.id}
                  css={cardInnerStyle(isFlipped)}
                  onClick={() => handleCardFlip(card)}
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
