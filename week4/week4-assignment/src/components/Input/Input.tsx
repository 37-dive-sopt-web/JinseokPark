import type { ChangeEvent } from "react";
import { InputStyle } from "./Input.css";

interface InputProps {
  value: string | number | undefined;
  placeholder: string;
  type: "text" | "password" | "email" | "number";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Input = ({
  value,
  placeholder,
  type = "text",
  onChange,
  id,
}: InputProps) => {
  return (
    <input
      value={String(value ?? "")}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className={InputStyle}
      id={id}
    />
  );
};

export default Input;
