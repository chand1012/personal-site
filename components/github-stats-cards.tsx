import { GitFork, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubStats } from "@/lib/github-stats";

interface GitHubStatsCardsProps {
  stats: GitHubStats;
}

export function GitHubStatsCards({ stats }: GitHubStatsCardsProps) {
  const cards = [
    {
      label: "Stars earned",
      value: stats.totalStars.toLocaleString(),
      detail: "Across original public repositories",
      icon: Star,
      color: "text-[var(--accent-yellow)]",
    },
    {
      label: "Project forks",
      value: stats.totalForks.toLocaleString(),
      detail: "Developers building from the work",
      icon: GitFork,
      color: "text-[var(--accent-blue)]",
    },
    {
      label: "GitHub followers",
      value: stats.totalFollowers.toLocaleString(),
      detail: "Audience around public engineering",
      icon: Users,
      color: "text-[var(--accent-green)]",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="border-2">
            <CardContent className="flex items-center gap-4 p-5">
              <Icon
                className={`h-7 w-7 shrink-0 ${card.color}`}
                aria-hidden="true"
              />
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm font-semibold">{card.label}</p>
                <p className="text-xs text-muted-foreground">{card.detail}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
