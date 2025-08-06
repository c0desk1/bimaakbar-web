// src/app/sitemap.xml/route.ts
import { getAllPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

export async function GET(): Promise<Response> {
  const posts = await getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://bimaakbar.my.id/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: "https://bimaakbar.my.id",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://bimaakbar.my.id/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://bimaakbar.my.id/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const entries = [...staticEntries, ...postEntries];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}