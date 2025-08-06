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
    <section>
      {coverImage && (
        <div className="mb-8">
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            width={1280}
            height={720}
            className="rounded-[var(--radius)] w-full h-auto hover:shadow-lg transition-shadow duration-200"
            priority
          />
        </div>
      )}
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h2 className="text-[var(--foreground)] mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/blog/${slug}`}
              aria-label={title}
              className="hover:underline">
              {title}
            </Link>
          </h2>
          <time dateTime={date} className="mb-4 md:mb-0 text-md">
            {formatDate(date)}
          </time>
        </div>
        <div>
          <p className="text-md leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
          {category && (
            <span className="uppercase text-[var(--foreground)] px-2 py-1 rounded-xl border border-[var(--border)]">
              {category}
            </span>
          )}
        </div>        
      </div>
    </section>
    
  )
}
