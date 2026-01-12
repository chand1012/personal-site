import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { SiX, SiGithub } from "@icons-pack/react-simple-icons";


export function Contact() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2">
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Let's <span className="text-accent-blue">Connect</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Interested in collaborating on a startup project? Have a
                question about my work? Let's chat!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {/* <Button variant="outline" size="lg" asChild>
                  <Link
                    href="mailto:hello@example.com"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Email Me
                  </Link>
                </Button> */}
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
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="https://x.com/chand1012"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SiX className="h-5 w-5" />
                    X
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
