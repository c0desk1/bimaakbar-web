import { getAllPosts } from "@/lib/posts"
import Spacer from "@/components/ui/Spacer"
import HeroCard from "@/components/ui/HeroCard"
import Card from "@/components/ui/Card"
import Hero from "@/components/ui/Hero"

export default async function HomePage() {
  const posts = await getAllPosts()

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  const trendingPosts = sortedPosts.slice(0, 1)
  const recentPosts = sortedPosts.slice(1, 5)

  return (
    <main className="relative mt-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <section>
        <Hero />
        {trendingPosts.map((post) => (
          <HeroCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            coverImage={post.coverImage}
            category={post.category} />
        ))}
        <Spacer />
        <section>
          <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            Lainnya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-16">
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
        <Spacer />
      </section>
    </main>
  )
}
