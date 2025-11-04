/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";
import CardDeck from "./CardDeck.jsx";

const gameBoard = css`
  width: 80vw;
  background-color: ${theme.colors.secondary};
  border-radius: 1.6rem;

  h3 {
    font-size: 2.5rem;
    margin-left: 3rem;
    margin-top: 3rem;
  }
`;

const cardDeck = css`
  padding: 5rem;
`;

const wrapper = css`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const GameBoard = () => {
  return (
    <div css={wrapper}>
      <div css={gameBoard}>
        <h3>게임 보드</h3>
        <div css={cardDeck}>
          <CardDeck />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
