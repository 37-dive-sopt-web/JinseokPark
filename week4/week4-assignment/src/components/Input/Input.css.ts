import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const InputStyle = style({
  width: "100%",
  padding: `${theme.spacing.large} ${theme.spacing.medium}`,
  border: `1px solid ${theme.colors.main}`,
  borderRadius: "0.8rem",
  color: theme.colors.text,
  fontSize: theme.fontSizes.large,
  cursor: "pointer",
  transition: "all 0.3s ease",

  ":focus": {
    outline: "none",
    borderColor: theme.colors.point,
    boxShadow: `0 0 0 2px ${theme.colors.point}`,
  },
});
