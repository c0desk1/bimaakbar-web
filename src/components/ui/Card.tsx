import Link from "next/link"
import Image from "next/image"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"

export default function Card({
  slug,
  title,
  excerpt,
  date,
  cover,
  category,
  readingTime,
}: PostMeta) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-lg border border-[var(--border)] hover:bg-[var(--hover)] hover:shadow-md transition overflow-hidden bg-[var(--background)]">
      {cover && (
        <div className="w-full h-48 overflow-hidden">
          <Image
            src={cover}
            alt={title}
            width={400}
            height={225}
            priority
            className="flex-1 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-2">
          {category && (
            <span className="uppercase text-[var(--foreground)] px-2 py-1 rounded-xl border border-[var(--border)]">
              {category}
            </span>
          )}
          <time dateTime={date} className="text-sm text-[var(--muted)] line-clamp-3">
  			{formatDate(date)}
			</time>
        </div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          {title}
        </h2>
        <p className="text-sm text-[var(--muted)] line-clamp-3 mb-2">{excerpt}</p>
        {readingTime && ( 
            <div className="flex items-center gap-1 text-[var(--muted)] text-sm">
              <svg
                width={14}
                height={14}
                stroke="var(--muted)"
                className="items-center">
                <use href="/images/icons.svg#clock" />
              </svg>
              <span>{readingTime}</span>
            </div> 
          )}
      </div>
    </Link>
  )
}
