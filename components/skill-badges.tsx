"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Server, Settings, Code, type LucideIcon } from "lucide-react";
import { skills, getSkillsByCategory, getColorClasses, type Skill } from "@/lib/skills";
import { useInView } from "@/hooks/use-in-view";

interface SkillCategoryData {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  skills: Skill[];
}

const categories: SkillCategoryData[] = (() => {
  const skillsByCategory = getSkillsByCategory(skills);
  return [
    { title: "Frontend Technologies", icon: Monitor, iconColor: "text-accent-blue", skills: skillsByCategory.frontend },
    { title: "DevOps & Infrastructure", icon: Settings, iconColor: "text-accent-yellow", skills: skillsByCategory.devops },
    { title: "Backend & AI/ML", icon: Server, iconColor: "text-accent-green", skills: skillsByCategory.backend },
    { title: "Languages", icon: Code, iconColor: "text-accent-red", skills: skillsByCategory.language },
  ];
})();

export function SkillBadges() {
  const [ref, isInView] = useInView<HTMLDivElement>({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      // Sequential animation: each category title lights up for 1 second
      categories.forEach((_, index) => {
        // Start lighting up this category
        setTimeout(() => {
          setActiveCategory(index);
        }, index * 1000);
      });

      // Turn off all categories after the sequence completes
      setTimeout(() => {
        setActiveCategory(null);
      }, categories.length * 1000);
    }
  }, [isInView, hasAnimated]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-2">SKILLS</h3>
          <p className="text-muted-foreground">Full stack. Zero Compromises.</p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {categories.slice(0, 2).map((category, catIdx) => {
              const Icon = category.icon;
              const isActive = activeCategory === catIdx;

              return (
                <div key={category.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`h-5 w-5 ${category.iconColor}`} />
                    <h4 className={`text-lg font-semibold transition-colors duration-500 ${
                      isActive ? category.iconColor : ''
                    }`}>
                      {category.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const colors = getColorClasses(skill.color);

                      return (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className={`text-sm py-1 px-3 transition-all duration-300 hover:scale-105 text-muted-foreground border-border ${colors.hoverText} ${colors.hoverBorder}`}
                        >
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {categories.slice(2, 4).map((category, catIdx) => {
              const Icon = category.icon;
              const actualCatIdx = catIdx + 2;
              const isActive = activeCategory === actualCatIdx;

              return (
                <div key={category.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`h-5 w-5 ${category.iconColor}`} />
                    <h4 className={`text-lg font-semibold transition-colors duration-500 ${
                      isActive ? category.iconColor : ''
                    }`}>
                      {category.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const colors = getColorClasses(skill.color);

                      return (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className={`text-sm py-1 px-3 transition-all duration-300 hover:scale-105 text-muted-foreground border-border ${colors.hoverText} ${colors.hoverBorder}`}
                        >
                          {skill.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
