"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import { PostMeta } from "@/types"
import Breadcrumb from "@/components/ui/Breadcrumb"
import Card from "@/components/ui/Card"
import Spacer from "@/components/ui/Spacer"


interface BlogListClientProps {
  posts: PostMeta[]
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)

  const categories = useMemo(() => {
    const all = posts.map((p) => p.category).filter(Boolean) as string[]
    return [...new Set(all)]
  }, [posts])

  const filteredPosts = useMemo(() => {
    const fuse = new Fuse(posts, {
      keys: ["title", "excerpt", "tags", "category"],
      threshold: 0.4,
    })

    let result = query ? fuse.search(query).map((r) => r.item) : posts

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    return result
  }, [query, posts, selectedCategory])

  const visiblePosts = filteredPosts.slice(0, visibleCount)

  return (
    <main className="relative border-x border-[var(--border)] mt-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <section className="items-center py-14">
      <Breadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
        ]} />
        <h1 className="text-[var(--foreground)] text-center text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">Blog</h1>
        <div className="px-4 mb-6">
          <input
            type="search"
            placeholder="Cari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-1 border border-[var(--border)] rounded-xl bg-[var(--background)] focus:ring-1 ring-[var(--accent)]"
          />
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 px-4 pb-8 border-b border-[var(--border)]">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-2 py-0.5 rounded-xl border border-[var(--border)] ${
                selectedCategory === null
                  ? "bg-[var(--background)] text-[var(--foreground)] px-2 py-0.5"
                  : "bg-[var(--card)] text-[var(--muted-foreground)] px-2 py-0.5"
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded-xl border border-[var(--border)] ${
                  selectedCategory === cat
                    ? "bg-[var(--background)] text-[var(--foreground)] px-2 py-0.5"
                    : "bg-[var(--card)] text-[var(--muted-foreground)] px-2 py-0.5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <Spacer />
        <div className="grid md:grid-cols-2 border-t border-[var(--border)]">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post) => (
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
            ))
          ) : (
            <p className="text-center items-center text-[var(--muted-foreground)]">Tidak ada postingan.</p>
          )}
        </div>
        {visibleCount < filteredPosts.length && (
          <div className="flex justify-center mt-8 px-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2 bg-[var(--card)] text-[var(--accent)] rounded-full hover:opacity-80">
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}
      </section>
    </main>
  )
}