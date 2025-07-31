"use client"
import { useEffect, useState } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-2 rounded-full border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-md hover:bg-[var(--hover)] z-50"
      aria-label="Back to top">
      <svg width={20} height={20} stroke="white" fill="none" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  ) : null
}