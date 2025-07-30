"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Container } from "@/components/Container"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") setDarkMode(true)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 max-h-16 transition-all ${
        isScrolled
          ? "bg-[var(--background)]/90 shadow-sm backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-transparent"
      }`}>
      <Container size="md">
        <div className="flex items-center justify-between w-full py-3 gap-4">
          <div className="flex items-center">
            <Link href="/" prefetch className="flex w-fit items-center">
              <svg
                fill="var(--foreground)"
                width={32}
                height={32}
                className="p-1 dark:invert pointer-events-none">
                <use href="/images/icons.svg#logo"></use>
              </svg>
            </Link>
          </div>
          <div className="flex-1 items-center">
            <nav className="hidden md:flex flex-1 w-fit gap-6 text-[var(--muted)]">
              <Link href="/blog" prefetch className="hover:text-[var(--foreground)]">
                Blog
              </Link>
              <Link href="/about" prefetch className="hover:text-[var(--foreground)]">
                About
              </Link>
              <Link href="/contact" prefetch className="hover:text-[var(--foreground)]">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="size-8 p-1 hover:opacity-50 cursor-pointer"
              aria-label="Toggle Dark Mode">
              {darkMode ? (
                <svg stroke="var(--foreground)" className="size-full pointer-events-none">
                  <use href="/images/icons.svg#sun"></use>
                </svg>
              ) : (
                <svg stroke="var(--foreground)" className="size-full pointer-events-none">
                  <use href="/images/icons.svg#moon"></use>
                </svg>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden size-8 p-1 hover:opacity-50 cursor-pointer"
              aria-label="Toggle Menu">
              <svg stroke="var(--foreground)" className="size-full pointer-events-none">
                {menuOpen ? (
                  <use href="/images/icons.svg#close"></use>
                ) : (
                  <use href="/images/icons.svg#menu"></use>
                )}
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[var(--background)] border-t border-[var(--border)] overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}>
          <nav className="flex flex-col items-center gap-4 py-4 text-[var(--foreground)]">
            <Link href="/blog" prefetch onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/about" prefetch onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" prefetch onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  )
}
