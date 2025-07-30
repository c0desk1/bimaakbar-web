// src/lib/mdx.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { PostMeta } from "@/types"

const contentPath = path.join(process.cwd(), "content", "blog")

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentPath)) return []
  const files = fs.readdirSync(contentPath)

  return files.map((file) => {
    const filePath = path.join(contentPath, file)
    const source = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(source)
    const postData: Partial<PostMeta> = {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      cover: (data.cover as string) || undefined,
      category: data.category as string,
      tags: (data.tags as string[]) || [],
      author: (data.author as string) || "Admin",
      readingTime: content ? readingTime(content).text : undefined,
      lastModified: (data.lastModified as string) || undefined,
    };

    if (!postData.lastModified) {
      const stats = fs.statSync(filePath);
      postData.lastModified = stats.mtime.toISOString().split("T")[0];
    }

    return postData as PostMeta;
  });
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(contentPath, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) throw new Error(`Post ${slug} not found`)

  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)

  const stats = fs.statSync(filePath)
  const lastModified = stats.mtime.toISOString().split("T")[0]

  return {
    content,
    data: {
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      cover: (data.cover as string) || null,
      category: data.category as string,
      tags: (data.tags as string[]) || [],
      author: (data.author as string) || "Admin",
      readingTime: readingTime(content).text,
      lastModified: (data.lastModified as string) || lastModified,
    } as PostMeta,
  };
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === slug)

  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }
}