interface Props {
    items: {
      label: string;
      href: string;
    }[];
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="items-center text-xs text-[var(--color-muted)] mb-2 overflow-hidden py-2">
      <ol className="flex items-center text-center space-x-1">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            {idx > 0 && (
              <span aria-hidden="true" className="text-[var(--color-muted)]">
                <svg stroke="var(--color-fg)" className="size-4 pointer-events-none cursor-pointer">
                  <use href="/ui.svg#breadcrumb"></use>
                </svg>
              </span>
            )}
            <a
              href={item.href}
              className="text-ellipsis truncate uppercase hover:underline hover:text-[var(--color-fg)] line-clamp-2"
              aria-current={idx === items.length - 1 ? "page" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
