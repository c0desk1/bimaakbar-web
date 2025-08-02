'use client';

import { signOut, useSession } from "next-auth/react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)]">
      <div className="text-[var(--foreground)] font-semibold text-lg">Dashboard</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--muted-foreground)]">{session?.user?.email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-[var(--accent)] hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
