import React from "react"
import Link from "next/link"
import { Container } from "@/components/Container"

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--background)]">
        <Container size="md">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 text-sm text-[var(--muted)] w-full">
                <div className="flex-1">
                    <p className="text-center md:text-left flex-1">© {new Date().getFullYear()} <span className="font-semibold">Bima Akbar</span>.</p>
                </div>
                <div className="flex-1">
                    <nav className="flex items-center flex-1 gap-4 w-auto">
                        <Link href="/privacy" className="hover:text-[var(--foreground)]">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-[var(--foreground)]">
                            Terms
                        </Link>
                        <Link href="/contact" className="hover:text-[var(--foreground)]">
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex-shrink-0">
                    <Link href="https://github.com" target="_blank" aria-label="Github" className="w-5 h-5">
                        <svg stroke="var(--foreground)" width={20} height={20} className="size-full pointer-events-none">
                            <use href="/images/icons.svg#github"></use>
                        </svg>
                    </Link>
                </div>
            </div>
        </Container>
    </footer>
  )
}
