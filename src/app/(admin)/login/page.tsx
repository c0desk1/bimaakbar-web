'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {/* Logo atau Ikon */}
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[var(--foreground)]"
            viewBox="0 0 75 65"
            fill="currentColor"
          >
            <path d="M37.5 0L75 65H0L37.5 0Z" />
          </svg>
        </div>

        {/* Judul */}
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Masuk ke Dashboard</h1>

        {/* Tombol Login */}
        <button
          onClick={() => signIn('github')}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-[var(--border)] rounded-md bg-[var(--card)] hover:bg-[var(--card)]/80 text-[var(--foreground)] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .5C5.7.5.5 5.8.5 12.1c0 5.1 3.3 9.5 7.8 11.1.6.1.8-.3.8-.6v-2.1c-3.2.7-3.8-1.5-3.8-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 .1.5 2.2 3.6 1.6.1-.8.4-1.5.8-1.9-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.9.1 3.2.8.9 1.3 2 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.8.6a11.7 11.7 0 0 0 7.9-11.1C23.5 5.8 18.3.5 12 .5Z" />
          </svg>
          Masuk dengan GitHub
        </button>

        {/* Footer */}
        <p className="text-sm text-[var(--muted-foreground)]">
          Hanya untuk admin. Baca blog?{' '}
          <a href="/" className="underline hover:text-[var(--foreground)]">
            kembali ke beranda
          </a>
        </p>
      </div>
    </div>
  );
}