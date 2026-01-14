import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/lib/og/fonts";
import { colors, getThemeFromRequest } from "@/lib/og/theme";
import { OGBadge } from "@/lib/og/components";
import { GitHubIcon } from "@/lib/og/icons";

export const runtime = "nodejs";

// Same project data as components/projects.tsx
const projects = [
  {
    name: "Hostile Takeover",
    description:
      "A silly Jackbox-style social deduction game about taking over a cyberpunk-themed company.",
    tech: ["TypeScript", "Next.js", "Redis"],
    color: "red" as const,
  },
  {
    name: "git2gpt",
    description:
      "Converts a git repo into an LLM prompt you can copy and paste into your favorite Chatbot. Build pre-Claude Code.",
    tech: ["Go", "LLMs"],
    color: "blue" as const,
  },
  {
    name: "Claude Code MLX Proxy",
    description:
      "Use Claude Code with local models powered by Apple's M-series chips and MLX.",
    tech: ["Python", "FastAPI", "MLX"],
    color: "yellow" as const,
  },
];

export async function GET(request: Request) {
  const theme = getThemeFromRequest(request);
  const c = colors[theme];
  const fonts = await loadFonts();

  const colorMap = {
    red: c.accentRed,
    blue: c.accentBlue,
    yellow: c.accentYellow,
  };

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
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>
            <span style={{ color: c.foreground }}>Featured </span>
            <span style={{ color: c.accentBlue, marginLeft: "12px" }}>
              Projects
            </span>
          </div>
          <span
            style={{ fontSize: 20, color: c.mutedForeground, marginTop: "12px" }}
          >
            Building products that solve real problems
          </span>
        </div>

        {/* Projects Grid - 3 cards */}
        <div style={{ display: "flex", gap: "24px", flex: 1 }}>
          {projects.map((project) => (
            <div
              key={project.name}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                backgroundColor: c.card,
                borderRadius: "12px",
                border: `2px solid ${colorMap[project.color]}60`,
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px 24px 16px 24px",
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: c.foreground,
                    marginBottom: "8px",
                  }}
                >
                  {project.name}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: c.mutedForeground,
                    lineHeight: 1.5,
                  }}
                >
                  {project.description}
                </span>
              </div>

              {/* Card Content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 24px 24px 24px",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  {project.tech.map((tech) => (
                    <OGBadge key={tech} colors={c}>
                      {tech}
                    </OGBadge>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <GitHubIcon color={c.mutedForeground} size={16} />
                  <span style={{ fontSize: 14, color: c.mutedForeground }}>
                    Code
                  </span>
                </div>
              </div>
            </div>
          ))}
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
