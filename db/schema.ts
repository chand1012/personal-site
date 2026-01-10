import { sql } from "drizzle-orm";
import { int, sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

/*
Example data
{
    "type_of": "article",
    "id": 2640437,
    "title": "Using LLMs in 3 lines of Python",
    "description": "When working with LLMs, the first thing people generally install is the openai or anthropic packages,...",
    "readable_publish_date": "Jun 30",
    "slug": "using-llms-in-3-lines-of-python-gm1",
    "path": "/timesurgelabs/using-llms-in-3-lines-of-python-gm1",
    "url": "https://dev.to/timesurgelabs/using-llms-in-3-lines-of-python-gm1",
    "comments_count": 0,
    "public_reactions_count": 0,
    "collection_id": null,
    "published_timestamp": "2025-06-30T19:26:33Z",
    "language": "en",
    "subforem_id": 1,
    "positive_reactions_count": 0,
    "cover_image": "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffn4dj983sr6dvfbz1eln.png",
    "social_image": "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffn4dj983sr6dvfbz1eln.png",
    "canonical_url": "https://dev.to/timesurgelabs/using-llms-in-3-lines-of-python-gm1",
    "created_at": "2025-06-30T19:26:33Z",
    "edited_at": "2025-08-07T16:15:10Z",
    "crossposted_at": null,
    "published_at": "2025-06-30T19:26:33Z",
    "last_comment_at": "2025-06-30T19:26:33Z",
    "reading_time_minutes": 7,
    "tag_list": [
      "python",
      "ai",
      "programming",
      "tutorial"
    ],
    "tags": "python, ai, programming, tutorial",
    "user": {
      "name": "Chandler",
      "username": "chand1012",
      "twitter_username": "Chand1012Dev",
      "github_username": "chand1012",
      "user_id": 409814,
      "website_url": "https://www.chand1012.dev/",
      "profile_image": "https://media2.dev.to/dynamic/image/width=640,height=640,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F409814%2F43c052c9-1ce8-49ca-b192-ab443244d244.jpg",
      "profile_image_90": "https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F409814%2F43c052c9-1ce8-49ca-b192-ab443244d244.jpg"
    },
    "organization": {
      "name": "TimeSurge Labs",
      "username": "timesurgelabs",
      "slug": "timesurgelabs",
      "profile_image": "https://media2.dev.to/dynamic/image/width=640,height=640,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F7143%2Fe7c9d9c4-af8c-4e7c-b9e6-8e87fd478ce2.png",
      "profile_image_90": "https://media2.dev.to/dynamic/image/width=90,height=90,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F7143%2Fe7c9d9c4-af8c-4e7c-b9e6-8e87fd478ce2.png"
    }
  }
*/

export const articles = sqliteTable("articles", {
  id: int("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  canonicalUrl: text("canonical_url").notNull(),
  publishedTimestamp: text("published_timestamp").notNull(), // iso string
  editedAt: int("edited_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  readingTimeMinutes: int("reading_time_minutes").notNull(),
  tags: text("tags").notNull(), // comma separated list of tags
  content: text("content").notNull(), // markdown. Need to get this from the api in a separate step
  // store the user and organization info as json blobs
  user: blob("user", { mode: "json" }).notNull().$type<{
    name: string;
    username: string;
    twitterUsername: string;
    githubUsername: string;
    userId: number;
    websiteUrl: string;
    profileImage: string;
    profileImage90: string;
  }>(),
  organization: blob("organization", { mode: "json" }).notNull().$type<{
    name: string;
    username: string;
    profileImage: string;
    profileImage90: string;
  }>(),
  createdAt: int("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: int("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// files table relates images from the original articles to images we've downloaded to the /uploads folder
// the file should be able to be downloaded from the next app via its id or new url. Original URL should be unique.
export const files = sqliteTable("files", {
  id: int("id").primaryKey({ autoIncrement: true }),
  path: text("path").notNull(),
  originalURL: text("original_url").notNull().unique(),
  createdAt: int("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// GitHub stats cache table
export const githubStatsCache = sqliteTable("github_stats_cache", {
  id: int("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  stats: blob("stats", { mode: "json" }).notNull(),
  cachedAt: int("cached_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  expiresAt: int("expires_at").notNull(),
});
