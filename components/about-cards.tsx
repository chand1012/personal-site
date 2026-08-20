import { Boxes, CloudCog, GraduationCap, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const signals = [
  {
    icon: Rocket,
    value: "5+ years",
    label: "Startup delivery",
    detail: "From early product work through production operations",
    color: "text-[var(--accent-red)]",
  },
  {
    icon: Boxes,
    value: "End to end",
    label: "Engineering scope",
    detail: "React interfaces, APIs, data, infrastructure, and CI/CD",
    color: "text-[var(--accent-blue)]",
  },
  {
    icon: CloudCog,
    value: "Cloud + on-prem",
    label: "Delivery environments",
    detail: "AWS, automation, Linux systems, and customer deployments",
    color: "text-[var(--accent-yellow)]",
  },
  {
    icon: GraduationCap,
    value: "B.S. Computer Science",
    label: "University of Akron",
    detail: "Systems-focused computer science education",
    color: "text-[var(--accent-green)]",
  },
];

export function AboutCards() {
  return (
    <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {signals.map((signal) => {
        const Icon = signal.icon;
        return (
          <Card key={signal.label} className="border-2">
            <CardContent className="p-5">
              <Icon
                className={`mb-4 h-6 w-6 ${signal.color}`}
                aria-hidden="true"
              />
              <p className="text-lg font-bold">{signal.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {signal.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {signal.detail}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
