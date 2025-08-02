'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--card)] border-r border-[var(--border)] p-4">
      <div className="text-xl font-bold mb-8">CMS</div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-md hover:bg-[var(--accent)] hover:text-white transition ${
              pathname === item.href ? "bg-[var(--accent)] text-white" : "text-[var(--muted-foreground)]"
            }`}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
