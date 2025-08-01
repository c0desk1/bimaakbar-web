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
    <main className="relative py-16 px-4 sm:px-6 lg:px-8">
      {/* Bungkus konten dengan border kiri kanan */}
      <div className="relative max-w-5xl mx-auto border-x border-[var(--border)]">

        {/* Hero section */}
        <section>
          <Hero />
        </section>

        {/* Spacer visual */}
        <div className="relative w-full h-10 my-12">
          {/* Background diagonal halus */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_8px)] opacity-20 pointer-events-none" />

          {/* Garis kiri */}
          <div className="absolute left-0 top-0 h-full w-px bg-[var(--border)]" />

          {/* Garis kanan */}
          <div className="absolute right-0 top-0 h-full w-px bg-[var(--border)]" />

          {/* Garis tengah dashed */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-[repeating-linear-gradient(to bottom,var(--border),var(--border)_4px,transparent_4px,transparent_8px)] transform -translate-x-1/2" />
        </div>

        {/* Trending section */}
        <section className="mb-8 px-4 md:px-12">
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

        {/* Spacer lagi */}
        <div className="relative w-full h-10 my-12">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_8px)] opacity-20 pointer-events-none" />
          <div className="absolute left-0 top-0 h-full w-px bg-[var(--border)]" />
          <div className="absolute right-0 top-0 h-full w-px bg-[var(--border)]" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-[repeating-linear-gradient(to bottom,var(--border),var(--border)_4px,transparent_4px,transparent_8px)] transform -translate-x-1/2" />
        </div>

        {/* Terbaru section */}
        <section className="px-4 md:px-12">
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