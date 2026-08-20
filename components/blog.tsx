import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getLatestPosts } from "@/lib/devto";

export async function Blog() {
  const posts = await getLatestPosts(3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="blog"
      className="scroll-mt-16 bg-muted/30 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-heading">
          <div>
            <p className="section-kicker text-[var(--accent-red)]">
              Technical writing
            </p>
            <h2 className="section-title">
              How I think about{" "}
              <span className="text-[var(--accent-red)]">
                systems and products
              </span>
            </h2>
          </div>
          <p className="section-summary">
            Practical notes on architecture, agentic development, and shipping
            software in real conditions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.url}
              className="border-2 hover:border-[var(--accent-red)]/50 transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} min
                  </div>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read on Dev.to <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link
              href="https://dev.to/chand1012"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Posts on Dev.to
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
