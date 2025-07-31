"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import Card from "@/components/ui/Card"
import { PostMeta } from "@/types"

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
    <main className="py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Cari..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-2 py-1 border border-[var(--border)] rounded-full bg-[var(--background)]"
        />
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-2 py-0.5 rounded-full border border-[var(--border)] ${
              selectedCategory === null
                ? "bg-[var(--background)] text-[var(--foreground)]"
                : "bg-[var(--hover)] text-[var(--foreground)]"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded-full border border-[var(--border)] ${
                selectedCategory === cat
                  ? "bg-[var(--background)] text-[var(--foreground)]"
                  : "bg-[var(--hover)] text-[var(--muted)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Post List */}
      <div className="grid md:grid-cols-3 gap-6">
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
          <p className="text-[var(--muted)]">Artikel tidak ditemukan.</p>
        )}
      </div>

      {/* Load More */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2 bg-[var(--background)] text-[var(--accent)] rounded-full hover:opacity-80"
          >
            Tampilkan Lebih Banyak
          </button>
        </div>
      )}
    </main>
  )
}