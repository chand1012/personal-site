import { AboutCards } from "@/components/about-cards";
import { SkillBadges } from "@/components/skill-badges";

export function About() {
  return (
    <section
      id="capabilities"
      className="scroll-mt-16 bg-muted/30 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-heading">
          <div>
            <p className="section-kicker text-[var(--accent-red)]">
              Capabilities
            </p>
            <h2 className="section-title">
              Broad range, anchored by{" "}
              <span className="text-[var(--accent-red)]">
                production ownership
              </span>
            </h2>
          </div>
          <p className="section-summary">
            A generalist profile with meaningful depth in backend systems,
            infrastructure, AI workflows, and web applications.
          </p>
        </div>

        <AboutCards />
        <SkillBadges />
      </div>
    </section>
  );
}
