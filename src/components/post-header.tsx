// src/app/blog/[slug]/components/PostHeader.tsx
import Image from "next/image"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"

interface PostHeaderProps {
  data: PostMeta
}

export default function PostHeader({ data }: PostHeaderProps) {
  return (
    <>
      <h1 className="px-4 text-[var(--foreground)] text-center text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
        {data.title}
      </h1>
      <div className="flex justify-center items-center gap-2 text-sm text-[var(--muted-foreground)] px-4 mb-16">
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
      <div className="flex items-center w-full justify-between text-sm text-[var(--muted-foreground)] px-4 mb-4">
        <div className="flex items-center gap-1">
          <svg width={16} height={16} stroke="currentColor" className="opacity-80">
            <use href="/images/icons.svg#calender" />
          </svg>
          <time dateTime={data.date}>{formatDate(data.date)}</time>
        </div>
      </div>
      {data.coverImage && (
        <div className="hidden px-4 mb-8">
          <Image
            src={data.coverImage}
            alt={data.title}
            width={1200}
            height={630}
            className="w-full mx-auto max-w-screen-md h-auto rounded-xl border border-[var(--border)]"
            priority
          />
        </div>
      )}
    </>
  )
}
