import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const modalBackgroundStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.3)",
  backdropFilter: "blur(5px)",
});

export const modalContentStyle = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.medium,
  backgroundColor: theme.colors.secondary,
  width: "50rem",
  padding: "5rem 0",
  borderRadius: "1.6rem",
});

export const modalBtnContainer = style({
  display: "flex",
  gap: theme.spacing.large,
  marginTop: theme.spacing.large,
});

globalStyle(`${modalBtnContainer} button`, {
  width: "15rem",
  padding: "1.5rem 0",
  fontSize: theme.fontSizes.medium,
  fontWeight: 700,
  border: "none",
  borderRadius: "1.6rem",
  transition: "all 0.3s ease",
});

globalStyle(`${modalBtnContainer} button:first-child`, {
  backgroundColor: theme.colors.white,
  color: theme.colors.text,
});

globalStyle(`${modalBtnContainer} button:first-child:hover`, {
  transform: "translateY(-1px)",
  boxShadow: `0 4px 10px ${theme.colors.gray}`,
});

globalStyle(`${modalBtnContainer} button:last-child`, {
  backgroundColor: theme.colors.red,
  color: theme.colors.white,
});

globalStyle(`${modalBtnContainer} button:last-child:hover`, {
  transform: "translateY(-1px)",
  boxShadow: `0 4px 10px ${theme.colors.gray}`,
});
