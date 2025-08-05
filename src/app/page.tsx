import { getAllPosts } from "@/lib/posts"
import Spacer from "@/components/ui/Spacer"
import Card from "@/components/ui/Card"
import Hero from "@/components/ui/Hero"

export default async function HomePage() {
  const posts = getAllPosts()

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  const trendingPosts = posts.slice(0, 4)

  return (
    <main className="relative border-x border-[var(--border)] mt-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <section className="py-14">
        <section className="border-y border-[var(--border)]">
          <Hero />
        </section>
        <Spacer />
        <section className="items-center border-t border-[var(--border)]">
          <h2 className="px-4 py-2 text-2xl font-bold">Trending</h2>
          <div className="grid md:grid-cols-3 border-t border-[var(--border)]">
            {trendingPosts.map((post) => (
              <Card
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
                category={post.category} />
            ))}
          </div>
        </section>
        <Spacer />
        <section className="items-center border-t border-[var(--border)]">
          <h2 className="px-4 py-2 text-2xl font-bold">Terbaru</h2>
          <div className="grid md:grid-cols-3 border-t border-[var(--border)]">
            {recentPosts.map((post) => (
              <Card
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.coverImage}
                category={post.category} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}