import { style, globalStyle } from "@vanilla-extract/css";
import { theme } from "../../../styles/theme.css";

export const memberInfoStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.medium,
  minWidth: "75rem",
  backgroundColor: theme.colors.secondary,
  padding: "5rem",
  borderRadius: "1.6rem",
});

export const infoItem = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: theme.fontSizes.large,
});

globalStyle(`${memberInfoStyle} h3`, {
  fontSize: "2.2rem",
  marginBottom: "1.5rem",
});

globalStyle(`${infoItem} span:nth-child(2)`, {
  fontWeight: 700,
  color: theme.colors.main,
});

export const noResultStyle = style({
  color: theme.colors.red,
});
