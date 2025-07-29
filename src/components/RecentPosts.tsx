'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { fetchBlog } from '../utils/fetchBlog';
import SkeletonCard from './ui/SkeletonCard';

export default function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog().then((posts) => {
      const sorted = posts
      .filter((post) => post.status?.toUpperCase() === 'PUBLISHED' && post.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
      setRecentPosts(sorted);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SkeletonCard/>;}

  return (
    <section className="w-full py-6">
      {recentPosts.length === 0 ? (
        <p className="text-lg text-center text-[var(--color-muted)]/50">Tidak ada postingan terbaru.</p>
      ) : (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--color-fg)]">Terbaru</h2>
          <a href="/blog" className="text-sm hover:text-[var(--color-fg)] text-[var(--color-muted)] hover:bg-[var(--color-hover)] py-2 px-3 rounded-full">
            Semua Postingan
          </a>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
            {recentPosts.map((post, index) => (
              <li key={`${post.id || post.title}-${index}`}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}