'use client';

import Card from '@/components/ui/Card';

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;
  cover?: string | null;
  featured?: boolean;
}

export default function RecentPost({ posts }: { posts: Post[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-6">Artikel Terbaru</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            slug={post.slug}
            description={post.description}
            cover={post.cover}
            category={post.category}
            date={post.date}
            featured={post.featured}
          />
        ))}
      </div>
    </section>
  );
}
