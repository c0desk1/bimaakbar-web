"use client"
import { useState, useEffect } from "react"
import { useTheme } from 'next-themes';
import Link from "next/link"
import clsx from "clsx"
import { Container } from "@/components/Container"
import { Icon } from "./ui/Icons"
import { siteConfig } from "@/config"
import { motion, AnimatePresence } from 'motion/react';
import Drawer from './ui/Drawer'
import AdBox from "./ui/AdBox"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 h-14 py-2 transition-all items-baseline",
        isScrolled
          ? "bg-[var(--background)]/90 shadow-sm backdrop-blur-md border-b border-[var(--border)]"
          : "bg-[var(--background)]/90 border-transparent"
      )}>
      <Container size="md">
        <div className="flex items-center justify-between h-full w-full">
          <Link href="/" className="flex w-fit items-center gap-1">
            <svg
              aria-label="brand"
              stroke="var(--foreground)"
              width={32}
              height={32}
              className="p-1.5">
              <title>{siteConfig.name}</title>
              <use href="/images/icons.svg#logo" />
            </svg>
            <span className="text-2xl font-bold hidden md:block">{siteConfig.name}.</span>
          </Link>
          <div className="flex items-center gap-2">
            <nav aria-label="Main Navigation" className="text-md font-semibold hidden md:flex gap-6 text-[var(--muted-foreground)]">
              <Link href="/" className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Beranda</Link>
              <Link href="/blog" className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Blog</Link>
              <Link href="/archive" className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Arsip</Link>
              <Link href="/about" className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Tentang</Link>
            </nav>
            <Icon
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="size-8 hover:bg-[var(--hover)] transition"
              aria-label="Toggle Dark Mode">
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1, rotate: isDark ? 5 : -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--foreground)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-full"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1, rotate: isDark ? 5 : -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--foreground)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-full"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </Icon>
            <Icon
              onClick={() => setOpen(prev => !prev)}
              aria-label={open ? 'Tutup Menu' : 'Tombol Menu'}
              className="md:hidden size-8 p-1 rounded-full hover:bg-[var(--hover)] cursor-pointer">
              <svg viewBox="0 0 24 24" stroke="var(--foreground)" fill="none" strokeWidth="2" className="size-full">
                <motion.line
                  x1="4"
                  y1="8"
                  x2="20"
                  y2="8"
                  strokeLinecap="round"
                  animate={{
                    rotate: open ? 45 : 0,
                    y: open ? 4 : 0,
                  }}
                  style={{ originX: '50%', originY: '50%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.line
                  x1="4"
                  y1="16"
                  x2="20"
                  y2="16"
                  strokeLinecap="round"
                  animate={{
                    rotate: open ? -45 : 0,
                    y: open ? -4 : 0,
                  }}
                  style={{ originX: '50%', originY: '50%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </svg>
            </Icon>
          </div>
        </div>
      </Container>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <div className="h-auto w-full p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Halo!</h2>
          <nav aria-label="Main Navigation" className="flex flex-col flex-1 text-xl font-semibold gap-2 text-[var(--foreground)] mb-14">
            <span className="text-sm font-semibold text-[var(--muted-foreground)] mt-2">Menu</span>
            <Link href="/" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Beranda</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Blog</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Tentang</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Kontak</Link>
            <span className="text-sm font-semibold text-[var(--muted-foreground)] mt-2">Discover</span>
            <Link href="/archive" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Arsip</Link>
            <Link href="/rss" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Rss</Link>
            <Link href="/sitemap" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Sitemap</Link>
            <span className="text-sm font-semibold text-[var(--muted-foreground)] mt-2">Legal</span>
            <Link href="/privacy" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Privasi</Link>
            <Link href="/terms" onClick={() => setOpen(false)} className="tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Syarat & Ketentuan</Link>
          </nav>
          <div className="flex md:hidden w-auto max-w-[320px]">
            <AdBox adKey="22b4b4effc5ef8f49cb94210e8edda45" width={320} height={50} />
          </div>
        </div>
      </Drawer>
    </header>
    
  )
}