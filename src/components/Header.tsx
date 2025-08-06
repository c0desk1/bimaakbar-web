"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import clsx from "clsx"
import { Container } from "@/components/Container"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(saved ? saved === "dark" : prefersDark)

    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") setDarkMode(e.newValue === "dark")
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleTheme = useCallback(() => setDarkMode(v => !v), [])
  const toggleMenu = useCallback(() => setMenuOpen(v => !v), [])

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 max-h-14 transition-all",
        isScrolled
          ? "bg-[var(--background)]/90 shadow-sm backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-transparent"
      )}>
      <Container size="lg">
        <div className="flex items-center justify-between w-full py-3 gap-4">
          <Link href="/" className="flex w-fit items-center">
            <svg
              aria-label="brand"
              fill="var(--foreground)"
              width={32}
              height={32}
              className="p-1">
              <title>Bima Akbar</title>
              <use href="/images/icons.svg#logo" />
            </svg>
          </Link>

          <nav role="navigation" className="hidden md:flex gap-6 text-[var(--muted-foreground)]">
            <Link href="/blog" className="hover:text-[var(--foreground)]">Blog</Link>
            <Link href="/about" className="hover:text-[var(--foreground)]">About</Link>
            <Link href="/contact" className="hover:text-[var(--foreground)]">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="size-8 p-1 rounded-full hover:bg-[var(--hover)] cursor-pointer"
              aria-label="Toggle Dark Mode">
              <svg stroke="var(--foreground)" width="32" height="32" className="size-full">
                <use href={`/images/icons.svg#${darkMode ? "sun" : "moon"}`} />
              </svg>
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden size-8 p-1 rounded-full hover:bg-[var(--hover)] cursor-pointer"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle Menu">
              <svg stroke="var(--foreground)" className="size-full">
                <use href={`/images/icons.svg#${menuOpen ? "close" : "menu"}`} />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 w-full bg-[var(--background)] border-t border-[var(--border)] transition-all duration-300 ${
            menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}>
          <nav className="flex flex-col items-center gap-4 py-4 text-[var(--foreground)]">
            {["blog", "about", "contact"].map((link) => (
              <Link key={link} href={`/${link}`} onClick={() => setMenuOpen(false)}>
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  )
}
