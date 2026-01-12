import { cache } from "react";
import { connection } from "next/server";
import redis from "@/lib/redis";
import type { GitHubStats } from "@/lib/github-stats";

const KEY_PREFIX = "github:stats:";

/**
 * Get cached GitHub stats from Redis
 * Uses connection() to opt into dynamic rendering
 * Wrapped with React cache() to deduplicate calls within a single request
 */
export const getCachedStats = cache(async function _getCachedStatsImpl(
  username: string,
): Promise<GitHubStats | null> {
  // Opt into dynamic rendering - fetch fresh data on every request
  await connection();

  const key = `${KEY_PREFIX}${username}`;
  console.log(`[Cache] Getting stats for key: ${key}`);
  console.log(`[Cache] Redis status: ${redis.status}`);

  try {
    const startTime = Date.now();
    const data = await redis.get(key);
    const duration = Date.now() - startTime;

    if (!data) {
      console.log(`[Cache] No data found for key: ${key} (took ${duration}ms)`);
      return null;
    }

    console.log(
      `[Cache] Found data for key: ${key}, length: ${data.length} chars (took ${duration}ms)`,
    );

    const parsed = JSON.parse(data) as GitHubStats;
    console.log(`[Cache] Parsed stats for ${parsed.username}:`, {
      totalStars: parsed.totalStars,
      totalRepos: parsed.totalRepos,
      totalFollowers: parsed.totalFollowers,
    });

    return parsed;
  } catch (error) {
    console.error(`[Cache] Error fetching stats for key: ${key}`);
    console.error(
      "[Cache] Error details:",
      error instanceof Error ? error.message : error,
    );
    if (error instanceof Error && error.stack) {
      console.error("[Cache] Stack:", error.stack);
    }
    return null;
  }
});

/**
 * Store GitHub stats in Redis (no expiration)
 */
export async function setCachedStats(
  username: string,
  stats: GitHubStats,
): Promise<void> {
  const key = `${KEY_PREFIX}${username}`;
  console.log(`[Cache] Setting stats for key: ${key}`);
  console.log(`[Cache] Redis status: ${redis.status}`);

  try {
    const json = JSON.stringify(stats);
    console.log(`[Cache] Serialized stats length: ${json.length} chars`);

    const startTime = Date.now();
    const result = await redis.set(key, json);
    const duration = Date.now() - startTime;

    console.log(
      `[Cache] SET result: ${result} for key: ${key} (took ${duration}ms)`,
    );
  } catch (error) {
    console.error(`[Cache] Error setting stats for key: ${key}`);
    console.error(
      "[Cache] Error details:",
      error instanceof Error ? error.message : error,
    );
    if (error instanceof Error && error.stack) {
      console.error("[Cache] Stack:", error.stack);
    }
    throw error;
  }
}
