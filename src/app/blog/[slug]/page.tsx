import Link from "next/link"
import Image from "next/image"
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ShareButtons from "@/components/ui/ShareButtons"
import Card from "@/components/ui/Card"
import ReadingProgress from "@/components/ui/ReadingProgress"
import BackToTop from "@/components/ui/BackToTop"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"

const components = {
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className="px-3 py-1 bg-[var(--accent)] text-[var(--foreground)] rounded hover:opacity-80"
    />
  ),
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
        (p.category === data.category || p.tags?.some((tag) => data.tags?.includes(tag)))
    )
    .slice(0, 3)

  return (
    <main className="py-16 max-w-4xl mx-auto">
      <ReadingProgress />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: data.title },
        ]}
      />

      <article className="prose">
        {/* Meta section */}
        <div className="flex flex-col gap-2 mb-4 text-[var(--muted)] text-sm">
          <div className="flex items-center gap-2">
            {data.category && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">
                {data.category}
              </span>
            )}
            <span>{data.author}</span>
          </div>

          <h1 className="w-full text-3xl font-bold text-[var(--foreground)]">{data.title}</h1>

          <div className="flex flex-wrap items-center gap-4">
            {data.readingTime && (
              <div className="flex items-center gap-1">
                <svg width={14} height={14} stroke="var(--foreground)">
                  <use href="/images/icons.svg#clock" />
                </svg>
                <span>{data.readingTime}</span>
              </div>
            )}

            {data.date && (
              <div className="flex items-center gap-1">
                <svg width={14} height={14} stroke="var(--foreground)">
                  <use href="/images/icons.svg#calender" />
                </svg>
                <time dateTime={data.date}>{formatDate(data.date)}</time>
              </div>
            )}
          </div>
        </div>

        {/* Cover */}
        {data.cover && (
          <Image
            src={data.cover}
            alt={data.title}
            width={1280}
            height={720}
            loading="lazy"
            className="w-full h-auto object-cover rounded-md"
          />
        )}

        {/* MDX Content */}
        <div className="prose dark:prose-invert">
          <MDXRemote source={content} components={components} />
        </div>

        {/* Tags */}
        {Array.isArray(data.tags) && data.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded bg-[var(--background)] border border-[var(--border)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Last Modified */}
      {data.lastModified && (
        <time
          className="block mt-6 text-sm text-[var(--muted)]"
          dateTime={data.lastModified}
        >
          Terakhir diubah: {formatDate(data.lastModified)}
        </time>
      )}

      {/* Share */}
      <ShareButtons title={data.title} />

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Postingan Terkait</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((post) => (
              <Card key={post.slug} {...post} />
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="mt-10 pt-6 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4">
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className="group flex flex-col items-start p-4">
            <span className="text-xs text-[var(--muted)]">Sebelumnya</span>
            <span className="font-medium group-hover:text-[var(--foreground)] line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/blog/${next.slug}`} className="group flex flex-col items-end text-right p-4">
            <span className="text-xs text-[var(--muted)]">Selanjutnya</span>
            <span className="font-medium group-hover:text-[var(--foreground)] line-clamp-2">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <BackToTop />
    </main>
  )
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}