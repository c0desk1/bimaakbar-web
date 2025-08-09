"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import { useRouter } from "next/navigation"
import { PostMeta } from "@/types"
import Hero from "@/components/ui/Hero"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import Card from "@/components/ui/Card"
import { Button } from "@/components/ui/Buttons"
import AdBox from '@/components/ui/AdBox'
import CardSkeleton from "@/components/ui/CardSkeleton"

interface BlogPostListProps {
  posts: PostMeta[]
}

export default function BlogListClient({ posts }: BlogPostListProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const categories = useMemo(() => {
    const allCategories = posts.map((p) => p.category).filter(Boolean)
    return [...new Set(allCategories as string[])]
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

  const handleLoadMore = () => {
    if (visibleCount >= 8 && selectedCategory) {
      router.push(`/category/${selectedCategory}`)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4)
      setLoading(false)
    }, 800)
  }

  return (
    <section className="relative mt-14 mb-14">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      <Hero title="Blog" description="Jelajahi artikel dan postingan lainnya." align="left" />
      <div className="mb-6">
        <input
          type="search"
          placeholder="Cari..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-1 border border-[var(--border)] rounded-xl bg-[var(--background)] focus:ring-1 ring-[var(--accent)]"
        />
      </div>
      <div className="md:hidden block max-w-[468px] w-auto">
        <AdBox adKey="bf6f85746fe8f2ec32585d28c26e841a" width={300} height={250} />
      </div>
      <div className="md:block hidden max-w-[728] w-auto">
        <AdBox adKey="177b7537aa75413ec5727808a5a52b49" width={728} height={90} />
      </div>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)} active={selectedCategory === null}>
            Semua
          </Button>
          {categories.map((cat) => (
            <Button
              variant="outline"
              size="sm"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              active={selectedCategory === cat}
            >
              {cat}
            </Button>
          ))}
        </div>
      )}
      {visiblePosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-16">
            {visiblePosts.map((post) => (
              <Card key={post.slug} {...post} />
            ))}
            <div className="w-full hidden md:block">
              <AdBox
                scriptSrc="//pl27383165.profitableratecpm.com/95de12b00fe17cd9b5845ff88f120760/invoke.js"
                containerId="container-95de12b00fe17cd9b5845ff88f120760"
              />
            </div>
            {loading &&
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={`skeleton-${i}`} />)}
          </div>
          {visibleCount < filteredPosts.length && (
            <div className="flex justify-center mt-8 px-4">
              <Button onClick={handleLoadMore} variant="outline">
                {visibleCount >= 8 && selectedCategory
                  ? "Lihat Semua di Kategori"
                  : "Tampilkan Lebih Banyak"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-2xl text-center items-center justify-center w-full text-[var(--muted-foreground)]">
          Tidak ada postingan.
        </p>
      )}
    </section>
  )
}
