import { globalStyle } from "@vanilla-extract/css";
// 테마 파일 경로는 실제 프로젝트에 맞게 확인해주세요
import { theme } from "./theme.css.ts";
globalStyle("html", {
  fontSize: "62.5%",
});

globalStyle("body", {
  margin: 0,
  padding: 0,
  backgroundColor: theme.colors.white,
  fontFamily: '"IBM Plex Sans KR", sans-serif',
  fontSize: "1.6rem",
  color: theme.colors.text,
});

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("h1, h2, h3, p", {
  margin: 0,
});
