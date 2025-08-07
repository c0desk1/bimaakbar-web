// src/app/blog/[slug]/components/PostHeader.tsx
import Image from "next/image"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PostHeaderProps {
  data: PostMeta
}

export default function PostHeader({ data }: PostHeaderProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {data.title}
      </h1>
      <div className="flex items-center justify-center md:justify-start gap-2 text-md text-[var(--muted-foreground)] mb-4">
        <Avatar>
          <AvatarImage src={data.author?.picture || ''} />
          <AvatarFallback>{data.author?.name || ''}</AvatarFallback>
        </Avatar>
        <span className="text-md font-bold">{data.author?.name}</span>
        <span className="text-md text-[var(--muted-foreground)]">{data.category}</span>
      </div>
      {data.coverImage && (
        <div className="prose">
          <Image
            src={data.coverImage}
            alt={data.title}
            width={1200}
            height={630}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            priority
            fetchPriority="high"
            className="rounded-[var(--radius)] w-full h-auto hover:shadow-lg transition-shadow duration-200"
          />
        </div>
      )}
      <div className="flex items-center text-md text-[var(--muted-foreground)] mb-4">
        <div className="flex items-center gap-1">
          <svg width={16} height={16} stroke="currentColor">
            <use href="/images/icons.svg#calender" />
          </svg>
          <time dateTime={data.date}>{formatDate(data.date)}</time>
        </div>
      </div>
    </div>
  )
}