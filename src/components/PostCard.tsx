import type { CollectionEntry } from "astro:content";
import { formatDate } from "../lib/utils";
import SkeletonCard from './SkeletonCard.tsx';
import { useState, useEffect } from 'react';
import fetchBlog from '../utils/fetchBlog';

type Props = {
  // entry: CollectionEntry<"blog">;
  loading?: boolean;
};

export default function PostCard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlog();
      setBlogs(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SkeletonCard />
    );
  }

  return (
    <>
      {blogs.map((entry: any) => (
        <a href={`/blog/${entry.slug}`} className="group overflow-hidden flex flex-col justify-between h-full w-full text-left p-4 gap-2 border rounded-xl bg-[var(--color-card-bg)] hover:bg-[var(--color-bg)] border-[var(--color-border)]">
          <div className="flex flex-col flex-grow h-full">
            <div className="flex justify-between items-center">
              <div className="text-sm uppercase text-[var(--color-muted)]">
                {formatDate(entry.date)}
              </div>
              <div className="text-sm capitalize px-2 py-0.5 rounded-full border border-[var(--color-border)]">
                {entry.category}
              </div>
            </div>
            <div className="font-semibold mt-3 text-[var(--color-fg)] line-clamp-2">
              {entry.featured && (
                <span className="text-md text-[var(--color-accent)] mr-2">
                  <i className="ri-verified-badge-line"></i>
                </span>
              )}
              {entry.title}
            </div>
            <div className="text-sm text-[var(--color-muted)] line-clamp-2 my-2">
              {entry.description}
            </div>
            <ul className="flex flex-wrap mt-auto gap-1">
              {entry.tags.split(',').map((tag: string) => (
                <li key={tag} className="text-center text-xs uppercase px-2 py-1 rounded-lg text-[var(--color-fg)] border border-[var(--color-border)]">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </a>
      ))}
    </>
  );
}
