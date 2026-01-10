import { Button } from "@/components/ui/button";
import { Linkedin, Mail, GitFork, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { mockGitHubStats, type GitHubStats } from "@/lib/github-stats";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { getCachedStats } from "@/lib/github-cache";

export async function Hero() {
  const stats: GitHubStats = (await getCachedStats("chand1012")) || mockGitHubStats;

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-yellow)] blur-xl opacity-50 animate-pulse" />
              <div className="relative rounded-full p-1 bg-gradient-to-br from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-yellow)]">
                <div className="relative rounded-full overflow-hidden bg-background p-1">
                  <Image
                    src="/me.jpeg"
                    alt="Chandler"
                    width={200}
                    height={200}
                    className="rounded-full object-cover w-48 h-48 sm:w-56 sm:h-56 grayscale"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-foreground">Hi, I'm</span>{" "}
            <span className="text-[var(--accent-blue)]">Chandler</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
            <span className="text-[var(--accent-red)]">Startup-focused</span>{" "}
            developer from{" "}
            <span className="text-[var(--accent-green)]">Canton, Ohio</span>.
            I've been working in startups my entire career, crafting products
            that matter with{" "}
            <span className="text-[var(--accent-yellow)]">clean code</span> and
            scalable architecture.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[var(--accent-yellow)]" />
              <div className="text-left">
                <div className="text-2xl font-bold text-[var(--accent-yellow)]">
                  {formatNumber(stats.totalStars)}
                </div>
                <div className="text-xs text-muted-foreground">Stars</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-5 w-5 text-[var(--accent-blue)]" />
              <div className="text-left">
                <div className="text-2xl font-bold text-[var(--accent-blue)]">
                  {formatNumber(stats.totalForks)}
                </div>
                <div className="text-xs text-muted-foreground">Forks</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-[var(--accent-blue)] text-white hover:opacity-90"
              asChild
            >
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--accent-yellow)] text-[var(--accent-yellow)] hover:bg-[var(--accent-yellow)]/10"
              asChild
            >
              <Link href="#about">Learn More</Link>
            </Button>
            <Button size="lg" className="bg-(--accent-green) text-white hover:opacity-90" asChild>
              <Link href="#github-stats">GitHub Activity</Link>
            </Button>
          </div>
          <div className="flex gap-4 justify-center items-center pt-8">
            <Link
              href="https://github.com/chand1012"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[var(--accent-green)] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/chand1012"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[var(--accent-blue)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:hello@example.com"
              className="text-muted-foreground hover:text-[var(--accent-red)] transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
