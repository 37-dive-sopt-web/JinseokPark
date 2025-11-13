import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const goLoginStyle = style({
  display: "flex",
  gap: "1rem",
});

globalStyle(`${goLoginStyle} span`, {
  fontWeight: 700,
  color: theme.colors.main,
  cursor: "pointer",
});
