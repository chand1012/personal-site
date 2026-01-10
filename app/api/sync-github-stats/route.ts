import { NextResponse } from "next/server";
import { setCachedStats } from "@/lib/github-cache";
import type { GitHubStats } from "@/lib/github-stats";

/**
 * Validate API key from Authorization header
 */
function validateApiKey(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  const apiKey = process.env.GITHUB_SYNC_API_KEY;

  if (!apiKey) {
    console.error("[Sync] GITHUB_SYNC_API_KEY is not configured");
    return false;
  }

  if (!authHeader) {
    return false;
  }

  // Support both "Bearer <key>" and plain key
  const providedKey = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  return providedKey === apiKey;
}

/**
 * Validate that the payload matches the GitHubStats interface
 */
function isValidGitHubStats(data: unknown): data is GitHubStats {
  if (!data || typeof data !== "object") return false;

  const stats = data as Record<string, unknown>;

  return (
    typeof stats.username === "string" &&
    typeof stats.totalStars === "number" &&
    typeof stats.totalRepos === "number" &&
    typeof stats.totalFollowers === "number" &&
    typeof stats.totalForks === "number" &&
    typeof stats.following === "number" &&
    typeof stats.publicGists === "number"
  );
}

/**
 * POST /api/sync-github-stats
 *
 * Receives GitHub stats from the standalone sync script and stores them in the cache.
 * Requires API key authentication via Authorization header.
 *
 * Body: GitHubStats object
 */
export async function POST(request: Request) {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized - Invalid or missing API key" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    // Validate payload
    if (!isValidGitHubStats(body)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payload - must be a valid GitHubStats object",
        },
        { status: 400 },
      );
    }

    const stats: GitHubStats = body;

    // Store in cache
    console.log(`[Sync] Received stats for ${stats.username}`);
    await setCachedStats(stats.username, stats);
    console.log(`[Sync] Stats cached successfully for ${stats.username}`);

    return NextResponse.json({
      success: true,
      username: stats.username,
      message: "GitHub stats cached successfully",
      stats: {
        totalStars: stats.totalStars,
        totalRepos: stats.totalRepos,
        totalFollowers: stats.totalFollowers,
        totalForks: stats.totalForks,
        following: stats.following,
        publicGists: stats.publicGists,
        starredReposCount: stats.starredRepos?.length ?? 0,
      },
    });
  } catch (error) {
    console.error("[Sync] Error processing sync request:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/sync-github-stats
 *
 * Deprecated - use POST with API key authentication instead.
 * Returns instructions for migration.
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "GET method is deprecated",
      message:
        "Use the standalone sync script with POST method and API key authentication. Run: npm run sync:github",
    },
    { status: 405 },
  );
}
