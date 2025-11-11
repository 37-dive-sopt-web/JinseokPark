import type { ReactNode } from "react";
import { buttonStyle } from "./Button.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button type="button" className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
