import { Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Job {
  company: string;
  url?: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
  tech: string[];
}

const employment: Job[] = [
  {
    company: "Saphira AI (YC S24)",
    url: "https://saphira.ai",
    title: "Senior Full Stack Engineer",
    location: "Remote",
    startDate: "2025-12",
    endDate: null,
    summary: "AI-powered safety compliance and product certification.",
    highlights: [
      "Partner with startup and enterprise customers to translate safety and certification workflows into product features.",
      "Re-architect React and Python systems to support modern AI-assisted workflows.",
      "Build CI/CD delivery for AWS and on-premise deployments.",
    ],
    tech: ["TypeScript", "Python", "React", "FastAPI", "AWS"],
  },
  {
    company: "Hypha / GoGoPool (formerly Multisig Labs)",
    url: "https://hypha.sh",
    title: "Full Stack Engineer",
    location: "Remote",
    startDate: "2022-01",
    endDate: "2025-12",
    summary: "Liquid staking and validator infrastructure on Avalanche.",
    highlights: [
      "Maintained Go-based multi-signature, cross-chain wallet infrastructure.",
      "Built and maintained a Next.js interface for validator and liquid-staking operations.",
      "Operated blockchain infrastructure across cloud providers under uptime requirements.",
    ],
    tech: ["Go", "TypeScript", "Next.js", "AWS", "Ansible"],
  },
  {
    company: "Pillar.gg",
    title: "Full Stack Contractor",
    location: "Remote",
    startDate: "2020-12",
    endDate: "2022-01",
    summary: "Automated stream highlights for Twitch and YouTube creators.",
    highlights: [
      "Built Dockerized Python and Node.js Lambda workloads for real-time video and chat processing.",
      "Developed the React dashboard used to manage stream data and generated clips.",
      "Defined AWS infrastructure and deployment automation with CDK.",
    ],
    tech: ["Node.js", "Python", "React", "Docker", "AWS CDK"],
  },
  {
    company: "Sealed Air — AUTOBAG®",
    url: "https://www.sealedair.com/products/brand/autobag",
    title: "Software Engineering Intern",
    location: "Streetsboro, Ohio",
    startDate: "2019-05",
    endDate: "2020-01",
    summary:
      "Embedded Linux and web interfaces for industrial bagging systems.",
    highlights: [
      "Maintained a Yocto-based embedded Linux operating system.",
      "Extended the web-based machine interface with product features and fixes.",
      "Created a Python testing interface for hardware validation.",
    ],
    tech: ["Python", "JavaScript", "Linux", "Node.js", "Yocto"],
  },
];

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function Employment() {
  return (
    <section
      id="experience"
      className="scroll-mt-16 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-heading">
          <div>
            <p className="section-kicker text-[var(--accent-green)]">
              Experience
            </p>
            <h2 className="section-title">
              Ownership from{" "}
              <span className="text-[var(--accent-green)]">
                product to operations
              </span>
            </h2>
          </div>
          <p className="section-summary">
            Startup delivery across AI, blockchain infrastructure, media
            systems, and embedded Linux.
          </p>
        </div>

        <div className="space-y-4">
          {employment.map((job) => (
            <Card
              key={`${job.company}-${job.startDate}`}
              className="border-2 hover:border-[var(--accent-green)]/50"
            >
              <CardContent className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.8fr)] lg:gap-8">
                <div>
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="mt-1 flex items-center gap-2 font-medium text-[var(--accent-green)]">
                        <Briefcase className="h-4 w-4 shrink-0" />
                        {job.url ? (
                          <Link
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:underline"
                          >
                            {job.company}
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ) : (
                          job.company
                        )}
                      </div>
                    </div>
                    {!job.endDate && (
                      <Badge className="bg-[var(--accent-green)] text-white">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(job.startDate)} –{" "}
                      {job.endDate ? formatDate(job.endDate) : "Present"}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 font-medium">{job.summary}</p>
                  <ul className="grid gap-2 text-sm sm:grid-cols-2">
                    {job.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 text-[var(--accent-green)]">
                          ●
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <details className="progressive-details mt-3">
                    <summary>More responsibility</summary>
                    <p>{job.highlights[2]}</p>
                  </details>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
