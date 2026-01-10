// Dev.to API types and fetching utilities

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string[];
  url: string;
  cover_image: string | null;
  reading_time_minutes: number;
  slug: string;
}

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  tags: string[];
  url: string;
  coverImage: string | null;
  readingTime: number;
}

const DEVTO_API_BASE = "https://dev.to/api";
const DEVTO_USERNAME = "chand1012";

export async function getLatestPosts(count = 3): Promise<BlogPost[]> {
  try {
    const response = await fetch(
      `${DEVTO_API_BASE}/articles?username=${DEVTO_USERNAME}&per_page=${count}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch dev.to articles:", response.status);
      return [];
    }

    const articles: DevToArticle[] = await response.json();

    return articles.map((article) => ({
      title: article.title,
      description: article.description,
      date: article.published_at,
      tags: article.tag_list,
      url: article.url,
      coverImage: article.cover_image,
      readingTime: article.reading_time_minutes,
    }));
  } catch (error) {
    console.error("Error fetching dev.to articles:", error);
    return [];
  }
}
