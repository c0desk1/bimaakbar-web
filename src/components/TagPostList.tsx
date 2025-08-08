'use client';

import { useState } from "react";
import type { PostMeta } from "@/types";
import Card from "@/components/ui/Card";
import { Button } from "./ui/Buttons";

type Props = {
  posts: PostMeta[];
  initialCount?: number;
};

export default function TagPostList({ posts, initialCount = 6 }: Props) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + initialCount);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 lg:gap-x-6 gap-y-14 md:gap-y-16 mb-8">
        {visiblePosts.map((post) => (
          <Card key={post.slug} {...post} />
        ))}
      </div>

      {visibleCount < posts.length && (
        <div className="text-center mt-6">
          <Button onClick={handleLoadMore} variant="outline">
            Tampilkan Lebih Banyak
          </Button>
        </div>
      )}
    </>
  );
}
