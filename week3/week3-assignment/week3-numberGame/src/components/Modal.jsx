/** @jsxImportSource @emotion/react */
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import { theme } from "../theme";

const modalRoot = document.getElementById("modal");

const modalOverlay = css`
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

const modalContent = css`
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
    font-size: 2.5rem;
    font-weight: 700;
    color: ${theme.colors.main};
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
