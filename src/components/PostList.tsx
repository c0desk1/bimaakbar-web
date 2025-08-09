// components/ui/PostList.tsx
"use client"

import { useState } from "react"
import Card from "@/components/ui/Card"
import CardSkeleton from "@/components/ui/CardSkeleton"
import Link from "next/link"
import { PostMeta } from "@/types"
import { Button } from "./ui/Buttons"
import AdBox from "./ui/AdBox"

type Props = {
    posts: PostMeta[];
}

  export default function PostList({ posts }: Props) {
  const [visibleCount, setVisibleCount] = useState(4)
  const maxPosts = 8

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, maxPosts))
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-8">
        {posts.slice(0, visibleCount).map((post) => (
          <Card key={post.slug} {...post} />
        ))}
      </div>
      <div className="w-full hidden md:block">
        <AdBox
          scriptSrc="//pl27383165.profitableratecpm.com/95de12b00fe17cd9b5845ff88f120760/invoke.js"
          containerId="container-95de12b00fe17cd9b5845ff88f120760"
        />
      </div>
      {visibleCount < Math.min(posts.length, maxPosts) && (
        <div className="flex justify-center mb-8">
          <Button
            onClick={showMore}
            variant="outline">
            Lihat Lebih Banyak
          </Button>
        </div>
      )}

      {posts.length > maxPosts && (
        <div className="flex justify-center">
            <Button variant="outline">
                <Link href="/blog">
                    Lihat Semua Artikel
                </Link>
            </Button>
        </div>
      )}
    </>
  )
}
