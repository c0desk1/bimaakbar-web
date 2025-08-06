import { Metadata } from "next"
import { siteMetadata } from "@/lib/metadata"
import { getAllPosts } from "@/lib/posts"
import BlogListClient from "./BlogListClient"


export const metadata: Metadata = {
  ...siteMetadata,
  title: "Blog",
  description: "Daftar postingan artikel blog.",
  alternates: {
    ...siteMetadata.alternates,
    canonical: `${siteMetadata.metadataBase}/blog`,
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <BlogListClient posts={posts} />
  )
}
