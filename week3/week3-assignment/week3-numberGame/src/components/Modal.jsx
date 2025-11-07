/** @jsxImportSource @emotion/react */
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import { theme } from "../theme";

const modalRoot = document.getElementById("modal");

const modal = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`;

const modal__content = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 5rem 20rem;
  border-radius: 1.6rem;
  background-color: ${theme.colors.secondary};

  h2 {
    font-size: 3rem;
  }

  p {
    font-size: 2rem;
  }

  p:nth-of-type(2) {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.point};
  }

  p:nth-of-type(3) {
    margin-top: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
    color: ${theme.colors.main};
  }
`;

function Modal({ children }) {
  // createPortal 사용 모달창 띄우기
  return ReactDOM.createPortal(
    <div css={modal}>
      <div css={modal__content}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
