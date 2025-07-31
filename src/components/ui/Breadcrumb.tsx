import Link from "next/link"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 text-sm text-[var(--muted-foreground)]">
      <div className="flex items-center gap-1">
        {items.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === items.length - 1

          return (
            <div key={index} className="flex items-center gap-1">
              {!isFirst && <span className="mx-1">{'>'}</span>}

              {isFirst && item.href ? (
                <Link href={item.href} className="flex items-center gap-1 hover:text-[var(--foreground)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75v8.25a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5V9.75z" />
                  </svg>
                  <span className="sr-only">Home</span>
                </Link>
              ) : isLast ? (
                <span className="text-[var(--foreground)] font-medium">{item.label}</span>
              ) : (
                <Link href={item.href!} className="hover:text-[var(--foreground)]">
                  {item.label}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}