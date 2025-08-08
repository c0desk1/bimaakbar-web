// src/app/blog/[slug]/components/PostHeader.tsx
import Image from "next/image"
import { PostMeta } from "@/types"
import { formatDate } from "@/lib/utils"
import { siteConfig } from "@/config"
import { Badge } from "./ui/Badge"

interface PostHeaderProps {
  data: PostMeta
}

export default function PostHeader({ data }: PostHeaderProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {data.title}
      </h1>
      <div className="flex items-center justify-center md:justify-start gap-2 text-md text-[var(--muted-foreground)] mb-4">
        <Image
          src={data.author?.picture || siteConfig.avatar}
          alt={data.author?.name || siteConfig.name}
          width={18}
          height={18}
          className="rounded-full w-6 h-6"
        />
        <span className="text-md font-bold">{data.author?.name || siteConfig.name}</span> 
      </div>
      <div className="flex items-center justify-between text-md text-[var(--muted-foreground)] mb-4">
        <Badge variant="secondary">{data.category || "Tidak ada kategori"}</Badge>
        <div className="flex items-center gap-1">
          <svg width={16} height={16} stroke="currentColor">
            <use href="/images/icons.svg#calender" />
          </svg>
          <time dateTime={data.date}>{formatDate(data.date)}</time>
        </div>
      </div>
      {data.coverImage && (
        <div>
          <Image
            src={data.coverImage}
            alt={data.title}
            width={1200}
            height={630}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            priority
            fetchPriority="high"
            className="mb-6 rounded-[var(--radius)] w-full h-auto hover:shadow-lg transition-shadow duration-200"
          />
        </div>
      )}
      
    </div>
  )
}