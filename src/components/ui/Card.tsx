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
}: PostMeta) {
  return (
    <Link href={`/blog/${slug}`}
      className="group block bg-[var(--card)] hover:bg-[var(--hover)] border-b border-[var(--border)] overflow-hidden">
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
        <div className="flex w-full justify-between items-center text-xs mb-2">
          {category && (
            <span className="uppercase text-[var(--foreground)] px-2 py-1 rounded-xl border border-[var(--border)]">
              {category}
            </span>
          )}
          <time dateTime={date} className="text-sm text-[var(--muted-foreground)] line-clamp-3">
            {formatDate(date)}
          </time>
        </div>
        <h2 className="font-semibold text-[var(--foreground)] mb-2">
          {title}
        </h2>
        <p className="text-[var(--muted-foreground)] line-clamp-3">{excerpt}</p>
      </div>
    </Link>
  )
}
