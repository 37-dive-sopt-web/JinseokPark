/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { theme } from "../theme";

const wrapper = css`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const header = css`
  display: flex;
  justify-content: space-between;
  width: 80vw;
  padding: 2rem;
  border-radius: 1.6rem;
  background-color: ${theme.colors.secondary};

  h1 {
    font-size: 3rem;
  }
`;

const btnGroup = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  button {
    padding: 1rem 2.5rem;
    font-size: 1.5rem;
    border-radius: 1.6rem;
    border: none;
    background-color: ${theme.colors.main};
    color: white;
    transition: all 0.5s ease;
  }

  button:hover {
    background-color: ${theme.colors.hover};
    transform: translateY(-0.5rem);
  }
`;

const Header = () => {
  return (
    <div css={wrapper}>
      <div css={header}>
        <h1>숫자 카드 짝 맞추기</h1>
        <div css={btnGroup}>
          <button>게임</button>
          <button>랭킹</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
