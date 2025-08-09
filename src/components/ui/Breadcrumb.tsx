// components/ui/Breadcrumb.tsx
import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: Crumb[];
};

const SeparatorIcon = (
  <svg width={16} height={16} className="size-4 text-[var(--muted-foreground)] mx-1">
    <use href="/images/icons.svg#breadcrumb" />
  </svg>
);

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-md mb-6" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[50dvw] truncate text-[var(--foreground)] font-medium">{item.label}</span>
            )}
            {!isLast && SeparatorIcon}
          </div>
        );
      })}
    </nav>
  );
}
