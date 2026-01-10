import axios from "axios";
import Bottleneck from "bottleneck";
import { eq } from "drizzle-orm";

import db from "@/lib/server/db";
import { articles } from "@/db/schema";

const url = "https://dev.to/api/articles";

const headers = {
  // biome-ignore lint/style/noNonNullAssertion: recommended by dev.to
  "api-key": process.env.DEV_API_KEY!,
};

// Respect dev.to rate limit: 10 requests per 30 seconds
const limiter = new Bottleneck({
  maxConcurrent: 1,
  reservoir: 6,
  reservoirRefreshAmount: 6,
  reservoirRefreshInterval: 30_000,
});

function rateLimitedGet<T>(
  requestUrl: string,
  config?: Parameters<typeof axios.get<T>>[1],
) {
  return limiter.schedule(() => axios.get<T>(requestUrl, config));
}

function logAxiosError(error: unknown, context: string) {
  if (axios.isAxiosError(error)) {
    console.error(context, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      method: error.config?.method,
      url: error.config?.url,
    });
  } else {
    console.error(context, error);
  }
}

type Article = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  language: string;
  subforem_id: number;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string | null;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  body_markdown?: string | null;
  body_html?: string | null;
  user: {
    name: string;
    username: string;
    twitter_username: string | null;
    github_username: string | null;
    user_id: number;
    website_url: string | null;
    profile_image: string;
    profile_image_90: string;
  };
  organization?: {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
    profile_image_90: string;
  };
};

type ArticlesResponse = Article[];

export async function GET(_req: Request) {
  // check if DEV_TO_BLOG_USERNAME is set. If so, fetch all the blog posts
  const devToBlogUsername = process.env.DEV_TO_BLOG_USERNAME;
  if (!devToBlogUsername) {
    return new Response("DEV_TO_BLOG_USERNAME is not set", { status: 400 });
  }

  let response: Awaited<ReturnType<typeof axios.get<ArticlesResponse>>>;
  try {
    response = await rateLimitedGet<ArticlesResponse>(
      `${url}?username=${devToBlogUsername}`,
      { headers },
    );
  } catch (error) {
    logAxiosError(error, "Failed to fetch blog posts:");
    return new Response("Failed to fetch blog posts", { status: 500 });
  }

  // for each blog post, check if it exists in the database OR if the edited_at is newer than the edited_at in the database
  // if it doesn't exist or if the edited_at is newer, insert or update the blog post
  for (const blogPost of response.data) {
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.id, blogPost.id));
    const existing = rows[0];

    const newEditedAtMs = blogPost?.edited_at
      ? Date.parse(blogPost.edited_at)
      : undefined;

    if (!existing) {
      // now we need to get the body. Use the url and add /<id> to get the markdown body
      let bodyResponse: Awaited<ReturnType<typeof axios.get<Article>>>;
      try {
        bodyResponse = await rateLimitedGet<Article>(`${url}/${blogPost.id}`, {
          headers,
        });
      } catch (error) {
        // log the full response and continue
        logAxiosError(
          error,
          `Failed to fetch body for blog post ${blogPost.id}:`,
        );
        continue;
      }

      const userBlob = {
        name: blogPost.user.name,
        username: blogPost.user.username,
        twitterUsername: blogPost.user.twitter_username ?? "",
        githubUsername: blogPost.user.github_username ?? "",
        userId: blogPost.user.user_id,
        websiteUrl: blogPost.user.website_url ?? "",
        profileImage: blogPost.user.profile_image,
        profileImage90: blogPost.user.profile_image_90,
      };

      const organizationBlob = blogPost.organization
        ? {
            name: blogPost.organization.name,
            username: blogPost.organization.username,
            profileImage: blogPost.organization.profile_image,
            profileImage90: blogPost.organization.profile_image_90,
          }
        : {
            name: "",
            username: "",
            profileImage: "",
            profileImage90: "",
          };

      await db.insert(articles).values({
        id: blogPost.id,
        title: blogPost.title,
        description: blogPost.description,
        canonicalUrl: `https://dev.to/${devToBlogUsername}/${blogPost.slug}`,
        publishedTimestamp: blogPost.published_timestamp,
        editedAt: newEditedAtMs ?? Date.now(),
        readingTimeMinutes: blogPost.reading_time_minutes,
        tags: blogPost.tags,
        content: bodyResponse.data.body_markdown ?? "",
        user: userBlob,
        organization: organizationBlob,
      });
    } else if (
      newEditedAtMs &&
      typeof existing.editedAt !== "undefined" &&
      newEditedAtMs > Number(existing.editedAt)
    ) {
      // fetch latest body for updates as well
      let bodyResponse: Awaited<ReturnType<typeof axios.get<Article>>>;
      try {
        bodyResponse = await rateLimitedGet<Article>(`${url}/${blogPost.id}`, {
          headers,
        });
      } catch (error) {
        logAxiosError(
          error,
          `Failed to fetch body for blog post ${blogPost.id}:`,
        );
        continue;
      }

      const userBlob = {
        name: blogPost.user.name,
        username: blogPost.user.username,
        twitterUsername: blogPost.user.twitter_username ?? "",
        githubUsername: blogPost.user.github_username ?? "",
        userId: blogPost.user.user_id,
        websiteUrl: blogPost.user.website_url ?? "",
        profileImage: blogPost.user.profile_image,
        profileImage90: blogPost.user.profile_image_90,
      };

      const organizationBlob = blogPost.organization
        ? {
            name: blogPost.organization.name,
            username: blogPost.organization.username,
            profileImage: blogPost.organization.profile_image,
            profileImage90: blogPost.organization.profile_image_90,
          }
        : {
            name: "",
            username: "",
            profileImage: "",
            profileImage90: "",
          };

      await db
        .update(articles)
        .set({
          title: blogPost.title,
          description: blogPost.description,
          canonicalUrl: `https://dev.to/${devToBlogUsername}/${blogPost.slug}`,
          publishedTimestamp: blogPost.published_timestamp,
          editedAt: newEditedAtMs,
          readingTimeMinutes: blogPost.reading_time_minutes,
          tags: blogPost.tags,
          content: bodyResponse?.data?.body_markdown ?? existing.content,
          user: userBlob,
          organization: organizationBlob,
        })
        .where(eq(articles.id, blogPost.id));
    }
  }

  return Response.json({ count: response.data.length });
}
