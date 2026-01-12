import { getCachedStats } from "@/lib/github-cache";
import {
  mockGitHubStats,
  type GitHubStats as GitHubStatsType,
} from "@/lib/github-stats";
import { GitHubStatsCards } from "@/components/github-stats-cards";

const GITHUB_USERNAME = "chand1012";

async function getStats(): Promise<GitHubStatsType> {
  const stats = await getCachedStats(GITHUB_USERNAME);
  return stats || mockGitHubStats;
}

export async function GitHubStats() {
  const stats = await getStats();

  return (
    <section id="github-stats" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            GitHub <span className="text-accent-green">Activity</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Building in public, one commit at a time
          </p>
        </div>
        <GitHubStatsCards stats={stats} />
      </div>
    </section>
  );
}
