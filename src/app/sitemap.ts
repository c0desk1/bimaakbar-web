// src/app/sitemap.ts

import { getAllPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  return [...staticEntries, ...postEntries];
}