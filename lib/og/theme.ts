export type Theme = "light" | "dark";

export interface ThemeColors {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  accentRed: string;
  accentYellow: string;
  accentBlue: string;
  accentGreen: string;
}

// Pre-converted from OKLCH to Hex for Satori compatibility
export const colors: Record<Theme, ThemeColors> = {
  light: {
    background: "#ffffff",
    foreground: "#171717",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    card: "#ffffff",
    cardForeground: "#171717",
    border: "#e5e5e5",
    accentRed: "#c93c37",
    accentYellow: "#c9a41a",
    accentBlue: "#2563eb",
    accentGreen: "#22a55e",
  },
  dark: {
    background: "#171717",
    foreground: "#fafafa",
    muted: "#404040",
    mutedForeground: "#a3a3a3",
    card: "#262626",
    cardForeground: "#fafafa",
    border: "rgba(255,255,255,0.1)",
    accentRed: "#ef5350",
    accentYellow: "#fbbf24",
    accentBlue: "#3b82f6",
    accentGreen: "#34d399",
  },
};

export function getThemeFromRequest(request: Request): Theme {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get("theme");
  return theme === "dark" ? "dark" : "light";
}
