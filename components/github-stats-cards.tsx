"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, GitFork, Users, UserPlus, FileCode, type LucideIcon } from "lucide-react";
import { SiRefinedgithub } from "@icons-pack/react-simple-icons";
import { useInView } from "@/hooks/use-in-view";
import type { GitHubStats } from "@/lib/github-stats";

interface CardData {
  title: string;
  icon: LucideIcon | typeof SiRefinedgithub;
  value: string;
  subtitle: string;
  activeBorder: string;
  activeShadow: string;
  hoverBorder: string;
  activeIcon: string;
  hoverIcon: string;
  activeText: string;
  hoverText: string;
}

function getCards(stats: GitHubStats): CardData[] {
  return [
    {
      title: "Total Stars",
      icon: Star,
      value: stats.totalStars.toLocaleString(),
      subtitle: "Across all repositories",
      activeBorder: "border-accent-yellow/70",
      activeShadow: "shadow-lg shadow-accent-yellow/20",
      hoverBorder: "hover:border-accent-yellow/50",
      activeIcon: "text-accent-yellow",
      hoverIcon: "group-hover:text-accent-yellow",
      activeText: "text-accent-yellow",
      hoverText: "group-hover:text-accent-yellow",
    },
    {
      title: "Repositories",
      icon: SiRefinedgithub,
      value: stats.totalRepos.toString(),
      subtitle: "Public repositories",
      activeBorder: "border-accent-blue/70",
      activeShadow: "shadow-lg shadow-accent-blue/20",
      hoverBorder: "hover:border-accent-blue/50",
      activeIcon: "text-accent-blue",
      hoverIcon: "group-hover:text-accent-blue",
      activeText: "text-accent-blue",
      hoverText: "group-hover:text-accent-blue",
    },
    {
      title: "Followers",
      icon: Users,
      value: stats.totalFollowers.toString(),
      subtitle: "GitHub followers",
      activeBorder: "border-accent-green/70",
      activeShadow: "shadow-lg shadow-accent-green/20",
      hoverBorder: "hover:border-accent-green/50",
      activeIcon: "text-accent-green",
      hoverIcon: "group-hover:text-accent-green",
      activeText: "text-accent-green",
      hoverText: "group-hover:text-accent-green",
    },
    {
      title: "Total Forks",
      icon: GitFork,
      value: stats.totalForks.toLocaleString(),
      subtitle: "Forks of my repos",
      activeBorder: "border-accent-red/70",
      activeShadow: "shadow-lg shadow-accent-red/20",
      hoverBorder: "hover:border-accent-red/50",
      activeIcon: "text-accent-red",
      hoverIcon: "group-hover:text-accent-red",
      activeText: "text-accent-red",
      hoverText: "group-hover:text-accent-red",
    },
    {
      title: "Following",
      icon: UserPlus,
      value: stats.following.toString(),
      subtitle: "Developers I follow",
      activeBorder: "border-accent-yellow/70",
      activeShadow: "shadow-lg shadow-accent-yellow/20",
      hoverBorder: "hover:border-accent-yellow/50",
      activeIcon: "text-accent-yellow",
      hoverIcon: "group-hover:text-accent-yellow",
      activeText: "text-accent-yellow",
      hoverText: "group-hover:text-accent-yellow",
    },
    {
      title: "Public Gists",
      icon: FileCode,
      value: stats.publicGists.toString(),
      subtitle: "Code snippets shared",
      activeBorder: "border-accent-blue/70",
      activeShadow: "shadow-lg shadow-accent-blue/20",
      hoverBorder: "hover:border-accent-blue/50",
      activeIcon: "text-accent-blue",
      hoverIcon: "group-hover:text-accent-blue",
      activeText: "text-accent-blue",
      hoverText: "group-hover:text-accent-blue",
    },
  ];
}

interface GitHubStatsCardsProps {
  stats: GitHubStats;
}

export function GitHubStatsCards({ stats }: GitHubStatsCardsProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const cards = getCards(stats);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      // Sequential animation: each card lights up for 750ms
      cards.forEach((_, index) => {
        setTimeout(() => {
          setActiveIndex(index);
        }, index * 750);
      });

      // Turn off all cards after the sequence completes
      setTimeout(() => {
        setActiveIndex(null);
      }, cards.length * 750);
    }
  }, [isInView, hasAnimated, cards.length]);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isActive = activeIndex === index;

        return (
          <Card
            key={card.title}
            className={`group border-2 transition-all duration-500 ${
              isActive
                ? `${card.activeBorder} ${card.activeShadow}`
                : card.hoverBorder
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon
                className={`h-5 w-5 transition-colors duration-500 ${
                  isActive
                    ? card.activeIcon
                    : `text-muted-foreground ${card.hoverIcon}`
                }`}
              />
            </CardHeader>
            <CardContent>
              <div
                className={`text-3xl font-bold transition-colors duration-500 ${
                  isActive
                    ? card.activeText
                    : `text-foreground ${card.hoverText}`
                }`}
              >
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.subtitle}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
