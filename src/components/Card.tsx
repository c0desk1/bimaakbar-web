import { formatDate } from "../lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog">
}

export default function Card({ entry }: Props) {
  return (
    <a
      href={`/blog/${entry.slug}`}
      className="group flex flex-col justify-between h-full text-left p-4 gap-2 border rounded-xl bg-[var(--color-card-bg)] hover:bg-[var(--color-bg)] border-[var(--color-border)] transition-all duration-300"
    >
      <div className="flex flex-col flex-grow h-full">
        <div className="flex justify-between items-center">
          <div className="text-sm uppercase text-[var(--color-muted)]">
            {formatDate(entry.data.date)}
          </div>
          <div className="text-sm capitalize px-2 py-0.5 rounded-full border border-[var(--color-border)]">
            {entry.data.category}
          </div>
        </div>
        <div className="font-semibold mt-3 text-[var(--color-fg)] line-clamp-2">
          {entry.data.title}
        </div>
        <div className="text-sm text-[var(--color-muted)] line-clamp-2 my-2">
          {entry.data.summary}
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
      <svg
        xmlns="http:                      
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0 stroke-current group-hover:stroke-[var(--color-fg)] transition-all duration-300"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          className="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
        />
        <polyline
          points="12 5 19 12 12 19"
          className="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
        />
      </svg>
    </a>
  )
}
