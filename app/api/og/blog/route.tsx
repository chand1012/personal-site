import { ImageResponse } from "@vercel/og";
import { loadFonts } from "@/lib/og/fonts";
import { colors, getThemeFromRequest } from "@/lib/og/theme";
import { OGBadge } from "@/lib/og/components";
import { getLatestPosts } from "@/lib/devto";

export const runtime = "nodejs";

// Calendar icon for Satori
function CalendarIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// Clock icon for Satori
function ClockIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export async function GET(request: Request) {
  const theme = getThemeFromRequest(request);
  const c = colors[theme];
  const fonts = await loadFonts();

  const posts = await getLatestPosts(6);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: c.background,
          padding: "40px",
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
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
            <span style={{ color: c.foreground }}>Latest </span>
            <span style={{ color: c.accentRed, marginLeft: "10px" }}>Blog</span>
            <span style={{ color: c.foreground, marginLeft: "10px" }}> Posts</span>
          </div>
          <span
            style={{ fontSize: 18, color: c.mutedForeground, marginTop: "10px" }}
          >
            Thoughts on startups, development, and building products
          </span>
        </div>

        {/* Blog Grid - 2 rows x 3 columns */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}
        >
          {/* First row */}
          <div style={{ display: "flex", gap: "16px", flex: 1 }}>
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.url}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: c.card,
                  borderRadius: "12px",
                  border: `2px solid ${c.border}`,
                  overflow: "hidden",
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 16px 12px 16px",
                  }}
                >
                  {/* Date and reading time */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: 11,
                        color: c.mutedForeground,
                      }}
                    >
                      <CalendarIcon color={c.mutedForeground} size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: 11,
                        color: c.mutedForeground,
                      }}
                    >
                      <ClockIcon color={c.mutedForeground} size={12} />
                      {post.readingTime} min
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: c.foreground,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title.length > 45
                      ? `${post.title.slice(0, 45)}...`
                      : post.title}
                  </span>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 16px 16px 16px",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <OGBadge key={tag} colors={c}>
                        {tag}
                      </OGBadge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second row */}
          <div style={{ display: "flex", gap: "16px", flex: 1 }}>
            {posts.slice(3, 6).map((post) => (
              <div
                key={post.url}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: c.card,
                  borderRadius: "12px",
                  border: `2px solid ${c.border}`,
                  overflow: "hidden",
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 16px 12px 16px",
                  }}
                >
                  {/* Date and reading time */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: 11,
                        color: c.mutedForeground,
                      }}
                    >
                      <CalendarIcon color={c.mutedForeground} size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: 11,
                        color: c.mutedForeground,
                      }}
                    >
                      <ClockIcon color={c.mutedForeground} size={12} />
                      {post.readingTime} min
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: c.foreground,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title.length > 45
                      ? `${post.title.slice(0, 45)}...`
                      : post.title}
                  </span>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 16px 16px 16px",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <OGBadge key={tag} colors={c}>
                        {tag}
                      </OGBadge>
                    ))}
                  </div>
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
