#!/usr/bin/env npx tsx
/**
 * Standalone GitHub Stats Sync Script
 *
 * Fetches GitHub stats and writes them directly to Redis.
 *
 * Usage:
 *   npx tsx scripts/sync-github-stats.ts
 *   npm run sync:github
 *
 * Environment variables required:
 *   - GITHUB_TOKEN: GitHub personal access token
 *   - GITHUB_USERNAME: GitHub username to fetch stats for
 *   - GITHUB_ORGS: Comma-separated list of organizations (optional)
 *   - REDIS_URI: Redis connection URI (default: redis://localhost:6379)
 */

import { config } from "dotenv";
import axios from "axios";
import Redis from "ioredis";

// Load environment variables from .env.local
config({ path: ".env.local" });

const GITHUB_API_BASE = "https://api.github.com";
const KEY_PREFIX = "github:stats:";

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URI || "redis://localhost:6379");

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
    type: string;
  };
  private: boolean;
}

interface GitHubUser {
  login: string;
  followers: number;
  following: number;
  public_gists: number;
  public_repos: number;
}

interface StarredRepo {
  name: string;
  fullName: string;
  owner: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
}

interface GitHubStats {
  username: string;
  totalStars: number;
  totalRepos: number;
  totalFollowers: number;
  totalForks: number;
  following: number;
  publicGists: number;
  starsByOrg?: Record<string, number>;
  starredRepos?: StarredRepo[];
}

function getHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  const cleanToken = token.trim();
  const authHeader = cleanToken.startsWith("github_pat_")
    ? `Bearer ${cleanToken}`
    : `token ${cleanToken}`;

  return {
    Authorization: authHeader,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "personal-site-sync/1.0",
  };
}

async function fetchUserProfile(username: string): Promise<GitHubUser> {
  console.log(`[Sync] Fetching profile for ${username}...`);
  const headers = getHeaders();
  const response = await axios.get<GitHubUser>(
    `${GITHUB_API_BASE}/users/${username}`,
    { headers },
  );
  return response.data;
}

