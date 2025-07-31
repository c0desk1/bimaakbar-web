// src/lib/mdx.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { PostMeta } from "@/types"

const contentPath = path.join(process.cwd(), "content", "blog")

// Format tanggal: 01 Jan 2025
function formatDate(input: string | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getPostData(filePath: string, slug: string): PostMeta {
  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)

  const stats = fs.statSync(filePath)
  const rawDate = data.date || stats.birthtime.toISOString()
  const rawModified = data.lastModified || stats.mtime.toISOString()

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: formatDate(rawDate),
    cover: data.cover || null,
    category: data.category,
    tags: data.tags || [],
    author: data.author || "Admin",
    readingTime: readingTime(content).text,
    lastModified: formatDate(rawModified),
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentPath)) return []

  return fs
    .readdirSync(contentPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const filePath = path.join(contentPath, file)
      return getPostData(filePath, slug)
    })
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(contentPath, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) throw new Error(`Post ${slug} not found`)

  const source = fs.readFileSync(filePath, "utf8")
  const { content } = matter(source)
  const data = getPostData(filePath, slug)

  return {
    content,
    data,
  }
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts()
  const index = posts.findIndex((p) => p.slug === slug)

  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }
}