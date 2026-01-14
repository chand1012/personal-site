import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/lib/og/fonts";
import { colors, getThemeFromRequest } from "@/lib/og/theme";
import { StarIcon, ForkIcon, GitHubIcon, LinkedInIcon } from "@/lib/og/icons";
import { GradientBorder } from "@/lib/og/components";
import { getCachedStats } from "@/lib/github-cache";
import { mockGitHubStats, type GitHubStats } from "@/lib/github-stats";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const theme = getThemeFromRequest(request);
  const c = colors[theme];
  const fonts = await loadFonts();

  // Fetch stats
  const stats: GitHubStats =
    (await getCachedStats("chand1012")) || mockGitHubStats;

  // Load profile image URL
  const profileUrl = new URL("/me.jpeg", request.url).toString();

  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: c.background,
          padding: "40px",
        }}
      >
        {/* Profile Photo with Gradient Border */}
        <GradientBorder colors={c}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileUrl}
            alt="Chandler"
            width={140}
            height={140}
            style={{
              borderRadius: "9999px",
              filter: "grayscale(100%)",
            }}
          />
        </GradientBorder>

        {/* Name */}
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          <span style={{ color: c.foreground }}>Hi, I&apos;m </span>
          <span style={{ color: c.accentBlue, marginLeft: "16px" }}>
            Chandler
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "20px",
            fontSize: 32,
            color: c.mutedForeground,
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          <span style={{ color: c.accentRed }}>Startup-focused</span>
          <span style={{ marginLeft: "10px" }}>developer from</span>
          <span style={{ color: c.accentGreen, marginLeft: "10px" }}>
            Canton, Ohio
          </span>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "64px",
            marginTop: "36px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <StarIcon color={c.accentYellow} size={36} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{ fontSize: 40, fontWeight: 700, color: c.accentYellow }}
              >
                {formatNumber(stats.totalStars)}
              </span>
              <span style={{ fontSize: 16, color: c.mutedForeground }}>
                Stars
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <ForkIcon color={c.accentBlue} size={36} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{ fontSize: 40, fontWeight: 700, color: c.accentBlue }}
              >
                {formatNumber(stats.totalForks)}
              </span>
              <span style={{ fontSize: 16, color: c.mutedForeground }}>
                Forks
              </span>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div style={{ display: "flex", gap: "28px", marginTop: "28px" }}>
          <GitHubIcon color={c.mutedForeground} size={32} />
          <LinkedInIcon color={c.mutedForeground} size={32} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.map((f) => ({
        name: f.name,
        data: f.data,
        weight: f.weight,
        style: f.style,
      })),
    }
  );
}
