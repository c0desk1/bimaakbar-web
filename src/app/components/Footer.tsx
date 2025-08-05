import React from "react"
import Link from "next/link"
import { Container } from "@/components/Container"

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      itemScope
      itemType="http://schema.org/WPFooter"
      className="w-full border-t border-[var(--border)] bg-[var(--background)]">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 py-6 text-sm text-[var(--muted-foreground)] w-full">
          <nav
            role="navigation"
            className="flex items-center justify-center md:justify-start gap-4">
            <Link href="/privacy" className="hover:text-[var(--foreground)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--foreground)]">Terms</Link>
            <Link href="/contact" className="hover:text-[var(--foreground)]">Contact</Link>
          </nav>
          <p className="text-center">
            © {new Date().getFullYear()}{" "}
            <span itemProp="name">Bima Akbar</span>.
          </p>
          <div className="flex items-center justify-center md:justify-end gap-3">
            <Link 
              href="https://github.com" 
              target="_blank" 
              aria-label="Github" 
              className="w-5 h-5 flex items-center justify-center hover:opacity-70">
              <svg stroke="var(--foreground)" width={20} height={20} className="size-full">
                <use href="/images/icons.svg#github" />
              </svg>
            </Link>
            <Link 
              href="https://tiktok.com/@bimaakbarmusicc" 
              target="_blank" 
              aria-label="Tiktok" 
              className="w-5 h-5 flex items-center justify-center hover:opacity-70">
              <svg stroke="var(--foreground)" width={20} height={20} className="size-full">
                <use href="/images/icons.svg#tiktok" />
              </svg>
            </Link>
            <Link 
              href="https://instagram.com/notmesound" 
              target="_blank" 
              aria-label="Instagram" 
              className="w-5 h-5 flex items-center justify-center hover:opacity-70">
              <svg stroke="var(--foreground)" width={20} height={20} className="size-full">
                <use href="/images/icons.svg#instagram" />
              </svg>
            </Link>
            <Link 
              href="https://youtube.com/@bimaakbarmu" 
              target="_blank" 
              aria-label="Youtube" 
              className="w-5 h-5 flex items-center justify-center hover:opacity-70">
              <svg stroke="var(--foreground)" width={20} height={20} className="size-full">
                <use href="/images/icons.svg#youtube" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
