import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../../../styles/theme.css";

export const myPageStyle = style({
  display: "grid",
  gridTemplateRows: "10rem 1fr",
  minHeight: "100vh",
  width: "100%",
});

export const headerStyle = style({
  display: "flex",
  position: "relative",
  justifyContent: "space-between",
  alignItems: "center",
  padding: " 0 5rem",
  height: "10rem",
  backgroundColor: theme.colors.main,
  color: theme.colors.white,
  zIndex: 100,
});

globalStyle(`${headerStyle} > div`, {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const menuBtn = style({
  display: "none",
  backgroundColor: theme.colors.main,
  border: "none",
  color: theme.colors.white,
  fontSize: "2rem",
  cursor: "pointer",

  "@media": {
    "screen and (max-width: 1024px)": {
      display: "block",
      zIndex: 110,
    },
  },
});

export const navMenuContainer = style({
  display: "flex",
  gap: "2rem",
  alignItems: "center",

  "@media": {
    "screen and (max-width: 1024px)": {
      position: "absolute",
      top: "10rem",
      left: 0,
      flexDirection: "column",
      backgroundColor: theme.colors.main,
      width: "100%",
      maxHeight: 0,
      opacity: 0,
      transition: "all 0.4s ease-in-out",
      zIndex: 1,
      gap: 0,
      pointerEvents: "none",
    },
  },
});

globalStyle(`${navMenuContainer}.open`, {
  "@media": {
    "screen and (max-width: 1024px)": {
      maxHeight: "50rem",
      opacity: 1,
      pointerEvents: "auto",
    },
  },
});

globalStyle(`${navMenuContainer} p`, {
  padding: "2rem 0",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",

  "@media": {
    "screen and (max-width: 1024px)": {
      width: "100%",
    },
  },
});

globalStyle(`${navMenuContainer} p:hover`, {
  "@media": {
    "screen and (max-width: 1024px)": {
      width: "100%",
      backgroundColor: theme.colors.hover,
    },
  },
});
