import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { PostMeta } from "@/types"

interface PageFrontMatter {
  title: string
  layout?: string
  coverImage?: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const fileNames = await fs.readdir(postsDirectory)
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = await fs.readFile(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        ...(data as PostMeta),
        slug,
      }
    })
  )

  return posts
    .filter((post) => post.publish)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<{ content: string; data: PostMeta }> {
  const realSlug = slug.replace(/\.(md|mdx)$/, "")
  const mdPath = path.join(postsDirectory, `${realSlug}.md`)
  const mdxPath = path.join(postsDirectory, `${realSlug}.mdx`)

  let fullPath = ''
  if (await fileExists(mdPath)) {
    fullPath = mdPath
  } else if (await fileExists(mdxPath)) {
    fullPath = mdxPath
  } else {
    throw new Error(`Post not found: ${realSlug}`)
  }

  const fileContents = await fs.readFile(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    content: contentHtml,
    data: {
      ...(data as PostMeta),
      slug: realSlug,
    },
  }
}

export async function getAdjacentPosts(slug: string): Promise<{
  prev: PostMeta | null
  next: PostMeta | null
}> {
  const posts = await getAllPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  const prev = index > 0 ? posts[index - 1] : null
  const next = index < posts.length - 1 ? posts[index + 1] : null

  return { prev, next }
}

export async function getPageBySlug(slug: string): Promise<{
  content: string
  data: PageFrontMatter
}> {
  const filePath = path.join(process.cwd(), `content/pages/${slug}.md`)
  const fileContents = await fs.readFile(filePath, "utf8")

  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    content: contentHtml,
    data: data as PageFrontMatter,
  }
}