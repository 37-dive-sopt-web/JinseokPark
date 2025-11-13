import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const loginFailedStyle = style({
  fontSize: theme.fontSizes.medium,
  color: theme.colors.red,
});
