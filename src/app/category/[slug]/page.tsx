import { getAllPosts } from "@/lib/posts"
import type { PostMeta } from "@/types"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Hero from "@/components/ui/Hero"
import CategoryPostList from "@/components/CategoryPostList"
import { capitalizeFirstLetter } from "@/lib/utils"
import { siteConfig } from "@/config"

type Params = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = (await params).slug
  return {
    title: `${capitalizeFirstLetter(slug)}`,
    description: `Artikel dalam kategori ${capitalizeFirstLetter(slug)}.`,
    alternates: {
      canonical: `${siteConfig.url}/tags/${(slug)}`,
    },
    openGraph: {
      title: `${capitalizeFirstLetter(slug)}`,
      description: `Artikel dalam kategori ${capitalizeFirstLetter(slug)}.`,
      url: `${siteConfig.url}/tags/${(slug)}`,
      siteName: siteConfig.name,
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalizeFirstLetter(slug)}`,
      description: `Artikel dalam kategori ${capitalizeFirstLetter(slug)}.`,
    },
  }
}

export default async function CategoryPage({ params }: Params) {
  const allPosts = await getAllPosts()
  const slug = (await params).slug.toLowerCase()

  const filteredPosts = allPosts.filter(
    (post: PostMeta) => post.category?.toLowerCase() === slug
  )

  if (filteredPosts.length === 0) return notFound()

  return (
    <section className="py-12">
      <Hero
        title={capitalizeFirstLetter(slug)}
        description={`Postingan dan artikel berdasarkan ${capitalizeFirstLetter(slug)}`}
        align="left"
      />
      <CategoryPostList posts={filteredPosts} initialCount={6} />
    </section>
  )
}
