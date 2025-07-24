import type { CollectionEntry } from "astro:content";
import { formatDate } from "../lib/utils";
import SkeletonCard from './SkeletonCard.tsx';
import { useState, useEffect } from 'react';

type BlogEntry = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  cover: string;
  author: string;
  featured: string;
  status: string;
  category: string;
  lastModified: string;
  canonicalUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  date: string;
  tags: string;
};

type Props = {
  post: BlogEntry;
};

export default function PostCard({ post }: Props) {
  return (
    <a href={`/blog/${post.slug}`} className="group overflow-hidden flex flex-col justify-between h-full w-full text-left p-4 gap-2 border rounded-xl bg-[var(--color-card-bg)] hover:bg-[var(--color-bg)] border-[var(--color-border)]">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex justify-between items-center">
          <div className="text-sm uppercase text-[var(--color-muted)]">
            {formatDate(post.date)}
          </div>
          <div className="text-sm capitalize px-2 py-0.5 rounded-full border border-[var(--color-border)]">
            {post.category}
          </div>
        </div>
        <div className="font-semibold mt-3 text-[var(--color-fg)] line-clamp-2">
          {post.featured && (
            <span className="text-md text-[var(--color-accent)] mr-2">
              <i className="ri-verified-badge-line"></i>
            </span>
          )}
          {post.title}
        </div>
        <div className="text-sm text-[var(--color-muted)] line-clamp-2 my-2">
          {post.description}
        </div>
        <ul className="flex flex-wrap mt-auto gap-1">
          {post.tags.split(',').map((tag: string) => (
            <li key={tag} className="text-center text-xs uppercase px-2 py-1 rounded-lg text-[var(--color-fg)] border border-[var(--color-border)]">
              {tag.trim()}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}
