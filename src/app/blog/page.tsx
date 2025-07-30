import { getAllPosts } from "@/lib/mdx"
import Card from "@/components/ui/Card"

export default function BlogList() {
  const posts = getAllPosts()

  return (
    <main className="py-16 max-w-4xl mx-auto gap-4">
      <section className="py-8">
        <h1 className="text-2xl font-bold mb-6">Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              cover={post.cover}
              category={post.category}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      </section>
    </main>
    
  )
}