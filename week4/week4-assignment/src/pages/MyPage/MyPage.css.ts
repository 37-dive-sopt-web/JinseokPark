import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const headerStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2rem 5rem",
  backgroundColor: theme.colors.main,
  color: theme.colors.white,
});

globalStyle(`${headerStyle} > div`, {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

globalStyle(`${headerStyle} > nav`, {
  display: "flex",
  gap: "2rem",
});

export const myPageStyle = style({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  minHeight: "100vh",
  width: "100%",
});

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
