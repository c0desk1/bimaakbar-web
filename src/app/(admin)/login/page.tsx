'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gradient-to-br from-[var(--background)] to-[var(--card)] border border-[var(--border)] shadow-xl rounded-[var(--radius)] p-8">
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-semibold">
            <svg
              aria-label="Logo"
              fill="var(--muted-foreground)"
              width={32}
              height={32}
              className="p-1 dark:invert">
              <title>Bima Akbar</title>
              <use href="/images/icons.svg#logo" />
            </svg>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--foreground)]">Selamat datang.</h1>
        <div className="space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-[var(--radius)] border hover:bg-gray-100 transition cursor-pointer">
            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
              <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.2H272v95h146.6c-6.3 34.3-25.1 63.3-53.6 82.6l86.4 67c50.5-46.6 81.1-115.3 81.1-194.4z" />
              <path fill="#34A853" d="M272 544.3c72.9 0 134-24.2 178.6-65.7l-86.4-67c-24 16.1-54.5 25.7-92.2 25.7-70.8 0-130.8-47.8-152.3-112.1l-89.6 69.3c44.4 88.2 136.8 149.8 242 149.8z" />
              <path fill="#FBBC05" d="M119.7 325.2c-10.1-29.5-10.1-61.2 0-90.7l-89.6-69.3C4.2 221.4 0 248.5 0 278.4s4.2 57 30.1 113.2l89.6-69.3z" />
              <path fill="#EA4335" d="M272 109.7c39.7 0 75.5 13.7 103.7 40.5l77.8-77.8C405.7 27.3 346.8 0 272 0 166.8 0 74.4 61.6 30.1 165.9l89.6 69.3c21.5-64.3 81.5-112.1 152.3-112.1z" />
            </svg>
            Masuk dengan Google
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-[var(--radius)] border border-black hover:bg-gray-900 transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.7.5.5 5.8.5 12.1c0 5.1 3.3 9.5 7.8 11.1.6.1.8-.3.8-.6v-2.1c-3.2.7-3.8-1.5-3.8-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 .1.5 2.2 3.6 1.6.1-.8.4-1.5.8-1.9-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.9.1 3.2.8.9 1.3 2 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.8.6a11.7 11.7 0 0 0 7.9-11.1C23.5 5.8 18.3.5 12 .5Z" />
            </svg>
            Masuk dengan GitHub
          </button>
        </div>
        <p className="mt-6 text-sm text-[var(--muted-foreground)] text-center">
          kembali ke{' '}
          <Link href="/" className="underline hover:text-[var(--foreground)]">
            Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
