import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

const projects = [
  {
    name: "Hostile Takeover",
    description:
      "A silly Jackbox-style social deduction game about taking over a cyberpunk-themed company.",
    tech: ["TypeScript", "Next.js", "Redis"],
    github: "https://github.com/chand1012/hostile-takeover",
    live: "https://ht.chand1012.net",
    color: "accent-red",
  },
  {
    name: "git2gpt",
    description:
      "Converts a git repo into an LLM prompt you can copy and paste into your favorite Chatbot. Build pre-Claude Code.",
    tech: ["Go", "LLMs"],
    github: "https://github.com/chand1012/git2gpt",
    color: "accent-blue",
  },
  {
    name: "Claude Code MLX Proxy",
    description:
      "Use Claude Code with local models powered by Apple's M-series chips and MLX.",
    tech: ["Python", "FastAPI", "MLX"],
    github: "https://github.com/chand1012/claude-code-mlx-proxy",
    color: "accent-yellow",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="text-accent-blue">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Building products that solve real problems
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.name}
              className={`border-2 hover:border-[var(--${project.color})]/50 transition-all hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiGithub className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  {project.live && (
                    <Button variant="outline" size="sm" asChild>
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live
                    </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
