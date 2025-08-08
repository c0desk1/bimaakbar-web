import Link from "next/link"
import Image from "next/image"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"
import { Badge } from "./Badge"

export default function Card({
  slug,
  title,
  excerpt,
  date,
  coverImage,
  category,
}: PostMeta) {
  return (
    <div>
      {coverImage && (
        <div className="mb-4">
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            width={1200}
            height={630}
            className="rounded-[var(--radius)] w-full h-auto hover:shadow-lg transition-shadow duration-200"
            priority
            fetchPriority="high" />
        </div>
      )}
      <div className="flex w-full justify-between items-center text-sm mb-2">
        {category && (
          <Badge variant="secondary">
            {category}
          </Badge>
        )}
        <time dateTime={date} className="text-md">
          {formatDate(date)}
        </time>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link 
          as={`/posts/${slug}`}
          href={`/posts/${slug}`}
          className="hover:underline">
        {title}
        </Link>
      </h3>
      <p className="text-md leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}
