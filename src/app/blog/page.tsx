import { getAllPosts } from "@/lib/mdx"
import BlogListClient from "./BlogListClient"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <BlogListClient posts={posts} />
  )
}
