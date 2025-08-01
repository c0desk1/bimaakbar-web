import { getAllPosts } from "@/lib/mdx"
import Card from "@/components/ui/Card"
import Hero from "@/components/ui/Hero"

export default async function HomePage() {
  const posts = getAllPosts()

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  const trendingPosts = posts.slice(0, 4)

  return (
    <main className="relative py-16 gap-6 border-x border-[var(--border)]">
      <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 pointer-events-none bg-[repeating-linear-gradient(to bottom, var(--border), var(--border) 4px, transparent 4px, transparent 8px)] opacity-40" />
        <section>
          <Hero />
        </section>
        <div className="relative w-full h-10 my-12">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_8px)] opacity-20 pointer-events-none" />
          <div className="absolute left-0 top-0 h-full w-px bg-[var(--border)]" />
          <div className="absolute right-0 top-0 h-full w-px bg-[var(--border)]" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-[repeating-linear-gradient(to bottom,var(--border),var(--border)_4px,transparent_4px,transparent_8px)] transform -translate-x-1/2" />
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Trending</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingPosts.map((post) => (
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
        </section>
        <div className="relative w-full h-10 my-12">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_8px)] opacity-20 pointer-events-none" />
          <div className="absolute left-0 top-0 h-full w-px bg-[var(--border)]" />
          <div className="absolute right-0 top-0 h-full w-px bg-[var(--border)]" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-[repeating-linear-gradient(to bottom,var(--border),var(--border)_4px,transparent_4px,transparent_8px)] transform -translate-x-1/2" />
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-6">Terbaru</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
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
        </section>
      </div>
    </main>
  )
}