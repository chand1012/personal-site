import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { GitHubStats } from "@/components/github-stats";
import { Employment } from "@/components/employment";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";
import { StarredRepos } from "@/components/starred-repos";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Employment />
      <Projects />
      <Blog />
      <GitHubStats />
      <StarredRepos />
      <Contact />
    </main>
  );
}
