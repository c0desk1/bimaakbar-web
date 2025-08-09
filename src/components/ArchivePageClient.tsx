"use client"

import { useState } from "react"
import Link from "next/link"
import type { PostMeta } from "@/types"
import { Breadcrumb } from "./ui/Breadcrumb"
import Hero from "./ui/Hero"
import { Button } from "./ui/Buttons"

interface ArchivePageClientProps {
  posts: PostMeta[]
}

export default function ArchivePageClient({ posts }: ArchivePageClientProps) {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const grouped: Record<string, PostMeta[]> = {}
  sorted.forEach(post => {
    const year = new Date(post.date).getFullYear().toString()
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  })

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))
  const [visibleCount, setVisibleCount] = useState(12)

  return (
    <section className="relative mt-14 mb-14">
        <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Arsip", href: "/archive" }]} />
        <Hero title="Arsip" description="Arsip artikel dan postingan." align="left" />
        <div>
            {years.map(year => {
                const yearPosts = grouped[year].slice(0, visibleCount)
                return (
                <div key={year}>
                    <h2 className="text-4xl font-bold mb-8 text-[var(--muted-foreground)]">{year}</h2>
                    <div className="relative pl-6 border-l border-[var(--border)]">
                        {yearPosts.map(post => (
                            <div key={post.slug} className="mb-14 relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="left-0 w-2 h-2 rounded-full bg-[var(--background)] border-1 border-[var(--border)]"></div>
                                    <time className="block text-sm text-[var(--muted-foreground)]">
                                        {new Date(post.date).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                        })}
                                    </time>
                                </div>
                                <Link
                                    href={`/posts/${post.slug}`}
                                    className="text-xl font-semibold text-[var(--foreground)] hover:underline mb-2">
                                    {post.title}
                                </Link>
                                {post.excerpt && (
                                    <p className="text-sm text-[var(--muted-foreground)]">
                                    {post.excerpt}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    {grouped[year].length > visibleCount && (
                        <div className="mt-6">
                            <Button
                            onClick={() => setVisibleCount(c => c + 4)}
                            variant='outline'>
                            Tampilkan Lebih Banyak
                            </Button>
                        </div>
                    )}
                </div>
            )
        })}
        </div>
    </section>
  )
}
