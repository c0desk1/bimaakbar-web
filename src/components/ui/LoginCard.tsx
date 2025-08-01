"use client";

import { signIn } from "next-auth/react";

export default function LoginCard() {
  return (
    <div className="w-full max-w-md bg-[var(--card)] rounded-xl shadow-md p-8 text-center">
      <h1 className="text-2xl font-semibold mb-2">Masuk ke Dashboard</h1>
      <p className="text-[hsl(0,0%,40%)] mb-6">Gunakan akun GitHub untuk melanjutkan</p>
      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="flex items-center justify-center w-full bg-[#0a84ff] text-white py-2 px-4 rounded-lg hover:bg-[#0077e6] transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.68.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
        <span className="ml-2 font-medium">Login dengan GitHub</span>
      </button>
    </div>
  );
}
