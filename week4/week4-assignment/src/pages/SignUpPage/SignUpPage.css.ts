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

export const passwordContainerStyle = style({
  position: "relative",
});

globalStyle(`${passwordContainerStyle} button`, {
  position: "absolute",
  right: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "none",
  cursor: "pointer",
  fontSize: theme.fontSizes.large,
  color: "#777",
  zIndex: 10,
});
