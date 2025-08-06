import { PostMeta } from "@/types"
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts"
import PostHeader from "@/components/post-header"
import PostBody from "@/components/post-body"
import PostFooter from "@/components/post-footer"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ReadingProgress from "@/components/ui/ReadingProgress"
import BackToTop from "@/components/ui/BackToTop"

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetail({
  params,
  }: {
  params: Promise<{ slug: string }>
  }) {
  const { slug } = await params
  const { content, data } = getPostBySlug(slug) as {
    content: string
    data: PostMeta
  }

  const { prev, next } = getAdjacentPosts(slug)

  const allPosts = getAllPosts()
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === data.category ||
          p.tags?.some((tag) => data.tags?.includes(tag)))
    )
    .slice(0, 3)

  return (
    <main className="relative mt-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <ReadingProgress />
      <section className="py-14">
        <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
        ]} />
        <PostHeader data={data} />
        <PostBody content={content} />
        <PostFooter data={data} prev={prev} next={next} related={related} />
      </section>
      <BackToTop />
    </main>
  )
}