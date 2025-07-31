import React from "react"
import Link from "next/link"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
  separator?: React.ReactNode
}

const DefaultSeparator = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5 mx-1 text-[var(--muted)] flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="var(--muted-foreground)"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

export default function Breadcrumb({
  items,
  separator = DefaultSeparator,
}: BreadcrumbProps) {
  return (
    <nav className="w-full flex justify-center mb-8 overflow-x-auto">
      <ol className="flex justify-center items-center whitespace-nowrap text-sm text-[var(--muted-foreground)] text-ellipsis overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-transparent"
        aria-label="Breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--foreground)] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-[var(--foreground)] font-medium"
                  aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && separator}
            </li>
          )
        })}
      </ol>
    </nav>
  )
  
}