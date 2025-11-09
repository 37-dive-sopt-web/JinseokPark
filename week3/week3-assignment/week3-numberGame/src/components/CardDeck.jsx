/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";

// 현재 레벨에 따라 열 정하기
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

// 현재 레벨에 따라 카드 사이즈 정하기
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

// 그리드 활용해서 덱 레이아웃 설정
const cardDeck = (level) => css`
  display: grid;
  grid-template-columns: repeat(${getColumns(level)}, ${getSize(level)}rem);
  gap: 1rem;
`;

// 카드 자체 스타일링 (rotateY 활용 flip 설정)
const cardInnerStyle = (isFlipped, level) => css`
  position: relative;
  width: ${getSize(level)}rem;
  height: ${getSize(level)}rem;
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

// 카드에서 보이는 부분 스타일링
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

// 카드 앞면 스타일링 (이미 매치된 카드 색상은 다르게 설정)
const cardFront = (isMatched) => css`
  border: 1px solid ${isMatched ? theme.colors.point : theme.colors.main};
  background-color: ${isMatched ? theme.colors.point : theme.colors.secondary};
  color: ${isMatched ? theme.colors.secondary : theme.colors.text};
  transform: rotateY(180deg); // 미리 180도 회전하여 뒤집어 놓기
`;

// 카드 뒷면 스타일링
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
              // 이미 매치된 카드인지, 뒤집어진 카드인지 판단
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
