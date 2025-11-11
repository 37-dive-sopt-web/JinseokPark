import type { ReactNode } from "react";
import { buttonStyle } from "./Button.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button type={type} className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
