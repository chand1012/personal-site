"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Rocket, Zap, GraduationCap, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

interface CardData {
  icon: LucideIcon;
  title: string;
  description: string;
  activeBorder: string;
  activeShadow: string;
  hoverBorder: string;
  activeIcon: string;
  hoverIcon: string;
}

const cards: CardData[] = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.S. in Computer Science from the University of Akron",
    activeBorder: "border-accent-red/70",
    activeShadow: "shadow-lg shadow-accent-red/20",
    hoverBorder: "hover:border-accent-red/50",
    activeIcon: "text-accent-red",
    hoverIcon: "group-hover:text-accent-red",
  },
  {
    icon: Rocket,
    title: "Startup Experience",
    description:
      "Years of experience building and scaling startups from the ground up",
    activeBorder: "border-accent-green/70",
    activeShadow: "shadow-lg shadow-accent-green/20",
    hoverBorder: "hover:border-accent-green/50",
    activeIcon: "text-accent-green",
    hoverIcon: "group-hover:text-accent-green",
  },
  {
    icon: Zap,
    title: "Full Stack",
    description: "End-to-end development from database to beautiful UIs",
    activeBorder: "border-accent-yellow/70",
    activeShadow: "shadow-lg shadow-accent-yellow/20",
    hoverBorder: "hover:border-accent-yellow/50",
    activeIcon: "text-accent-yellow",
    hoverIcon: "group-hover:text-accent-yellow",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time",
    activeBorder: "border-accent-blue/70",
    activeShadow: "shadow-lg shadow-accent-blue/20",
    hoverBorder: "hover:border-accent-blue/50",
    activeIcon: "text-accent-blue",
    hoverIcon: "group-hover:text-accent-blue",
  },
];

export function AboutCards() {
  const [ref, isInView] = useInView<HTMLDivElement>({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      // Sequential animation: each card lights up for 1 second
      cards.forEach((_, index) => {
        // Start lighting up this card
        setTimeout(() => {
          setActiveIndex(index);
        }, index * 1000);
      });

      // Turn off all cards after the sequence completes
      setTimeout(() => {
        setActiveIndex(null);
      }, cards.length * 1000);
    }
  }, [isInView, hasAnimated]);

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isActive = activeIndex === index;

        return (
          <Card
            key={card.title}
            className={`group border-2 transition-all duration-500 ${
              isActive
                ? `${card.activeBorder} ${card.activeShadow}`
                : card.hoverBorder
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Icon
                  className={`h-10 w-10 mb-4 transition-colors duration-500 ${card.activeIcon}`}
                />
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
