"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -5 },
    visible: { opacity: 1, scale: 1, y: 0 },
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-muted-foreground">Bagikan ke:</span>
        <motion.a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bagikan ke WhatsApp"
          className="group hover:bg-muted p-1 rounded-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <svg width={20} height={20} stroke="currentColor" className="group-hover:stroke-green-500 transition-colors">
            <title>Whatsapp</title>
            <use href="/images/icons.svg#whatsapp" />
          </svg>
        </motion.a>
        <motion.a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bagikan ke Facebook"
          className="group hover:bg-muted p-1 rounded-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <svg width={20} height={20} stroke="currentColor" className="group-hover:stroke-blue-600 transition-colors">
            <title>Facebook</title>
            <use href="/images/icons.svg#facebook" />
          </svg>
        </motion.a>
        <motion.a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bagikan ke X"
          className="group hover:bg-muted p-1 rounded-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <svg width={20} height={20} stroke="currentColor" className="group-hover:stroke-gray-800 dark:group-hover:stroke-gray-200 transition-colors">
            <title>X</title>
            <use href="/images/icons.svg#twitter" />
          </svg>
        </motion.a>
        <div className="relative">
          <motion.button
            onClick={handleCopy}
            aria-label="Salin tautan"
            className="group hover:bg-muted p-1 rounded-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}>
            <motion.svg
              width={20}
              height={20}
              animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className={copied ? "stroke-green-500" : "stroke-muted-foreground group-hover:stroke-foreground transition-colors"}>
              <title>{copied ? "Tautan disalin" : "Salin"}</title>
              <use key={copied ? "check" : "copy"} href={`/images/icons.svg#${copied ? "check" : "copy"}`} />
            </motion.svg>
          </motion.button>
          
          <AnimatePresence>
            {copied && (
              <motion.div
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs rounded bg-muted text-muted-foreground shadow pointer-events-none"
                variants={tooltipVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Disalin!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}