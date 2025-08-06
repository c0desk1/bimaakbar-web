"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import clsx from "clsx"

export default function ShareButtons({ title }: { title: string }) {
  const pathname = usePathname()
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin + pathname)
    }
  }, [pathname])

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Gagal menyalin tautan:", err)
    }
  }

  const iconClass =
    "transition-transform duration-200 ease-out group-hover:scale-110 group-hover:opacity-90"

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground">Bagikan:</span>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bagikan ke WhatsApp"
          className="group rounded-md p-2 hover:bg-muted transition"
        >
          <svg width={20} height={20} stroke="currentColor" className={`${iconClass} group-hover:stroke-green-500`}>
            <title>Whatsapp</title>
            <use href="/images/icons.svg#whatsapp" />
          </svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bagikan ke Facebook"
          className="group rounded-md p-2 hover:bg-muted transition"
        >
          <svg width={20} height={20} stroke="currentColor" className={`${iconClass} group-hover:stroke-blue-600`}>
            <title>Facebook</title>
            <use href="/images/icons.svg#facebook" />
          </svg>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bagikan ke X"
          className="group rounded-md p-2 hover:bg-muted transition"
        >
          <svg width={20} height={20} stroke="currentColor" className={`${iconClass} group-hover:stroke-black`}>
            <title>X</title>
            <use href="/images/icons.svg#twitter" />
          </svg>
        </a>
        <div className="relative">
          <button
            onClick={handleCopy}
            aria-label="Salin tautan"
            className="group rounded-md p-2 hover:bg-muted transition"
          >
            <svg
              width={20}
              height={20}
              stroke="currentColor"
              className={clsx(
                iconClass,
                copied ? "stroke-green-500 scale-110" : "stroke-muted-foreground group-hover:stroke-foreground"
              )}
            >
              <title>{copied ? "Tautan disalin" : "Salin"}</title>
              <use href={`/images/icons.svg#${copied ? "check" : "copy"}`} />
            </svg>
          </button>
          <div
            className={clsx(
              "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs rounded bg-muted text-muted-foreground shadow transition-all duration-300",
              copied ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}>
            disalin!
          </div>
        </div>
      </div>
    </div>
  )
}
