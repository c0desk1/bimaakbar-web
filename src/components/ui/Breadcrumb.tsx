import Link from "next/link"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const lastItem = items[items.length - 1]

  return (
    <nav className="w-full flex justify-center mb-8">
      <ol className="flex items-center text-sm text-[var(--muted-foreground)]">
        {lastItem.href ? (
          <Link
            href={lastItem.href}
            className="inline-flex items-center hover:text-[var(--foreground)]"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{lastItem.label}</span>
          </Link>
        ) : (
          <span className="inline-flex items-center text-[var(--foreground)] font-medium">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{lastItem.label}</span>
          </span>
        )}
      </ol>
    </nav>
  )
}