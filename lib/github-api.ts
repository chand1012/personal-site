import axios, { type AxiosResponseHeaders, type AxiosResponse } from "axios";
import Bottleneck from "bottleneck";

// GitHub API rate limiter: 5,000 requests/hour for authenticated users
// Optimized for faster fetching with concurrent requests
const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100, // 100ms minimum between requests (10 req/sec max)
  reservoir: 4500, // Leave some buffer
  reservoirRefreshAmount: 4500,
  reservoirRefreshInterval: 60 * 60 * 1000, // 1 hour
});

const GITHUB_API_BASE = "https://api.github.com";

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
  used: number;
}

let lastRateLimitInfo: RateLimitInfo | null = null;

/**
 * Extract rate limit info from GitHub API response headers
 */
function extractRateLimitInfo(
  headers: Record<string, unknown> | AxiosResponseHeaders,
): RateLimitInfo | null {
  const headerRecord: Record<string, string | string[] | undefined> = {};
  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      if (value !== null && value !== undefined) {
        headerRecord[key.toLowerCase()] = Array.isArray(value)
          ? value.map((v) => String(v))
          : String(value);
      }
    }
  }

  const limit = headerRecord["x-ratelimit-limit"];
  const remaining = headerRecord["x-ratelimit-remaining"];
  const reset = headerRecord["x-ratelimit-reset"];
  const used = headerRecord["x-ratelimit-used"];

  if (limit && remaining && reset) {
    const info: RateLimitInfo = {
      limit: parseInt(Array.isArray(limit) ? limit[0] : limit, 10),
      remaining: parseInt(
        Array.isArray(remaining) ? remaining[0] : remaining,
        10,
      ),
      reset: parseInt(Array.isArray(reset) ? reset[0] : reset, 10),
      used: used ? parseInt(Array.isArray(used) ? used[0] : used, 10) : 0,
    };
    lastRateLimitInfo = info;
    return info;
  }

  return lastRateLimitInfo;
}

/**
 * Check if we're rate limited and wait if necessary
 */
async function checkAndHandleRateLimit(
  headers: Record<string, unknown> | AxiosResponseHeaders,
): Promise<void> {
  const rateLimit = extractRateLimitInfo(headers);
  if (!rateLimit) return;

  if (rateLimit.remaining < rateLimit.limit * 0.1) {
    console.warn(
      `[Rate Limit] Low remaining: ${rateLimit.remaining}/${rateLimit.limit}. Reset at ${new Date(rateLimit.reset * 1000).toISOString()}`,
    );
  }

  if (rateLimit.remaining === 0) {
    const now = Math.floor(Date.now() / 1000);
    const waitTime = (rateLimit.reset - now) * 1000 + 1000;

    if (waitTime > 0) {
      console.warn(
        `[Rate Limit] Rate limit exceeded. Waiting ${Math.ceil(waitTime / 1000)} seconds until reset...`,
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

/**
 * Check rate limit before making request
 */
async function checkRateLimitBeforeRequest(): Promise<void> {
  if (lastRateLimitInfo && lastRateLimitInfo.remaining === 0) {
    const now = Math.floor(Date.now() / 1000);
    if (now < lastRateLimitInfo.reset) {
      const waitTime = (lastRateLimitInfo.reset - now) * 1000 + 1000;
      console.warn(
        `[Rate Limit] Pre-check: Rate limit exhausted. Waiting ${Math.ceil(waitTime / 1000)} seconds...`,
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

export interface GitHubRepo {
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

async function rateLimitedGet<T>(
  url: string,
  headers: Record<string, string>,
): Promise<AxiosResponse<T>> {
  return limiter.schedule(async () => {
    await checkRateLimitBeforeRequest();

    try {
      const response = await axios.get<T>(url, { headers });

      if (response.headers) {
        await checkAndHandleRateLimit(response.headers);
      }

      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.headers) {
        const rateLimit = extractRateLimitInfo(error.response.headers);

        if (
          (error.response.status === 403 || error.response.status === 429) &&
          rateLimit &&
          rateLimit.remaining === 0
        ) {
          const now = Math.floor(Date.now() / 1000);
          const waitTime = (rateLimit.reset - now) * 1000 + 1000;

          console.warn(
            `[Rate Limit] Rate limit error (${error.response.status}). Waiting ${Math.ceil(waitTime / 1000)} seconds...`,
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));

          return axios.get<T>(url, { headers });
        }
      }

      throw error;
    }
  });
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
    "User-Agent": "personal-site/1.0",
  };
}

/**
 * Fetch all repositories for a user
 */
export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const headers = getHeaders();
  const repos: GitHubRepo[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await rateLimitedGet<GitHubRepo[]>(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&page=${page}&sort=updated`,
        headers,
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
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.warn(`User ${username} not found or has no repos`);
          break;
        }
        if (error.response?.status === 403 || error.response?.status === 429) {
          const rateLimit = extractRateLimitInfo(error.response.headers || {});
          const isRateLimit =
            rateLimit?.remaining === 0 ||
            error.response?.data?.message?.toLowerCase().includes("rate limit");

          if (isRateLimit) {
            console.error(`[Rate Limit] Rate limit hit for user ${username}.`);
            throw new Error(
              `GitHub API rate limit exceeded. Please wait and retry later.`,
            );
          }
        }
      }
      throw error;
    }
  }

  return repos;
}

/**
 * Fetch all repositories for an organization
 */
export async function fetchOrgRepos(org: string): Promise<GitHubRepo[]> {
  const headers = getHeaders();
  const repos: GitHubRepo[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await rateLimitedGet<GitHubRepo[]>(
        `${GITHUB_API_BASE}/orgs/${org}/repos?per_page=100&page=${page}&sort=updated`,
        headers,
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
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.warn(`Org ${org} not found or has no repos`);
          break;
        }
        if (error.response?.status === 403 || error.response?.status === 429) {
          const rateLimit = extractRateLimitInfo(error.response.headers || {});
          const isRateLimit =
            rateLimit?.remaining === 0 ||
            error.response?.data?.message?.toLowerCase().includes("rate limit");

          if (isRateLimit) {
            console.error(`[Rate Limit] Rate limit hit for org ${org}.`);
            throw new Error(
              `GitHub API rate limit exceeded. Please wait and retry later.`,
            );
          }
        }
      }
      throw error;
    }
  }

  return repos;
}

/**
 * Check current rate limit status
 */
export async function checkRateLimitStatus(): Promise<RateLimitInfo | null> {
  try {
    const headers = getHeaders();
    const response = await axios.get(`${GITHUB_API_BASE}/rate_limit`, {
      headers,
    });
    return extractRateLimitInfo(response.headers);
  } catch (error) {
    console.error("Error checking rate limit status:", error);
    return lastRateLimitInfo;
  }
}

/**
 * Aggregate stats from repositories (simplified - no commit/PR fetching)
 */
export function aggregateRepoStats(repos: GitHubRepo[]): {
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

  return {
    totalStars,
    totalForks,
    starsByOrg,
  };
}
