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
    <div className="flex gap-3 mt-10 items-center">
      <span className="text-sm text-[var(--muted)]">Bagikan:</span>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-green-500 text-white hover:opacity-80"
      >
        <svg width={18} height={18}>
          <use href="/images/icons.svg#whatsapp" />
        </svg>
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-blue-500 text-white hover:opacity-80"
      >
        <svg width={18} height={18}>
          <use href="/images/icons.svg#twitter" />
        </svg>
      </a>

      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="p-2 rounded-full bg-gray-500 text-white hover:opacity-80"
      >
        <svg width={18} height={18}>
          <use href="/images/icons.svg#copy" />
        </svg>
      </button>
    </div>
  )
}
