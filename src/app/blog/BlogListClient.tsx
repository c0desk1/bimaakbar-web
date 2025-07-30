"use client"
import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import Card from "@/components/ui/Card"

interface BlogListClientProps {
  posts: any[]
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(6) // tampil 6 artikel pertama

  // Ambil semua kategori unik
  const categories = useMemo(() => {
    const allCategories = posts
      .map((p) => p.category)
      .filter(Boolean) as string[]
    return [...new Set(allCategories)]
  }, [posts])

  // Fuse.js search
  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ["title", "excerpt", "tags", "category"],
      threshold: 0.3,
    })
  }, [posts])

  // Filter + search
  const filteredPosts = useMemo(() => {
    let result = query ? fuse.search(query).map((r) => r.item) : posts

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    return result
  }, [query, fuse, posts, selectedCategory])

  // Artikel yang ditampilkan sesuai visibleCount
  const visiblePosts = filteredPosts.slice(0, visibleCount)

  return (
    <main className="py-12 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari artikel..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-[var(--border)] rounded-md bg-[var(--background)]"
        />
      </div>

      {/* Filter kategori */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-md border ${
              selectedCategory === null
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--background)] text-[var(--foreground)]"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md border ${
                selectedCategory === cat
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--background)] text-[var(--foreground)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <Card
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              cover={post.cover}
              category={post.category}
              readingTime={post.readingTime}
            />
          ))
        ) : (
          <p className="text-[var(--muted)]">Artikel tidak ditemukan.</p>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2 bg-[var(--accent)] text-white rounded-md hover:opacity-80"
          >
            Tampilkan Lebih Banyak
          </button>
        </div>
      )}
    </main>
  )
}
