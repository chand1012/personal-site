import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCachedStats } from "@/lib/github-cache";
import {
  mockGitHubStats,
  type GitHubStats as GitHubStatsType,
} from "@/lib/github-stats";
import { Star, GitFork, Users, UserPlus, FileCode } from "lucide-react";
import { SiRefinedgithub,  } from "@icons-pack/react-simple-icons";
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-[var(--accent-yellow)]/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Stars
              </CardTitle>
              <Star className="h-5 w-5 text-[var(--accent-yellow)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--accent-yellow)]">
                {stats.totalStars.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all repositories
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-blue)]/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Repositories
              </CardTitle>
              <SiRefinedgithub className="h-5 w-5 text-[var(--accent-blue)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--accent-blue)]">
                {stats.totalRepos}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Public repositories
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-green)]/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Followers
              </CardTitle>
              <Users className="h-5 w-5 text-[var(--accent-green)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--accent-green)]">
                {stats.totalFollowers}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                GitHub followers
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-red)]/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Forks
              </CardTitle>
              <GitFork className="h-5 w-5 text-[var(--accent-red)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--accent-red)]">
                {stats.totalForks.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Forks of my repos
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-yellow)]/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Following
              </CardTitle>
              <UserPlus className="h-5 w-5 text-[var(--accent-yellow)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--accent-yellow)]">
                {stats.following}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Developers I follow
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-blue)]/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Public Gists
              </CardTitle>
              <FileCode className="h-5 w-5 text-[var(--accent-blue)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--accent-blue)]">
                {stats.publicGists}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Code snippets shared
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
