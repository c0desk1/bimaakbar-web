import Link from "next/link"
import Image from "next/image"
import {PostMeta} from "@/types"

export default function Card({
  slug,
  title,
  excerpt,
  cover,
  category,
  readingTime,
}: PostMeta) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-xl border border-[var(--border)] hover:bg-[var(--accent)] hover:shadow-md transition overflow-hidden bg-[var(--background)]">
      {cover && (
        <div className="w-full h-48 overflow-hidden">
          <Image
            src={cover}
            alt={title}
            width={400}
            height={225}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-2">
          {category && (
            <span className="border border-[var(--border)] text-[var(--foreground)] px-2 py-1">
              {category}
            </span>
          )}
          {readingTime && <span>• {readingTime}</span>}
        </div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          {title}
        </h2>
        <p className="text-sm text-[var(--muted)] line-clamp-3">{excerpt}</p>
      </div>
    </Link>
  )
}
