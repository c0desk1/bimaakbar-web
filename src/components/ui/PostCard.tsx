import React from "react";
import { formatDate } from "../../lib/utils";
import type { Post } from "../../types";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-[var(--border)] bg-[var(--background-card)] hover:bg-[var(--hover)] transition-colors overflow-hidden">
      {post.cover && (
        <div className="relative w-full h-40 md:h-44 lg:h-48 overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-center text-xs text-[var(--muted)] mb-2">
          <span>{formatDate(post.date)}</span>
          <span className="capitalize">{post.category}</span>
        </div>
        <h3 className="font-semibold text-[var(--foreground)] leading-snug mb-2 group-hover:underline line-clamp-2">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-sm text-[var(--muted)] line-clamp-2">
            {post.description}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase border border-[var(--border)] text-[var(--muted)] px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}