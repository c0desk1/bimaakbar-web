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
        (p.category === data.category ||
          p.tags?.some((tag) => data.tags?.includes(tag)))
    )
    .slice(0, 3)

  return (
    <main className="py-16 max-w-4xl mx-auto gap-2">
      <ReadingProgress />
      <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: data.title },
      ]} />
      <article className="prose">
        <div className="flex flex-col items-center text-md text-[var(--muted)] gap-1 mb-4">
          <div className="flex w-full items-center gap-2">
            {data.category && (
              <span className="px-2 py-0.5 text-sm rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]">
                {data.category}
              </span>
            )}
            <span>{data.author}</span>
          </div>
          <h1 className="w-full font-bold">{data.title}</h1>
          <div className="flex w-full items-center gap-4">
            {data.readingTime && (
              <div className="flex flex-1 items-center gap-1 mb-1 text-md">
                <svg
                  aria-label="Waktu baca"
                  width={14}
                  height={14}
                  stroke="var(--foreground)"
                  className="block items-center">
                  <use href="/images/icons.svg#clock" />
                </svg>
                <span>{data.readingTime}</span>
              </div>
            )}
            {data.lastModified && (
              <div className="flex flex-shrink-0 items-center gap-1 text-md">
                <svg
                  width={14}
                  height={14}
                  stroke="var(--foreground)"
                  className="block items-center">
                  <use href="/images/icons.svg#calender" />
                </svg>
                <span>{data.date}</span>
              </div>
            )}
          </div>
        </div>
        {data.cover && (
          <>
            <Image
              src={data.cover}
              alt={data.title}
              width={1280}
              height={720}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </>
        )}
        <div className="prose dark:prose-invert">
          <MDXRemote source={content} components={components} />
        </div>
        {data.tags?.map((tag: string) => (
          <span key={tag} className="px-2 py-1 text-xs rounded bg-[var(--background)] border border-[var(--border)] gap-4">
            #{tag}
          </span>
        ))}
      </article>
		<span className="text-sm text-[var(--muted)]">Terakhir diubah: {data.lastModified}</span>
      <ShareButtons title={data.title} />
      {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Postingan Terkait</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((post) => (
                <Card
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  cover={post.cover}
                  category={post.category}
                  readingTime={post.readingTime}
                />
              ))}
            </div>
          </div>
        )}
      <div className="mt-10 pt-6 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4">
        {prev ? (
          <Link href={`/blog/${prev.slug}`}
            className="group flex flex-col items-start p-4">
            <span className="text-xs text-[var(--muted)]">Sebelumnya</span>
            <span className="text-[var(--muted)] font-medium group-hover:text-[var(--foreground)] line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col items-end text-right p-4"
          >
            <span className="text-xs text-[var(--muted)]">Selanjutnya</span>
            <span className="text-[var(--muted)] font-medium group-hover:text-[var(--foreground)] line-clamp-2">
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
