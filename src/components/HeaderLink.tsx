import { isLinkActive } from '../lib/utils';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface HeaderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  currentPath: string;
}

export default function HeaderLink({
  href,
  className,
  currentPath,
  children,
  ...rest
}: HeaderLinkProps) {
  const safeHref = href?.toString() ?? '/';
  const isActive = isLinkActive(safeHref, currentPath);

  return (
    <a
      href={safeHref}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'px-3 py-1 rounded-full text-[var(--color-muted)]',
        'hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)]',
        isActive && 'text-[var(--color-fg)] bg-[var(--color-hover)]',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
