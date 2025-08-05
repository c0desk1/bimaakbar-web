import Link from "next/link"
import Image from "next/image"
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"
import PostHeader from "@/components/post-header"
import PostBody from "@/components/post-body"
import Spacer from "@/components/ui/Spacer"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ShareButtons from "@/components/ui/ShareButtons"
import Card from "@/components/ui/Card"
import ReadingProgress from "@/components/ui/ReadingProgress"
import BackToTop from "@/components/ui/BackToTop"

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
    
    <main className="relative border-x border-[var(--border)] mt-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <ReadingProgress />
      <section className="py-14">
        <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
        ]} />
        <PostHeader data={data} />
        <PostBody content={content} />
        <div className="flex flex-col md:flex-row w-full justify-between items-center py-6 px-4 gap-4">
          <div className="gap-4">
            {data.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-sm text-[var(--muted-foreground)] rounded-xl bg-[var(--background)] border border-[var(--border)] w-auto gap-4">#{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="px-4 border-y border-[var(--border)]">
          <ShareButtons title={data.title} />
        </div>
        
        {related.length > 0 && (
          <div>
            <Spacer />
            <h2 className="px-4 py-2 text-xl font-bold border-t border-[var(--border)]">Postingan Terkait</h2>
            <div className="grid md:grid-cols-3 border-t border-[var(--border)]">
              {related.map((post) => (
                <Card
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  coverImage={post.coverImage}
                  category={post.category}
                />
              ))}
            </div>
          </div>
        )}
        <Spacer />
        <div className="border-y border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col items-start text-start p-4">
              <span className="text-xs text-[var(--muted-foreground)]">Sebelumnya</span>
              <span className="text-[var(--muted-foreground)] font-medium group-hover:text-[var(--foreground)] line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col items-end text-end p-4">
              <span className="text-xs text-[var(--muted-foreground)]">Selanjutnya</span>
              <span className="text-[var(--muted-foreground)] font-medium group-hover:text-[var(--foreground)] line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
      <BackToTop />
    </main>
  )
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}