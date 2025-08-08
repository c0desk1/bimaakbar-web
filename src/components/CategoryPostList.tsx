'use client'

import { useState } from "react"
import type { PostMeta } from "@/types"
import Card from "@/components/ui/Card"
import CardSkeleton from "@/components/ui/CardSkeleton"
import { Button } from "@/components/ui/Buttons"

type Props = {
  posts: PostMeta[]
  initialCount?: number
}

export default function CategoryPostList({ posts, initialCount = 6 }: Props) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + initialCount)
      setLoading(false)
    }, 600)
  }

  const visiblePosts = posts.slice(0, visibleCount)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-8">
        {visiblePosts.map((post) => (
          <Card key={post.slug} {...post} />
        ))}

        {loading &&
          Array.from({ length: initialCount }).map((_, i) => (
            <CardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {visibleCount < posts.length && !loading && (
        <div className="text-center mt-6">
          <Button onClick={handleLoadMore} variant="outline">
            Tampilkan Lebih Banyak
          </Button>
        </div>
      )}
    </>
  )
}
