import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  cover?: string
  category?: string
  tags?: string[]
  author?: string
  readingTime?: string
  lastModified?: string
}

const contentPath = path.join(process.cwd(), "content", "blog")

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentPath)) return []
  const files = fs.readdirSync(contentPath)

  return files.map((file) => {
    const filePath = path.join(contentPath, file)
    const source = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(source)

    const stats = fs.statSync(filePath)
    const lastModified = stats.mtime.toISOString().split("T")[0]

    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      cover: data.cover,
      category: data.category,
      tags: data.tags || [],
      author: data.author || "Admin",
      readingTime: content ? readingTime(content).text : undefined,
      lastModified: data.lastModified || lastModified || undefined,
    }
  })
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
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      cover: data.cover,
      category: data.category,
      tags: data.tags || [],
      author: data.author || "Admin",
      readingTime: readingTime(content).text,
      lastModified: data.lastModified || lastModified,
    },
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
