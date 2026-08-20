import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { SiX, SiGithub } from "@icons-pack/react-simple-icons";
import { EmailReveal } from "@/components/email-reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Card className="border-2">
          <CardContent className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="section-kicker text-[var(--accent-blue)]">
                Contact
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Need someone who can{" "}
                <span className="text-accent-blue">own the system?</span>
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                I am most useful where product ambiguity, backend depth, and
                production delivery meet.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <EmailReveal variant="default" />
              <Button variant="outline" size="lg" asChild>
                <Link
                  href="https://github.com/chand1012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <SiGithub className="h-5 w-5" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link
                  href="https://www.linkedin.com/in/chandlerl2000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="https://x.com/Chand1012Dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <SiX className="h-5 w-5" />X
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
