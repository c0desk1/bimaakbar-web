"use client"
import { useEffect, useState } from "react"
import { Icon } from "./Icons"

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
    <Icon
      onClick={scrollToTop}
      className="size-9 fixed bottom-6 right-6 p-2 rounded-full border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-md hover:bg-[var(--hover)] z-50"
      aria-label="Back to top">
      <svg stroke="var(--foreground)" className="size-full">
        <use href="/images/icons.svg#arrow-up" />
      </svg>
    </Icon>
  ) : null
}