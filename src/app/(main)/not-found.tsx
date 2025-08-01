// src/app/not-found.tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="py-16 gap-6 text-center items-center">
      <h1 className="text-5xl font-bold text-[var(--foreground)] mb-4">404</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Halaman tidak ditemukan.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-2 border border-[var(--border)] rounded-md text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition">
        Kembali ke Beranda
      </Link>
    </main>
  )
}
