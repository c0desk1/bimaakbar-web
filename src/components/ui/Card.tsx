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
    <Link href={`/blog/${slug}`}
      className="group block rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--secondary)] overflow-hidden">
      {cover && (
        <div className="flex-1 w-full h-auto overflow-hidden">
          <Image
            src={cover}
            alt={title}
            width={400}
            height={225}
            priority />
        </div>
      )}
      <div className="h-full w-full p-4">
        <div className="flex w-full items-center text-xs mb-2">
          <div className="items-center flex-1">
            {category && (
              <span className="uppercase text-[var(--foreground)] px-2 py-1 rounded-xl border border-[var(--border)]">
                {category}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <time dateTime={date} className="text-sm text-[var(--muted-foreground)] line-clamp-3">
              {formatDate(date)}
            </time>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          {title}
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 mb-2">{excerpt}</p>
        {readingTime && ( 
          <div className="flex items-center text-center gap-1 text-[var(--muted-foreground)] text-md">
            <svg
              width={14}
              height={14}
              stroke="var(--muted)"
              className="items-center text-center">
              <use href="/images/icons.svg#clock" />
            </svg>
            <title>Waktu Baca</title>
            <span>{readingTime}</span>
          </div> 
        )}
      </div>
    </Link>
  )
}
