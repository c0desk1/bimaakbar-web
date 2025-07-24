interface Props {
    items: {
      label: string;
      href: string;
    }[];
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="items-center text-sm text-[var(--color-muted)] mb-2 overflow-hidden">
      <ol className="flex items-center text-center space-x-1 border border-[var(--color-border)] backdrop-blur-md rounded-full px-2 py-1">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            {idx > 0 && <span className="uppercase hover:text-[var(--color-fg)] text-[var(--color-muted)] gap-2">›</span>}
            <a
              href={item.href}
              className="uppercase hover:underline hover:text-[var(--color-fg)]"
              aria-current={idx === items.length - 1 ? "page" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
