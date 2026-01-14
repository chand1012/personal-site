import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/lib/og/fonts";
import { colors, getThemeFromRequest } from "@/lib/og/theme";

export const runtime = "nodejs";

// Inline employment data (abbreviated for OG image)
const employment = [
  {
    company: "Saphira AI (YC S24)",
    title: "Senior Full Stack Engineer",
    description: "Building the future of AI-powered safety compliance & product certification.",
    dates: "Dec 2025 - Present",
    current: true,
  },
  {
    company: "Hypha",
    title: "Full Stack Engineer",
    description: "Built the premier liquid staking platform on the Avalanche blockchain.",
    dates: "Jan 2022 - Dec 2025",
    current: false,
  },
  {
    company: "Pillar.gg",
    title: "Full Stack Contractor",
    description: "Built and maintained AI powered stream highlights for Twitch and YouTube streamers.",
    dates: "Dec 2020 - Jan 2022",
    current: false,
  },
  {
    company: "Sealed Air - AUTOBAG",
    title: "Software Engineering Intern",
    description: "Maintained and extended embedded Linux OS & web-based HID UI for bagging machines.",
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
          padding: "40px 48px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <span
            style={{ fontSize: 44, fontWeight: 700, color: c.foreground }}
          >
            Work{" "}
          </span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: c.accentGreen,
              marginLeft: "12px",
            }}
          >
            Experience
          </span>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "12px" }}>
          {employment.map((job) => (
            <div
              key={job.company}
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                backgroundColor: c.card,
                borderRadius: "12px",
                padding: "0 24px",
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
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: c.foreground,
                    }}
                  >
                    {job.title}
                  </span>
                  {job.current && (
                    <div
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        backgroundColor: c.accentGreen,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Current
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: c.accentGreen,
                    marginTop: "1px",
                  }}
                >
                  {job.company}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: c.mutedForeground,
                    marginTop: "2px",
                  }}
                >
                  {job.description}
                </span>
              </div>

              <span style={{ fontSize: 13, color: c.mutedForeground }}>
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
