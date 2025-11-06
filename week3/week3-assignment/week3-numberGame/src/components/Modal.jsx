/** @jsxImportSource @emotion/react */
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import { theme } from "../theme";

const modalRoot = document.getElementById("modal");

const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modalContent = css`
  background-color: ${theme.colors.secondary};
  display: flex;
  flex-direction: column;
  padding: 5rem 20rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1.6rem;

  h2 {
    font-size: 3rem;
  }

  p {
    font-size: 2rem;
  }

  p:nth-of-type(2) {
    color: ${theme.colors.main};
    margin-top: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div css={modalOverlay}>
      <div css={modalContent}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
