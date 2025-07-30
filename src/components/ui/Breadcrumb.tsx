import React from "react";
import Link from "next/link"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-[var(--muted)] mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--foreground)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--foreground)] font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}