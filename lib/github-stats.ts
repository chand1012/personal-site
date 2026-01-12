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
  starredRepos?: StarredRepo[]; // 6 most recently starred repos
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
    {
      name: "tailwindcss",
      fullName: "tailwindlabs/tailwindcss",
      owner: "tailwindlabs",
      description: "A utility-first CSS framework for rapid UI development.",
      url: "https://github.com/tailwindlabs/tailwindcss",
      stars: 79000,
      language: "TypeScript",
    },
    {
      name: "rust",
      fullName: "rust-lang/rust",
      owner: "rust-lang",
      description: "Empowering everyone to build reliable and efficient software.",
      url: "https://github.com/rust-lang/rust",
      stars: 92000,
      language: "Rust",
    },
    {
      name: "vscode",
      fullName: "microsoft/vscode",
      owner: "microsoft",
      description: "Visual Studio Code",
      url: "https://github.com/microsoft/vscode",
      stars: 158000,
      language: "TypeScript",
    },
  ],
};
