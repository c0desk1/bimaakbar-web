"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import clsx from "clsx"
import { Container } from "@/components/Container"
import { Icon } from "./ui/Icons"
import { Drawer } from "@/components/ui/Drawer";
import { siteConfig } from "@/config"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 max-h-14 transition-all",
        isScrolled
          ? "bg-[var(--background)]/90 shadow-sm backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-transparent"
      )}>
      <Container size="md" className="justify-between">
        <div className="flex items-center justify-between w-full py-3 gap-4">
          <Link href="/" className="flex w-fit items-center gap-1">
            <svg
              aria-label="brand"
              fill="var(--foreground)"
              width={32}
              height={32}
              className="p-1">
              <title>Bima Akbar</title>
              <use href="/images/icons.svg#logo" />
            </svg>
            <span className="text-3xl font-bold hidden md:block">{siteConfig.name}.</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav aria-label="Main Navigation" className="text-md font-semibold hidden md:flex gap-6 text-[var(--muted-foreground)]">
              <Link href="/" className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Home</Link>
              <Link href="/blog" className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Blog</Link>
              <Link href="/about" className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">About</Link>
            </nav>
            <Icon
              onClick={toggleTheme}
              className="hidden md:block size-8 p-1 rounded-full hover:bg-[var(--hover)] cursor-pointer"
              aria-label="Toggle Dark Mode">
              <svg stroke="var(--foreground)" width="32" height="32" className="size-full">
                <use href={`/images/icons.svg#${darkMode ? "sun" : "moon"}`} />
              </svg>
            </Icon>
            <Icon
              onClick={() => setOpen(true)}
              aria-controls="mobile-menu"
              aria-label="Toggle Menu"
              className="md:hidden size-8 p-1 rounded-full hover:bg-[var(--hover)] cursor-pointer">
              <svg stroke="var(--foreground)" className="size-full">
                <use href="/images/icons.svg#menu" />
              </svg>
            </Icon>
          </div>
        </div>
      </Container>
      <Drawer
id= "mobile-menu"
        open={open}
        onClose={() => setOpen(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleTheme}
      />
    </header>
    
  )
}

