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
        (p.category === data.category ||
          p.tags?.some((tag) => data.tags?.includes(tag)))
    )
    .slice(0, 3)

  return (
    <main className="py-14 gap-6 mx-auto">
      <ReadingProgress />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: data.title },
        ]}
      />
      <h1 className="text-[var(--foreground)] text-center text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
        {data.title}
      </h1>
      <div className="flex justify-center items-center gap-2 text-sm text-[var(--muted-foreground)] px-4 mb-16">
        <Image
          src="/web-app-manifest-192x192.png"
          alt="Author"
          width={24}
          height={24}
          className="rounded-full border border-[var(--border)]"
        />
        <span>{data.author}</span>
        <span className="opacity-60">{data.category}</span>
      </div>
      <div className="flex w-full justify-between text-sm text-[var(--muted-foreground)] mb-4">
        <div className="flex items-center gap-1">
          <svg width={16} height={16} stroke="currentColor" className="opacity-80">
            <use href="/images/icons.svg#clock" />
          </svg>
          <span>{data.readingTime}</span>
        </div>
        <time dateTime={data.date}>{formatDate(data.date)}</time>
      </div>
      {data.cover && (
        <div className="hidden px-4 mb-8">
          <Image
            src={data.cover}
            alt={data.title}
            width={1200}
            height={630}
            className="w-full mx-auto max-w-screen-md h-auto rounded-xl border border-[var(--border)]"
            priority
          />
        </div>
        
      )}
      <article className="prose">
        <MDXRemote source={content} components={components} />
      </article>
      <div className="flex flex-col md:flex-row w-full items-center py-6 mb-8 gap-4">
        <div className="flex-1">
          {data.lastModified && (
            <time
              className="text-sm text-[var(--muted-foreground)]"
              dateTime={data.lastModified}>
              Terakhir diubah: {formatDate(data.lastModified)}
            </time>
          )}
        </div>
        <div className="flex-shrink-0">
          {data.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-sm text-[var(--muted-foreground)] rounded-xl bg-[var(--background)] border border-[var(--border)]">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <ShareButtons title={data.title} />
      {related.length > 0 && (
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Postingan Terkait</h2>
          <div className="grid md:grid-cols-3 gap-6">
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

      <div className="mt-10 pt-6 border-t border-[var(--border)] border-dashed grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <BackToTop />
    </main>
  )
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}