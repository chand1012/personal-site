import redis from "@/lib/redis";
import type { GitHubStats } from "@/lib/github-stats";

const KEY_PREFIX = "github:stats:";

/**
 * Get cached GitHub stats from Redis
 */
export async function getCachedStats(
  username: string,
): Promise<GitHubStats | null> {
  try {
    const data = await redis.get(`${KEY_PREFIX}${username}`);
    if (!data) return null;
    return JSON.parse(data) as GitHubStats;
  } catch (error) {
    console.error("Error fetching cached stats:", error);
    return null;
  }
}

/**
 * Store GitHub stats in Redis (no expiration)
 */
export async function setCachedStats(
  username: string,
  stats: GitHubStats,
): Promise<void> {
  try {
    await redis.set(`${KEY_PREFIX}${username}`, JSON.stringify(stats));
    console.log(`[Cache] Successfully cached stats for ${username}`);
  } catch (error) {
    console.error("[Cache] Error caching stats:", error);
    throw error;
  }
}
