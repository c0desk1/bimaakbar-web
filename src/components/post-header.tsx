// src/app/blog/[slug]/components/PostHeader.tsx
import Image from "next/image"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"

interface PostHeaderProps {
  data: PostMeta
}

export default function PostHeader({ data }: PostHeaderProps) {
  return (
    <div className="flex flex-col px-4">
      <h1 className="text-[var(--foreground)] text-center md:text-left text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
        {data.title}
      </h1>
      <div className="flex justify-center md:justify-start items-center gap-2 text-sm text-[var(--muted-foreground)] mb-4">
        <Image
          src={data.author?.picture || ''}
          alt={data.author?.name || 'Admin'}
          width={18}
          height={18}
          className="rounded-full"
        />
        <span>{data.author?.name}</span>
        <span className="opacity-60">{data.category}</span>
      </div>
      {data.coverImage && (
        <div className="prose mb-4">
          <Image
            src={data.coverImage}
            alt={data.title}
            width={1200}
            height={630}
            className="w-auto h-auto"
            priority
          />
        </div>
      )}
      <div className="flex items-center w-full justify-between text-sm text-[var(--muted-foreground)] mb-8">
        <div className="flex items-center gap-1">
          <svg width={16} height={16} stroke="currentColor" className="opacity-80">
            <use href="/images/icons.svg#calender" />
          </svg>
          <time dateTime={data.date}>{formatDate(data.date)}</time>
        </div>
      </div>
    </div>
  )
}