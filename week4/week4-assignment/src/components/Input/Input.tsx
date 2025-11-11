import type { ChangeEvent } from "react";
import { InputStyle } from "./Input.css";

interface InputProps {
  value: string;
  placeholder: string;
  type: "text" | "password" | "email" | "number";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, placeholder, type = "text", onChange }: InputProps) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className={InputStyle}
    />
  );
};

export default Input;
