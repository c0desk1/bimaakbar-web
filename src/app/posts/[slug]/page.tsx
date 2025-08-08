import { PostMeta } from "@/types"
import {
  getPostBySlug,
  getAllPosts,
  getAdjacentPosts,
} from "@/lib/posts"

import PostHeader from "@/components/post-header"
import PostBody from "@/components/post-body"
import PostFooter from "@/components/post-footer"
import {Breadcrumb} from "@/components/ui/Breadcrumb"
import ReadingProgress from "@/components/ui/ReadingProgress"
import BackToTop from "@/components/ui/BackToTop"

import type { Metadata } from "next"
import { siteConfig } from "@/config"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getPostBySlug(slug);
const imagePath =
    data.ogImage?.url || data.coverImage || "assets/og/open-graph.png";

const ogImage = imagePath.startsWith("http")
    ? imagePath
    : `${siteConfig.url}/${imagePath.replace(/^\/+/, "")}`;

  return {
    title: data.title,
    description: data.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.excerpt,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.excerpt,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetail(
  { params }: Props ) {
  const { slug } = await params
  const { content, data } = await getPostBySlug(slug) as {
    content: string
    data: PostMeta
  }

  const { prev, next } = await getAdjacentPosts(slug)

  const allPosts = await getAllPosts()
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === data.category ||
          p.tags?.some((tag) => data.tags?.includes(tag)))
    )
    .slice(0, 3)

  return (
    <section className="relative mt-22 mb-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <ReadingProgress />
      <section>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: data.title },
          ]}
        />
        <PostHeader data={data} />
        <PostBody content={content} />
        <PostFooter data={data} prev={prev} next={next} related={related} />
      </section>
      <BackToTop />
    </section>
  )
}