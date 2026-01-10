// GitHub Stats Data Structure
// Simplified to only include fast-to-fetch stats (no per-repo pagination needed)

export interface StarredRepo {
  name: string;
  fullName: string;
  owner: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
}

export interface GitHubStats {
  username: string;
  totalStars: number;
  totalRepos: number;
  totalFollowers: number;
  totalForks: number;
  following: number;
  publicGists: number;
  starsByOrg?: Record<string, number>; // Stars grouped by organization
  starredRepos?: StarredRepo[]; // 3 most recently starred repos
}

// Mock data - used as fallback when API is unavailable
export const mockGitHubStats: GitHubStats = {
  username: "chand1012",
  totalStars: 1247,
  totalRepos: 42,
  totalFollowers: 156,
  totalForks: 89,
  following: 120,
  publicGists: 15,
  starredRepos: [
    {
      name: "react",
      fullName: "facebook/react",
      owner: "facebook",
      description: "The library for web and native user interfaces.",
      url: "https://github.com/facebook/react",
      stars: 220000,
      language: "JavaScript",
    },
    {
      name: "next.js",
      fullName: "vercel/next.js",
      owner: "vercel",
      description: "The React Framework",
      url: "https://github.com/vercel/next.js",
      stars: 120000,
      language: "JavaScript",
    },
    {
      name: "typescript",
      fullName: "microsoft/TypeScript",
      owner: "microsoft",
      description: "TypeScript is a superset of JavaScript that compiles to clean JavaScript output.",
      url: "https://github.com/microsoft/TypeScript",
      stars: 97000,
      language: "TypeScript",
    },
  ],
};
