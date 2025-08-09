import { Metadata } from "next"
import { siteMetadata } from "@/lib/metadata"
import { getAllPosts } from "@/lib/posts"
import BlogPostListProps from "../../components/BlogPostList"


export const metadata: Metadata = {
  ...siteMetadata,
  title: "Blog",
  description: "Daftar postingan artikel blog.",
  alternates: {
    ...siteMetadata.alternates,
    canonical: `${siteMetadata.metadataBase}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Daftar postingan artikel blog.",
    images: [`${siteMetadata.metadataBase}/assets/og/bimaakbar-og-blog.webp`],
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <BlogPostListProps posts={posts} />
  )
}
