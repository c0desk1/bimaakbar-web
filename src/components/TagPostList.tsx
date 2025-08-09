'use client';

import { useState } from "react";
import type { PostMeta } from "@/types";
import Card from "@/components/ui/Card";
import { Button } from "./ui/Buttons";
import CardSkeleton from "@/components/ui/CardSkeleton"
import AdBox from "./ui/AdBox";

type Props = {
  posts: PostMeta[];
  initialCount?: number;
};

export default function TagPostList({ posts, initialCount = 6 }: Props) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [loading, setLoading] = useState(false)


  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => prev + initialCount);
      setLoading(false)
    }, 600)
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-8">
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
