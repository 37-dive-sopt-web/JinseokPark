import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../../../styles/theme.css";

export const idSectionStyle = style({
  display: "flex",
  justifyContent: "space-between",
  margin: "2rem 0",
  paddingRight: "1rem",
  fontSize: theme.fontSizes.large,
});

globalStyle(`${idSectionStyle} p:nth-child(2)`, {
  fontWeight: 700,
  color: theme.colors.main,
});
