import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Job {
  company: string;
  url?: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  tech: string[];
}

const employment: Job[] = [
  {
    company: "Saphira AI (YC S24)",
    url: "https://saphira.ai",
    title: "Senior Full Stack Engineer",
    location: "San Francisco, CA - Remote",
    startDate: "2025-12",
    endDate: null,
    description:
      "Building the future of AI-powered safety compliance & product certification.",
    highlights: [
      "Working with startup and enterprise clients to build their perfect AI powered safety compliance & product certification platform.",
      "Re-architecting backend and frontend to support modern AI powered features and development.",
      "Building out CI/CD pipeline to support modern rapid development and deployment on AWS and on-premise.",
    ],
    tech: ["Typescript", "Python", "OpenAI GPT", "React", "FastAPI"],
  },
  {
    company: "Hypha",
    url: "https://hypha.sh",
    title: "Full Stack Engineer",
    location: "Houston, TX - Remote",
    startDate: "2022-01",
    endDate: "2025-12",
    description:
      "Built the premier liquid staking platform on the Avalanche blockchain.",
    highlights: [
      "Maintained Go-based multi-signature cross-chain wallet infrastructure.",
      "Build and maintained Next.js frontend for managing validator nodes and liquid staking.",
      "Managed blockchain infrastructure and network operations across multiple cloud providers.",
    ],
    tech: ["Typescript", "Go", "Next.js", "Avalanche Blockchain", "Web3"],
  },
  {
    company: "Pillar.gg (Defunct)",
    title: "Full Stack Contractor",
    location: "Akron, OH - Remote",
    startDate: "2020-12",
    endDate: "2022-01",
    description:
      "Built and maintained AI powered stream highlights for Twitch and YouTube streamers.",
    highlights: [
      "Developed and maintained Dockerized Python and NodeJS Lambda functions for processing video and chat data in real-time.",
      "Built and maintained React-based dashboard for managing and analyzing stream data and video clips.",
      "Used AWS CDK to deploy infrastructure and automate deployment pipelines.",
    ],
    tech: ["JavaScript", "Python", "NodeJS", "React", "AWS CDK"],
  },
  {
    company: "Sealed Air - AUTOBAG® Division",
    url: "https://www.sealedair.com/products/brand/autobag",
    title: "Software Engineering Intern",
    location: "Streetsboro, OH - Onsite",
    startDate: "2019-05",
    endDate: "2020-01",
    description:
      "Maintained and extended embedded Linux OS & web-based HID UI for bagging machines.",
    highlights: [
      "Maintained Yocto-based embedded Linux OS for bagging systems control.",
      "Extended web-based UI for bagging machines to support new features and bug fixes.",
      "Developed Python-based testing interface to validate bagging machine functionality."
    ],
    tech: ["Python", "Javascript", "Linux", "NodeJS", "Yocto"],
  }
];

function formatDate(dateStr: string): string {
  // Parse YYYY-MM format manually to avoid timezone issues
  const [year, month] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1); // month is 0-indexed
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Employment() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Work{" "}
            <span className="text-[var(--accent-green)]">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Enterprise and Startup.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {employment.map((job, index) => (
              <div
                key={`${job.company}-${job.startDate}`}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-[var(--accent-green)] border-4 border-background hidden md:block" />

                {/* Content */}
                <div className="md:w-1/2 md:px-8">
                  <Card className="border-2 hover:border-[var(--accent-green)]/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex items-center gap-2 text-[var(--accent-green)] font-medium">
                            <Briefcase className="h-4 w-4" />
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

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(job.startDate)} -{" "}
                          {job.endDate ? formatDate(job.endDate) : "Present"}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>

                      <ul className="space-y-2 mb-4">
                        {job.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="text-[var(--accent-green)] mt-1">
                              &bull;
                            </span>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {job.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
