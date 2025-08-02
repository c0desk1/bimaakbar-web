'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="text-center px-4">
      <h1 className="text-3xl font-bold mb-6">Masuk ke Dashboard</h1>

      <button
        onClick={() => signIn('github')}
        className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .5C5.7.5.5 5.8.5 12.1c0 5.1 3.3 9.5 7.8 11.1.6.1.8-.3.8-.6v-2.1c-3.2.7-3.8-1.5-3.8-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.6.1-.6.1-.6 1.1.1 1.7 1.1 1.7 1.1 1 .1.5 2.2 3.6 1.6.1-.8.4-1.5.8-1.9-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.9.1 3.2.8.9 1.3 2 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.8.6a11.7 11.7 0 0 0 7.9-11.1C23.5 5.8 18.3.5 12 .5Z" />
        </svg>
        Login dengan GitHub
      </button>
    </div>
  );
}