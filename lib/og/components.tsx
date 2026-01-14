import type { ThemeColors } from "./theme";

// Satori-compatible Badge component
export function OGBadge({
  children,
  colors,
}: {
  children: string;
  colors: ThemeColors;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "9999px",
        border: `1px solid ${colors.border}`,
        color: colors.mutedForeground,
        fontSize: 14,
      }}
    >
      {children}
    </div>
  );
}

// Satori-compatible Card component
export function OGCard({
  children,
  colors,
  borderColor,
  style,
}: {
  children: React.ReactNode;
  colors: ThemeColors;
  borderColor?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        borderRadius: "12px",
        backgroundColor: colors.card,
        border: `2px solid ${borderColor || colors.border}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Gradient border wrapper (for profile photo)
export function GradientBorder({
  children,
  colors,
}: {
  children: React.ReactNode;
  colors: ThemeColors;
}) {
  return (
    <div
      style={{
        display: "flex",
        padding: "4px",
        borderRadius: "9999px",
        background: `linear-gradient(135deg, ${colors.accentBlue}, ${colors.accentGreen}, ${colors.accentYellow})`,
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: "9999px",
          backgroundColor: colors.background,
          padding: "4px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
