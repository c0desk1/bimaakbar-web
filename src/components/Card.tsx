import { formatDate, truncateText } from "../lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">
  pill?: boolean
}

export default function Card({ entry, pill }: Props) {
  return (
    <a href={`/${entry.collection}/${entry.slug}`} className="group flex flex-row justify-between h-full items-center text-left p-4 gap-2 border rounded-xl bg-[var(--color-bg)] hover:bg-[var(--color-hover)] border-[var(--color-border)]">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex flex-wrap items-center gap-2">
          {pill &&
            <div className="text-sm capitalize px-2 py-0.5 rounded-full border border-[var(--color-border)]">
              {entry.collection === "blog" ? "post" : "project"}
            </div>
          }
          <div className="text-sm uppercase text-[var(--color-muted)]">
            {formatDate(entry.data.date)}
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
            <li key={tag} className="text-center text-xs uppercase px-2 py-1 rounded-lg text-[var(--color-fg)] border border-[var(--color-border)]">
              {truncateText(tag, 20)}
            </li>
          ))}
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="w-5 h-5 shrink-0 stroke-current group-hover:stroke-[var(--color-fg)]">
        <line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        <polyline points="12 5 19 12 12 19" className="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
      </svg>
    </a>
  )
}