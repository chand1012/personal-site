import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    name: "git2gpt",
    label: "Developer tooling",
    description:
      "A Go utility that turns a repository into focused, copy-ready context for an LLM—built before agentic coding tools made the workflow commonplace.",
    problem:
      "Give an LLM useful repository context without manual file-by-file copying.",
    contribution:
      "Designed and shipped the complete Go-based workflow as an open-source tool.",
    proof: "Public source and a reusable command-line workflow.",
    architecture: ["Git repository", "File selection", "Prompt-ready context"],
    tech: ["Go", "LLM workflows", "CLI"],
    github: "https://github.com/chand1012/git2gpt",
    colorClass: "text-[var(--accent-blue)]",
    borderClass: "hover:border-[var(--accent-blue)]/60",
  },
  {
    name: "Claude Code MLX Proxy",
    label: "Local AI infrastructure",
    description:
      "An OpenAI-compatible FastAPI bridge that lets Claude Code use local models accelerated by MLX on Apple silicon.",
    problem:
      "Connect an agentic coding client to fast, private local inference.",
    contribution:
      "Built the compatibility layer and model-serving integration.",
    proof: "Open-source implementation for Apple M-series hardware.",
    architecture: ["Claude Code", "FastAPI proxy", "MLX model"],
    tech: ["Python", "FastAPI", "MLX"],
    github: "https://github.com/chand1012/claude-code-mlx-proxy",
    colorClass: "text-[var(--accent-yellow)]",
    borderClass: "hover:border-[var(--accent-yellow)]/60",
  },
  {
    name: "OpenAI for Workers AI",
    label: "Edge AI compatibility",
    description:
      "An OpenAI-compatible API on Cloudflare Workers AI, designed so existing SDK-based applications can use new models without rewriting their client integrations.",
    problem:
      "Let OpenAI SDK integrations target Workers AI through a familiar API surface.",
    contribution:
      "Implemented compatibility routes for chat and text completions, embeddings, audio transcription and translation, and image generation.",
    proof: "280 GitHub stars and 68 forks as of August 2026.",
    architecture: ["OpenAI SDK", "Cloudflare Worker", "Workers AI"],
    tech: ["JavaScript", "Cloudflare Workers", "Workers AI"],
    github: "https://github.com/chand1012/openai-cf-workers-ai",
    colorClass: "text-[var(--accent-red)]",
    borderClass: "hover:border-[var(--accent-red)]/60",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-16 bg-muted/30 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-heading">
          <div>
            <p className="section-kicker text-[var(--accent-blue)]">
              Selected work
            </p>
            <h2 className="section-title">
              Products with{" "}
              <span className="text-[var(--accent-blue)]">technical depth</span>
            </h2>
          </div>
          <p className="section-summary">
            Three examples spanning developer tools, local AI infrastructure,
            and edge-model compatibility.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.name}
              className={`flex h-full flex-col border-2 ${project.borderClass}`}
            >
              <CardHeader className="space-y-3 pb-3">
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.16em] ${project.colorClass}`}
                >
                  {project.label}
                </p>
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="mb-4 rounded-lg border bg-background/60 p-3">
                  <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    System shape
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                    {project.architecture.map((step, index) => (
                      <span key={step} className="contents">
                        <span className="rounded-md bg-muted px-2 py-1">
                          {step}
                        </span>
                        {index < project.architecture.length - 1 && (
                          <ArrowRight
                            className={`h-3 w-3 ${project.colorClass}`}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="inline font-semibold">Problem: </dt>
                    <dd className="inline text-muted-foreground">
                      {project.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold">Proof: </dt>
                    <dd className="inline text-muted-foreground">
                      {project.proof}
                    </dd>
                  </div>
                </dl>

                <details className="progressive-details mt-4">
                  <summary>Engineering contribution</summary>
                  <p>{project.contribution}</p>
                </details>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex gap-2 pt-5">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiGithub className="mr-2 h-4 w-4" /> Code
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
