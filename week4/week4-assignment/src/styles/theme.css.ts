import { createGlobalTheme } from "@vanilla-extract/css";

export const theme = createGlobalTheme(":root", {
  colors: {
    main: "#3B82F6",
    secondary: "#eff6ff",
    text: "#1f2937",
    section: "#60a5fa",
    hover: "#2563eb",
    point: "#F97316",
    red: "#FF0000",
    white: "#ffffff",
    gray: "#aaaaaa",
  },
  fontSizes: {
    small: "1.2rem",
    medium: "1.6rem",
    large: "2.0rem",
  },
  spacing: {
    small: "1.2rem",
    medium: "1.6rem",
    large: "2rem",
  },
});
