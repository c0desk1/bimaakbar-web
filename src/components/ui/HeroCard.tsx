import Link from "next/link"
import Image from "next/image"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"

export default function Card({
  slug,
  title,
  excerpt,
  date,
  coverImage,
  category,
}: PostMeta) {
  return (
    <Link href={`/blog/${slug}`}
      className="group block bg-[var(--card)] hover:bg-[var(--hover)] border-b border-[var(--border)] overflow-hidden">
      <div className="flex md:flex-col h-full w-full justify-between">
        {coverImage && (
          <div className="overflow-hidden flex-1">
            <Image
              src={coverImage}
              alt={title}
              width={400}
              height={225}
              className="w-auto h-auto"
              priority />
          </div>
        )}
        <div className="flex flex-col items-center text-sm mb-2 text-start">
          {category && (
            <span className="uppercase text-[var(--foreground)] px-2 py-1 rounded-xl border border-[var(--border)]">
              {category}
            </span>
          )}
          <time dateTime={date} className="text-sm text-[var(--muted-foreground)] line-clamp-3">
            {formatDate(date)}
          </time>
          <h2 className="font-semibold text-[var(--foreground)] mb-2">
            {title}
          </h2>
          <p className="text-[var(--muted-foreground)] line-clamp-3">{excerpt}</p>
        </div>
      </div>
    </Link>
  )
}
