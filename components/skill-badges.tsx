import { BrainCircuit, Code2, Monitor, ServerCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const capabilities = [
  {
    title: "Backend & systems",
    icon: ServerCog,
    color: "text-[var(--accent-green)]",
    proof: "Services, automation, and operational ownership",
    skills: [
      "Go",
      "Python",
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Linux",
    ],
  },
  {
    title: "Infrastructure & delivery",
    icon: Code2,
    color: "text-[var(--accent-yellow)]",
    proof: "Repeatable cloud and customer-managed deployments",
    skills: [
      "AWS",
      "Docker",
      "Terraform",
      "AWS CDK",
      "GitHub Actions",
      "Ansible",
    ],
  },
  {
    title: "Web applications",
    icon: Monitor,
    color: "text-[var(--accent-blue)]",
    proof: "Product interfaces backed by production APIs",
    skills: ["TypeScript", "React", "Next.js", "React Native", "Tailwind CSS"],
  },
  {
    title: "Applied AI",
    icon: BrainCircuit,
    color: "text-[var(--accent-red)]",
    proof: "AI-assisted workflows and local model integrations",
    skills: ["LLM integrations", "RAG", "MLX", "Stable Diffusion", "OpenCV"],
  },
];

export function SkillBadges() {
  return (
    <Card className="border-2">
      <CardContent className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
        {capabilities.map((capability) => {
          const Icon = capability.icon;
          return (
            <div key={capability.title}>
              <div className="mb-2 flex items-center gap-2">
                <Icon
                  className={`h-5 w-5 ${capability.color}`}
                  aria-hidden="true"
                />
                <h3 className="font-semibold">{capability.title}</h3>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                {capability.proof}
              </p>
              <div className="flex flex-wrap gap-2">
                {capability.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
