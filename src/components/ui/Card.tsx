import Link from "next/link"
import Image from "next/image"

interface CardProps {
  slug: string
  title: string
  excerpt: string
  cover?: string
  category?: string
  readingTime?: string
}

export default function Card({
  slug,
  title,
  excerpt,
  cover,
  category,
  readingTime,
}: CardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-md transition overflow-hidden bg-[var(--background)]">
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
            <span className="font-semibold text-[var(--accent)]">
              {category}
            </span>
          )}
          {readingTime && <span>• {readingTime}</span>}
        </div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)]">
          {title}
        </h2>
        <p className="text-sm text-[var(--muted)] line-clamp-3">{excerpt}</p>
      </div>
    </Link>
  )
}
