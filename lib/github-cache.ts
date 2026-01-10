import { eq } from "drizzle-orm";
import db from "@/lib/server/db";
import { githubStatsCache } from "@/db/schema";
import type { GitHubStats } from "@/lib/github-stats";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Check if cache is still valid
 * expiresAt is a Unix timestamp in seconds
 */
export function isCacheValid(expiresAt: number): boolean {
  return Math.floor(Date.now() / 1000) < expiresAt;
}

/**
 * Get cached GitHub stats if valid
 */
export async function getCachedStats(
  username: string,
): Promise<GitHubStats | null> {
  try {
    const cached = await db
      .select()
      .from(githubStatsCache)
      .where(eq(githubStatsCache.username, username))
      .limit(1);

    if (cached.length === 0) {
      return null;
    }

    const cacheEntry = cached[0];

    // Check if cache is still valid
    if (!isCacheValid(cacheEntry.expiresAt)) {
      // Delete expired cache
      await db
        .delete(githubStatsCache)
        .where(eq(githubStatsCache.username, username));
      return null;
    }

    return cacheEntry.stats as GitHubStats;
  } catch (error) {
    console.error("Error fetching cached stats:", error);
    return null;
  }
}

/**
 * Store GitHub stats in cache with 1-hour expiration
 * Uses upsert (insert or update on conflict)
 */
export async function setCachedStats(
  username: string,
  stats: GitHubStats,
): Promise<void> {
  try {
    const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    const expiresAt = now + Math.floor(CACHE_TTL_MS / 1000);

    console.log(`[Cache] Upserting stats for ${username}`);
    console.log(
      `[Cache] Expires at: ${new Date(expiresAt * 1000).toISOString()}`,
    );

    // Use upsert: insert or update on conflict
    await db
      .insert(githubStatsCache)
      .values({
        username,
        stats,
        cachedAt: now,
        expiresAt,
      })
      .onConflictDoUpdate({
        target: githubStatsCache.username,
        set: {
          stats,
          cachedAt: now,
          expiresAt,
        },
      });

    console.log(`[Cache] Successfully cached stats for ${username}`);
  } catch (error) {
    console.error("[Cache] Error caching stats:", error);
    if (error instanceof Error) {
      console.error("[Cache] Error message:", error.message);
    }
    throw error;
  }
}
