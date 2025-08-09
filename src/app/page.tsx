import { getAllPosts } from "@/lib/posts"
import HeroCard from "@/components/ui/HeroCard"
import Hero from "@/components/ui/Hero"
import PostList from "@/components/PostList"

export default async function HomePage() {
  const posts = await getAllPosts()

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  const trendingPosts = sortedPosts.slice(0, 1)
  const recentPosts = sortedPosts.slice(1)

  return (
    <section className="relative mt-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />

      <section>
        <Hero />
        {trendingPosts.map((post) => (
          <HeroCard key={post.slug} {...post} />
        ))}

        <section>
          <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
            Lainnya
          </h2>
          <PostList posts={recentPosts} />
        </section>
      </section>
    </section>
  )
}
