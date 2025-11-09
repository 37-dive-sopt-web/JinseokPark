/** @jsxImportSource @emotion/react */
import { Global, css, ThemeProvider } from "@emotion/react";
import { useState } from "react";
import { theme } from "./theme.js";
import Header from "./components/Header.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Ranking from "./components/Ranking.jsx";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR&display=swap");

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.background};
    font-family: "IBM Plex Sans KR", sans-serif;
    font-size: 1.6rem;
    color: ${theme.colors.text};
  }

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }
`;

function App() {
  const [view, setView] = useState("game");

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Header setView={setView} />
      {view === "game" ? <GameBoard /> : <Ranking />}
    </ThemeProvider>
  );
}

export default App;
