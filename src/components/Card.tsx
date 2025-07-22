//card.tsx
import type { CollectionEntry } from "astro:content"
import { useLoading } from "../context/LoadingContext";
import { formatDate } from "../lib/utils"
import SkeletonCard from "./SkeletonCard";


type Props = {
  entry: CollectionEntry<"blog">
}

export default function Card({ entry }: Props) {
  const { isLoading } = useLoading();

  if (isLoading) return <SkeletonCard />;
  return (
    <a
      href={`/blog/${entry.slug}`}
      className="group overflow-hidden flex flex-col justify-between h-full text-left p-4 gap-2 border rounded-xl bg-[var(--color-card-bg)] hover:bg-[var(--color-bg)] border-[var(--color-border)]">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex justify-between items-center">
          <div className="text-sm uppercase text-[var(--color-muted)]">
            {formatDate(entry.data.pubDate)}
          </div>
          <div className="text-sm capitalize px-2 py-0.5 rounded-full border border-[var(--color-border)]">
            {entry.data.category}
          </div>      
        </div>
        <div className="font-semibold mt-3 text-[var(--color-fg)] line-clamp-2">
          {entry.data.featured && (
            <span className="text-md text-[var(--color-accent)] mr-2">
                <i className="ri-verified-badge-line"></i>
            </span>
          )}
          {entry.data.title}
        </div>
        <div className="text-sm text-[var(--color-muted)] line-clamp-2 my-2">
          {entry.data.description}
        </div>
        <ul className="flex flex-wrap mt-auto gap-1">
          {entry.data.tags.map((tag: string) => (
            <li
              key={tag}
              className="text-center text-xs uppercase px-2 py-1 rounded-lg text-[var(--color-fg)] border border-[var(--color-border)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
  )
}