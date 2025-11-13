import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const buttonStyle = style({
  width: "100%",
  padding: `${theme.spacing.large} 0`,
  border: "none",
  borderRadius: "0.8rem",
  backgroundColor: theme.colors.main,
  color: theme.colors.white,
  fontSize: theme.fontSizes.large,
  cursor: "pointer",
  transition: "all 0.3s ease",

  ":hover": {
    backgroundColor: theme.colors.hover,
  },
  ":disabled": {
    backgroundColor: theme.colors.gray,
    color: theme.colors.white,
    cursor: "not-allowed",
    opacity: "0.8",
    pointerEvents: "none",
  },
});
