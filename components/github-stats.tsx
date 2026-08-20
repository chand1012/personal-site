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
    <section id="github-stats" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="section-heading">
          <div>
            <p className="section-kicker text-[var(--accent-yellow)]">
              Open-source proof
            </p>
            <h2 className="section-title">
              Work that other developers{" "}
              <span className="text-[var(--accent-yellow)]">
                use and extend
              </span>
            </h2>
          </div>
          <p className="section-summary">
            A focused view of public impact rather than activity for activity's
            sake.
          </p>
        </div>
        <GitHubStatsCards stats={stats} />
      </div>
    </section>
  );
}