async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  console.log(`[Sync] Fetching repos for ${username}...`);
  const headers = getHeaders();
  const repos: GitHubRepo[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get<GitHubRepo[]>(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&page=${page}&sort=updated`,
      { headers },
    );

    if (response.data.length === 0) {
      hasMore = false;
    } else {
      repos.push(...response.data);
      page++;
      if (response.data.length < 100) {
        hasMore = false;
      }
    }
  }

  return repos;
}

async function fetchOrgRepos(org: string): Promise<GitHubRepo[]> {
  console.log(`[Sync] Fetching repos for org ${org}...`);
  const headers = getHeaders();
  const repos: GitHubRepo[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get<GitHubRepo[]>(
        `${GITHUB_API_BASE}/orgs/${org}/repos?per_page=100&page=${page}&sort=updated`,
        { headers },
      );

      if (response.data.length === 0) {
        hasMore = false;
      } else {
        repos.push(...response.data);
        page++;
        if (response.data.length < 100) {
          hasMore = false;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn(`[Sync] Org ${org} not found, skipping...`);
        break;
      }
      throw error;
    }
  }

  return repos;
}

interface GitHubStarredRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  owner: {
    login: string;
  };
}

async function fetchStarredRepos(
  username: string,
  limit = 3,
): Promise<StarredRepo[]> {
  console.log(`[Sync] Fetching starred repos for ${username}...`);
  const headers = getHeaders();

  try {
    const response = await axios.get<GitHubStarredRepo[]>(
      `${GITHUB_API_BASE}/users/${username}/starred?per_page=${limit}&sort=starredAt&direction=desc`,
      { headers },
    );

    const starredRepos = response.data.map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner.login,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
    }));

    console.log(`[Sync] Found ${starredRepos.length} starred repos`);
    return starredRepos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(
        `[Sync] Failed to fetch starred repos: ${error.response?.status}`,
      );
    }
    return [];
  }
}

function aggregateRepoStats(repos: GitHubRepo[]): {
  totalStars: number;
  totalForks: number;
  starsByOrg: Record<string, number>;
} {
  const starsByOrg: Record<string, number> = {};
  let totalStars = 0;
  let totalForks = 0;

  for (const repo of repos) {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.owner.type === "Organization") {
      const org = repo.owner.login;
      starsByOrg[org] = (starsByOrg[org] || 0) + repo.stargazers_count;
    }
  }

  return { totalStars, totalForks, starsByOrg };
}

async function saveToRedis(stats: GitHubStats): Promise<void> {
  const key = `${KEY_PREFIX}${stats.username}`;
  console.log(`[Sync] Saving stats to Redis key: ${key}...`);

  await redis.set(key, JSON.stringify(stats));
  console.log(`[Sync] Stats saved successfully!`);
}

async function main() {
  const startTime = Date.now();
  console.log("[Sync] Starting GitHub stats sync...\n");

  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    console.error("[Sync] Error: GITHUB_USERNAME is required");
    process.exit(1);
  }

  try {
    // Fetch user profile
    const profile = await fetchUserProfile(username);
    console.log(
      `[Sync] Profile: ${profile.followers} followers, ${profile.following} following, ${profile.public_gists} gists`,
    );

    // Fetch user repos
    const userRepos = await fetchUserRepos(username);
    console.log(`[Sync] Found ${userRepos.length} user repos`);

    // Fetch org repos if configured
    const orgsList = process.env.GITHUB_ORGS || "";
    const orgs = orgsList
      .split(",")
      .map((org) => org.trim())
      .filter(Boolean);

    const allOrgRepos: GitHubRepo[] = [];
    if (orgs.length > 0) {
      console.log(
        `[Sync] Fetching repos for ${orgs.length} orgs: ${orgs.join(", ")}`,
      );
      for (const org of orgs) {
        const orgRepos = await fetchOrgRepos(org);
        allOrgRepos.push(...orgRepos);
      }
      console.log(`[Sync] Found ${allOrgRepos.length} org repos total`);
    }

    // Combine and aggregate
    const allRepos = [...userRepos, ...allOrgRepos];
    const aggregated = aggregateRepoStats(allRepos);

    // Fetch starred repos
    const starredRepos = await fetchStarredRepos(username, 3);

    // Build stats object
    const stats: GitHubStats = {
      username,
      totalStars: aggregated.totalStars,
      totalRepos: allRepos.length,
      totalFollowers: profile.followers,
      totalForks: aggregated.totalForks,
      following: profile.following,
      publicGists: profile.public_gists,
      starsByOrg:
        Object.keys(aggregated.starsByOrg).length > 0
          ? aggregated.starsByOrg
          : undefined,
      starredRepos: starredRepos.length > 0 ? starredRepos : undefined,
    };

    console.log("\n[Sync] Aggregated stats:");
    console.log(`  - Total Stars: ${stats.totalStars}`);
    console.log(`  - Total Repos: ${stats.totalRepos}`);
    console.log(`  - Total Followers: ${stats.totalFollowers}`);
    console.log(`  - Total Forks: ${stats.totalForks}`);
    console.log(`  - Following: ${stats.following}`);
    console.log(`  - Public Gists: ${stats.publicGists}`);
    console.log(`  - Starred Repos: ${starredRepos.length}`);

    // Save directly to Redis
    await saveToRedis(stats);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n[Sync] Completed in ${duration}s`);
  } catch (error) {
    console.error(
      "\n[Sync] Error:",
      error instanceof Error ? error.message : error,
    );

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("[Sync] Authentication failed. Check your GITHUB_TOKEN.");
      } else if (error.response?.status === 403) {
        console.error(
          "[Sync] Rate limit exceeded or forbidden. Check your token permissions.",
        );
      } else if (error.response?.data) {
        console.error("[Sync] Response:", error.response.data);
      }
    }

    process.exit(1);
  } finally {
    // Close Redis connection
    await redis.quit();
  }
}

main();
