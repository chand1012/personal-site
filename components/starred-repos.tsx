import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getCachedStats } from "@/lib/github-cache";
import { mockGitHubStats, type StarredRepo } from "@/lib/github-stats";

const GITHUB_USERNAME = "chand1012";

async function getStarredRepos(): Promise<StarredRepo[]> {
  const stats = await getCachedStats(GITHUB_USERNAME);
  return stats?.starredRepos || mockGitHubStats.starredRepos || [];
}

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export async function StarredRepos() {
  const repos = await getStarredRepos();

  if (repos.length === 0) {
    return null;
  }

  return (
    <section id="starred" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Recently <span className="text-[var(--accent-yellow)]">Starred</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Open source projects I find interesting
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {repos.map((repo) => (
            <Card
              key={repo.fullName}
              className="border-2 hover:border-[var(--accent-yellow)]/50 transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {repo.owner}
                  </span>
                  {repo.language && (
                    <Badge variant="outline" className="text-xs">
                      {repo.language}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">
                  <Link
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-yellow)] transition-colors inline-flex items-center gap-2"
                  >
                    {repo.name}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {repo.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-[var(--accent-yellow)]" />
                    <span>{formatStarCount(repo.stars)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link
              href={`https://github.com/${GITHUB_USERNAME}?tab=stars`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Stars on GitHub
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
