import { getAllPosts } from "@/lib/mdx"
import BlogListClient from "./BlogListClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Kebijakan privasi situs Bima Akbar terkait pengumpulan, penggunaan, dan perlindungan data pengguna.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <BlogListClient posts={posts} />
  )
}
