import { getAllPosts } from "@/lib/posts"
import BlogListClient from "./BlogListClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Kebijakan privasi situs Bima Akbar terkait pengumpulan, penggunaan, dan perlindungan data pengguna.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <BlogListClient posts={posts} />
  )
}
