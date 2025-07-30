import Link from "next/link"
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ShareButtons from "@/components/ui/ShareButtons"

import ReadingProgress from "@/components/ui/ReadingProgress"
import BackToTop from "@/components/ui/BackToTop"

interface PostData {
  title: string
  excerpt?: string
  date: string
  cover?: string
  category?: string
  tags?: string[]
  author: string
  readingTime: string
  lastModified?: string
}

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
    data: PostData
  }

  const { prev, next } = getAdjacentPosts(slug)

  return (
    <main className="py-16 max-w-4xl mx-auto gap-4">
      <ReadingProgress />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: data.title },
      ]} />
      <article className="prose">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] mb-6">
          <span>{data.author}</span>

          {data.readingTime && (
            <>
              <span>•</span>
              <svg
                width={14}
                height={14}
                stroke="var(--foreground)"
                className="block"
              >
                <use href="/images/icons.svg#clock" />
              </svg>
              <span>{data.readingTime}</span>
            </>
          )}

          {data.lastModified && (
            <>
              <span>•</span>
              <svg
                width={14}
                height={14}
                stroke="var(--foreground)"
                className="block"
              >
                <use href="/images/icons.svg#calendar" />
              </svg>
              <span>Terakhir diubah: {data.lastModified}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {data.category && (
            <span className="px-2 py-1 text-xs rounded bg-[var(--hover)] text-[var(--accent)]">
              {data.category}
            </span>
          )}
        </div>
        {data.cover && (
          <div className="w-full h-64 md:h-80 mb-6 overflow-hidden rounded-lg">
            <img
              src={data.cover}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.title}</h1>
        <p className="text-sm text-[var(--muted)] mb-8">{data.date}</p>
        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote source={content} components={components} />
        </div>
        {data.tags?.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded bg-[var(--background)] border border-[var(--border)] gap-4"
          >
            #{tag}
          </span>
        ))}
        <ShareButtons title={data.title} />
      </article>
      <div className="mt-10 pt-6 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex flex-col items-start p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:shadow transition"
          >
            <span className="text-xs text-[var(--muted)]">Sebelumnya</span>
            <span className="text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col items-end text-right p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:shadow transition"
          >
            <span className="text-xs text-[var(--muted)]">Selanjutnya</span>
            <span className="text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] line-clamp-2">
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
