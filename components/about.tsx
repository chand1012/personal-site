import { AboutCards } from "@/components/about-cards";
import { SkillBadges } from "@/components/skill-badges";

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="text-accent-blue">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm Chandler, a startup-focused developer from Canton, Ohio. I've
            been working in startups my entire career, building products that
            scale and make a difference.
          </p>
        </div>

        <AboutCards />

        {/* Skills Section */}
        <SkillBadges />
      </div>
    </section>
  );
}
