import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { ArrowRight, GitFork, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmailReveal } from "@/components/email-reveal";
import { getCachedStats } from "@/lib/github-cache";
import { mockGitHubStats, type GitHubStats } from "@/lib/github-stats";

export async function Hero() {
  const stats: GitHubStats =
    (await getCachedStats("chand1012")) || mockGitHubStats;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <section
      id="home"
      className="px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.65fr)]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-green)]">
            Senior startup product engineer
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            I build{" "}
            <span className="text-[var(--accent-blue)]">AI products</span> and{" "}
            <span className="text-[var(--accent-green)]">
              production systems
            </span>
            .
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I turn ambiguous startup problems into shipped software—from
            customer workflows and React interfaces to Python, Go, and Node.js
            services, CI/CD, and production operations.
          </p>

          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Career highlights"
          >
            <li className="evidence-chip border-[var(--accent-red)]/40">
              5+ years in startups
            </li>
            <li className="evidence-chip border-[var(--accent-green)]/40">
              YC-backed AI
            </li>
            <li className="evidence-chip border-[var(--accent-blue)]/40">
              Product → infrastructure
            </li>
            <li className="evidence-chip border-[var(--accent-yellow)]/40">
              Open-source builder
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="#projects">
                View selected work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <EmailReveal />
            <Button size="lg" variant="ghost" asChild>
              <Link
                href="https://github.com/chand1012"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
            <div className="proof-stat">
              <Star className="h-5 w-5 text-[var(--accent-yellow)]" />
              <div>
                <div className="text-xl font-bold">
                  {formatNumber(stats.totalStars)}
                </div>
                <div className="text-xs text-muted-foreground">
                  GitHub stars
                </div>
              </div>
            </div>
            <div className="proof-stat">
              <GitFork className="h-5 w-5 text-[var(--accent-blue)]" />
              <div>
                <div className="text-xl font-bold">
                  {formatNumber(stats.totalForks)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Project forks
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-yellow)] opacity-50 blur-xl" />
            <div className="relative rounded-full bg-gradient-to-br from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-yellow)] p-1">
              <div className="relative overflow-hidden rounded-full bg-background p-1">
                <Image
                  src="/me.jpeg"
                  alt="Portrait of Chandler L"
                  width={256}
                  height={256}
                  className="h-40 w-40 rounded-full object-cover grayscale sm:h-52 sm:w-52 lg:h-64 lg:w-64"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
