import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/lib/og/fonts";
import { colors, getThemeFromRequest } from "@/lib/og/theme";
import {
  StarIcon,
  ForkIcon,
  UsersIcon,
  GitHubIcon,
  UserPlusIcon,
  FileCodeIcon,
} from "@/lib/og/icons";
import { getCachedStats } from "@/lib/github-cache";
import { mockGitHubStats, type GitHubStats } from "@/lib/github-stats";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const theme = getThemeFromRequest(request);
  const c = colors[theme];
  const fonts = await loadFonts();

  const stats: GitHubStats =
    (await getCachedStats("chand1012")) || mockGitHubStats;

  const statCards = [
    {
      title: "Total Stars",
      value: stats.totalStars.toLocaleString(),
      subtitle: "Across all repositories",
      icon: StarIcon,
      color: c.accentYellow,
    },
    {
      title: "Repositories",
      value: stats.totalRepos.toString(),
      subtitle: "Public repositories",
      icon: GitHubIcon,
      color: c.accentBlue,
    },
    {
      title: "Followers",
      value: stats.totalFollowers.toString(),
      subtitle: "GitHub followers",
      icon: UsersIcon,
      color: c.accentGreen,
    },
    {
      title: "Total Forks",
      value: stats.totalForks.toLocaleString(),
      subtitle: "Forks of my repos",
      icon: ForkIcon,
      color: c.accentRed,
    },
    {
      title: "Following",
      value: stats.following.toString(),
      subtitle: "Developers I follow",
      icon: UserPlusIcon,
      color: c.accentYellow,
    },
    {
      title: "Public Gists",
      value: stats.publicGists.toString(),
      subtitle: "Code snippets shared",
      icon: FileCodeIcon,
      color: c.accentBlue,
    },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: c.background,
          padding: "48px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex" }}>
            <span
              style={{ fontSize: 48, fontWeight: 700, color: c.foreground }}
            >
              GitHub{" "}
            </span>
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: c.accentGreen,
                marginLeft: "12px",
              }}
            >
              Activity
            </span>
          </div>
          <span
            style={{
              fontSize: 24,
              color: c.mutedForeground,
              marginTop: "12px",
            }}
          >
            Building in public, one commit at a time
          </span>
        </div>

        {/* Stats Grid - 3x2 */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}
        >
          <div style={{ display: "flex", gap: "20px", flex: 1 }}>
            {statCards.slice(0, 3).map((stat) => (
              <div
                key={stat.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: c.card,
                  borderRadius: "12px",
                  padding: "24px",
                  border: `2px solid ${stat.color}40`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: 14, color: c.mutedForeground }}>
                    {stat.title}
                  </span>
                  <stat.icon color={stat.color} size={20} />
                </div>
                <span
                  style={{ fontSize: 36, fontWeight: 700, color: stat.color }}
                >
                  {stat.value}
                </span>
                <span
                  style={{ fontSize: 12, color: c.mutedForeground, marginTop: "4px" }}
                >
                  {stat.subtitle}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "20px", flex: 1 }}>
            {statCards.slice(3, 6).map((stat) => (
              <div
                key={stat.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: c.card,
                  borderRadius: "12px",
                  padding: "24px",
                  border: `2px solid ${stat.color}40`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: 14, color: c.mutedForeground }}>
                    {stat.title}
                  </span>
                  <stat.icon color={stat.color} size={20} />
                </div>
                <span
                  style={{ fontSize: 36, fontWeight: 700, color: stat.color }}
                >
                  {stat.value}
                </span>
                <span
                  style={{ fontSize: 12, color: c.mutedForeground, marginTop: "4px" }}
                >
                  {stat.subtitle}
                </span>
              </div>
            ))}
          </div>
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
