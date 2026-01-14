import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/lib/og/fonts";
import { colors, getThemeFromRequest } from "@/lib/og/theme";

export const runtime = "nodejs";

// Inline employment data (abbreviated for OG image)
const employment = [
  {
    company: "Saphira AI (YC S24)",
    title: "Senior Full Stack Engineer",
    dates: "Dec 2025 - Present",
    current: true,
  },
  {
    company: "Hypha",
    title: "Full Stack Engineer",
    dates: "Jan 2022 - Dec 2025",
    current: false,
  },
  {
    company: "Pillar.gg",
    title: "Full Stack Contractor",
    dates: "Dec 2020 - Jan 2022",
    current: false,
  },
  {
    company: "Sealed Air - AUTOBAG",
    title: "Software Engineering Intern",
    dates: "May 2019 - Jan 2020",
    current: false,
  },
];

export async function GET(request: Request) {
  const theme = getThemeFromRequest(request);
  const c = colors[theme];
  const fonts = await loadFonts();

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
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{ fontSize: 48, fontWeight: 700, color: c.foreground }}
          >
            Work{" "}
          </span>
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: c.accentGreen,
              marginLeft: "12px",
            }}
          >
            Experience
          </span>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {employment.map((job) => (
            <div
              key={job.company}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: c.card,
                borderRadius: "12px",
                padding: "20px 28px",
                border: `2px solid ${job.current ? c.accentGreen : c.border}`,
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "9999px",
                  backgroundColor: c.accentGreen,
                  marginRight: "20px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: c.foreground,
                    }}
                  >
                    {job.title}
                  </span>
                  {job.current && (
                    <div
                      style={{
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        backgroundColor: c.accentGreen,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Current
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: c.accentGreen,
                    marginTop: "4px",
                  }}
                >
                  {job.company}
                </span>
              </div>

              <span style={{ fontSize: 14, color: c.mutedForeground }}>
                {job.dates}
              </span>
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
