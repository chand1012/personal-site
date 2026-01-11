import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills, getSkillsByCategory, getColorClasses } from "@/lib/skills";
import {
  Code2,
  Rocket,
  Zap,
  Monitor,
  Server,
  Settings,
  Code,
  GraduationCap,
} from "lucide-react";

export function About() {
  const skillsByCategory = getSkillsByCategory(skills);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="text-[var(--accent-blue)]">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm Chandler, a startup-focused developer from Canton, Ohio. I've
            been working in startups my entire career, building products that
            scale and make a difference.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="border-2 hover:border-[var(--accent-red)]/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <GraduationCap className="h-10 w-10 text-[var(--accent-red)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-sm text-muted-foreground">
                  B.S. in Computer Science from the University of Akron
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-green)]/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Rocket className="h-10 w-10 text-[var(--accent-green)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Startup Experience
                </h3>
                <p className="text-sm text-muted-foreground">
                  Years of experience building and scaling startups from the
                  ground up
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-yellow)]/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Zap className="h-10 w-10 text-[var(--accent-yellow)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Full Stack</h3>
                <p className="text-sm text-muted-foreground">
                  End-to-end development from database to beautiful UIs
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[var(--accent-blue)]/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Code2 className="h-10 w-10 text-[var(--accent-blue)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Clean Code</h3>
                <p className="text-sm text-muted-foreground">
                  Writing maintainable, scalable code that stands the test of
                  time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">SKILLS</h3>
              <p className="text-muted-foreground">
                Full stack. Zero Compromises.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Frontend */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Monitor className="h-5 w-5 text-[var(--accent-blue)]" />
                    <h4 className="text-lg font-semibold">
                      Frontend Technologies
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.frontend.map((skill) => {
                      const colors = getColorClasses(skill.color);
                      return (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className={`text-sm py-1 px-3 transition-colors hover:scale-105 ${colors.text} ${colors.border}`}
                        >
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* DevOps */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="h-5 w-5 text-[var(--accent-green)]" />
                    <h4 className="text-lg font-semibold">
                      DevOps & Infrastructure
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.devops.map((skill) => {
                      const colors = getColorClasses(skill.color);
                      return (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className={`text-sm py-1 px-3 transition-colors hover:scale-105 ${colors.text} ${colors.border}`}
                        >
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Backend */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Server className="h-5 w-5 text-[var(--accent-red)]" />
                    <h4 className="text-lg font-semibold">
                      Backend & AI/ML
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.backend.map((skill) => {
                      const colors = getColorClasses(skill.color);
                      return (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className={`text-sm py-1 px-3 transition-colors hover:scale-105 ${colors.text} ${colors.border}`}
                        >
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Code className="h-5 w-5 text-[var(--accent-yellow)]" />
                    <h4 className="text-lg font-semibold">Languages</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory.language.map((skill) => {
                      const colors = getColorClasses(skill.color);
                      return (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className={`text-sm py-1 px-3 transition-colors hover:scale-105 ${colors.text} ${colors.border}`}
                        >
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
