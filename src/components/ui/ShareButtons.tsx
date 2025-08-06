"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname()
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.origin + pathname)
  }, [pathname])

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div className="flex gap-3 items-center py-4">
      <span className="text-sm text-[var(--muted-foreground)]">Bagikan:</span>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
        className="p-2 rounded-full border border-[var(--border)] bg-[var(--background)]">
        <svg width={18} height={18} stroke="var(--muted)" className="hover:stroke-green-500">
          <title>Whatsapp</title>
          <use href="/images/icons.svg#whatsapp" />
        </svg>
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke Facebook"
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)]">
        <svg width={18} height={18} stroke="var(--muted)" className="hover:stroke-blue-600">
          <title>Facebook</title>
          <use href="/images/icons.svg#facebook" />
        </svg>
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke X"
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)]">
        <svg width={18} height={18} stroke="var(--muted)" className="hover:stroke-black">
          <title>X</title>
          <use href="/images/icons.svg#twitter" />
        </svg>
      </a>

      <button
        onClick={() => navigator.clipboard.writeText(url)}
        aria-label="Salin tautan"
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)]">
        <svg width={18} height={18} stroke="var(--muted)">
          <title>Salin</title>
          <use href="/images/icons.svg#copy" />
        </svg>
      </button>
    </div>
  )
}
