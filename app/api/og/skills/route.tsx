import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/lib/og/fonts";
import { colors, getThemeFromRequest } from "@/lib/og/theme";
import {
  MonitorIcon,
  ServerIcon,
  SettingsIcon,
  CodeIcon,
} from "@/lib/og/icons";
import { OGBadge } from "@/lib/og/components";
import { skills, getSkillsByCategory } from "@/lib/skills";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const theme = getThemeFromRequest(request);
  const c = colors[theme];
  const fonts = await loadFonts();

  const skillsByCategory = getSkillsByCategory(skills);

  const categories = [
    {
      title: "Frontend",
      icon: MonitorIcon,
      color: c.accentBlue,
      skills: skillsByCategory.frontend,
    },
    {
      title: "DevOps",
      icon: SettingsIcon,
      color: c.accentYellow,
      skills: skillsByCategory.devops,
    },
    {
      title: "Backend & AI/ML",
      icon: ServerIcon,
      color: c.accentGreen,
      skills: skillsByCategory.backend,
    },
    {
      title: "Languages",
      icon: CodeIcon,
      color: c.accentRed,
      skills: skillsByCategory.language,
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
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>
            <span style={{ color: c.foreground }}>SKILLS</span>
          </div>
          <span
            style={{ fontSize: 20, color: c.mutedForeground, marginTop: "8px" }}
          >
            Full stack. Zero Compromises.
          </span>
        </div>

        {/* Skills Grid - 2x2 */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1 }}
        >
          <div style={{ display: "flex", gap: "24px", flex: 1 }}>
            {categories.slice(0, 2).map((cat) => (
              <div
                key={cat.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: c.card,
                  borderRadius: "12px",
                  padding: "20px",
                  border: `1px solid ${c.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <cat.icon color={cat.color} size={24} />
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: c.foreground,
                    }}
                  >
                    {cat.title}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {cat.skills.map((skill) => (
                    <OGBadge key={skill.name} colors={c}>
                      {skill.name}
                    </OGBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "24px", flex: 1 }}>
            {categories.slice(2, 4).map((cat) => (
              <div
                key={cat.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: c.card,
                  borderRadius: "12px",
                  padding: "20px",
                  border: `1px solid ${c.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <cat.icon color={cat.color} size={24} />
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: c.foreground,
                    }}
                  >
                    {cat.title}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {cat.skills.map((skill) => (
                    <OGBadge key={skill.name} colors={c}>
                      {skill.name}
                    </OGBadge>
                  ))}
                </div>
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
