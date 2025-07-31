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
    <main className="py-16 gap-6">
      <section>
        <Hero />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Trending</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section>
        <h2 className="text-2xl font-bold mb-6">Terbaru</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </main>
  );
}
