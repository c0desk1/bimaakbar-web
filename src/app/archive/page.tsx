// src/app/archive/page.tsx
import { getAllPosts } from "@/lib/posts"
import ArchivePageClient from "@/components/ArchivePageClient"

export default async function ArchivePage() {
  const posts = await getAllPosts()

  return <ArchivePageClient posts={posts ?? []} />
}
