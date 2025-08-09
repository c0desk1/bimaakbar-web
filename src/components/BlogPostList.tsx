"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import { PostMeta } from "@/types"
import Hero from "@/components/ui/Hero"
import {Breadcrumb} from "@/components/ui/Breadcrumb"
import Card from "@/components/ui/Card"
import { Button } from "@/components/ui/Buttons"
import AdBox from '@/components/ui/AdBox'

interface BlogPostListProps {
  posts: PostMeta[]
}

export default function BlogListClient({ posts }: BlogPostListProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)

  const categories = useMemo(() => {
    const allCategories = posts.map((p) => p.category)
    const validCategories = allCategories.filter(cat => cat)
    return [...new Set(validCategories as string[])]
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
    <section className="relative mt-22 mb-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <section>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
        />
        <Hero
            title="Blog"
            description="Jelajahi artikel dan postingan lainnya."
            align="left"
          />
        <div className="mb-6">
          <input
            type="search"
            placeholder="Cari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-1 border border-[var(--border)] rounded-xl bg-[var(--background)] focus:ring-1 ring-[var(--accent)]"
          />
        </div>
        <div className="md:hidden block max-w-[468px] items-center">
          <AdBox adKey="bf6f85746fe8f2ec32585d28c26e841a" width={300} height={250} /> 
        </div>
        <div className="md:block hidden max-w-[728] items-center">
          <AdBox adKey="177b7537aa75413ec5727808a5a52b49" width={728} height={90} />
        </div>   
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              active={selectedCategory === null}>
              Semua
            </Button>
            {categories.map((cat) => (
              <Button
                variant="outline"
                size="sm"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                active={selectedCategory === cat}>
                {cat}
              </Button>
            ))}
          </div>
        )}
        {visiblePosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-16">
              {visiblePosts.map((post) => (
                <Card
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  coverImage={post.coverImage}
                  category={post.category}
                />
              ))}
            </div>
            {visibleCount < filteredPosts.length && (
              <div className="flex justify-center mt-8 px-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="px-6 py-2 bg-[var(--card)] text-[var(--accent)] rounded-full hover:opacity-80">
                  Tampilkan Lebih Banyak
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-xl text-center items-center justify-center w-full text-[var(--muted-foreground)]">
            Tidak ada postingan.
          </p>
        )}
      </section>
    </section>
  )
}
