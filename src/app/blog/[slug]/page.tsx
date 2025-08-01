import Link from "next/link"
import Image from "next/image"
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"
import Spacer from "@/components/ui/Spacer"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ShareButtons from "@/components/ui/ShareButtons"
import Card from "@/components/ui/Card"
import ReadingProgress from "@/components/ui/ReadingProgress"
import BackToTop from "@/components/ui/BackToTop"


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
    .slice(0, 6)

  return (
    
    <main className="relative border-x border-[var(--border)]">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <ReadingProgress />
      <section className="py-14">
        <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: data.category, href: "/blog" },
        ]} />
        <h1 className="px-4 text-[var(--foreground)] text-center text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
          {data.title}
        </h1>
        <div className="flex justify-center items-center gap-3 text-sm text-[var(--muted-foreground)] px-4 mb-16">
          <Image
            src="/web-app-manifest-192x192.png"
            alt="Author"
            width={16}
            height={16}
            loading="lazy"
            className="h-5 w-5 rounded-full"
          />
          <span>{data.author}</span>
          <div className="flex items-center gap-1">
            <svg width={16} height={16} stroke="var(--foreground)" className="opacity-80">
                <use href="/images/icons.svg#category" />
              </svg>
            <span className="opacity-85">{data.category}</span>
          </div>
        </div>
        <div className="flex items-center w-full justify-between text-sm text-[var(--muted-foreground)] px-4 mb-4">
          <div className="flex items-center gap-1">
            <svg width={16} height={16} stroke="var(--foreground)" className="opacity-80">
              <use href="/images/icons.svg#clock" />
            </svg>
            <span>{data.readingTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width={16} height={16} stroke="var(--foreground)" className="opacity-80">
              <use href="/images/icons.svg#calendar" />
            </svg>
            <time dateTime={data.date}>{formatDate(data.date)}</time>
          </div>
        </div>
        {data.cover && (
          <div className="hidden px-4 mb-8">
            <Image
              src={data.cover}
              alt={data.title}
              width={1200}
              height={630}
              className="w-full mx-auto max-w-screen-md h-auto"
              priority
            />
          </div>
          
        )}
        <article className="prose px-4">
          <MDXRemote source={content} components={components} />
        </article>
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 gap-4">
          {data.lastModified && (
            <time
              className="text-sm text-[var(--muted-foreground)]"
              dateTime={data.lastModified}>Terakhir diubah: {formatDate(data.lastModified)}
            </time>
          )}
          <div className="flex items-center gap-2">
            {data.tags?.map((tag: string) => (
              <div  key={tag} className="flex items-center gap-1 text-[var(--muted-foreground)] text-sm hover:text-[var(--foreground)]">
                <svg width={16} height={16} stroke="var(--foreground)">
                  <use href="/images/icons.svg#tag" />
                </svg>
                <span>{tag}</span>
              </div>
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
            <div className="grid md:grid-cols-2 border-t border-[var(--border)]">
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