import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../styles/theme.css";

export const formWrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const formStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.large,
  width: "40vw",
  padding: "5rem",
  borderRadius: "1.6rem",
  backgroundColor: theme.colors.secondary,
});

export const formInputField = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.small,
});

export const formBtnContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.medium,
  marginTop: theme.spacing.large,
});

globalStyle(`${formBtnContainer} button:nth-child(2)`, {
  backgroundColor: theme.colors.white,
  color: theme.colors.main,
});

globalStyle(`${formBtnContainer} button:nth-child(2):hover`, {
  color: theme.colors.point,
});
