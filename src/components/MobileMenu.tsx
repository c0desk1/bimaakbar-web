// src/components/MobileMenu.tsx
import React from 'react';
import { LINKS } from '../consts';
import ThemeToggleButton from './ThemeToggleButton';

interface MobileMenuProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: boolean;
  currentPath: string;
  onLinkClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  currentPath,
  onLinkClick,
  className = '',
  ...props
}) => {
  const getMobileLinkClass = (href: string) => {
    return `text-lg ${href === currentPath ? 'text-[var(--color-fg)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'}`;
  };

  return (
    <div
      role="navigation"
      aria-hidden={!isOpen}
      {...props}
      className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-[var(--color-bg)] backdrop-blur-lg transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible -translate-y-4'} ${className}`}
    >
      <div className="container mx-auto flex flex-col items-center justify-center h-full gap-8">
        {LINKS.map((link) => (
          <a
            key={link.HREF}
            href={link.HREF}
            className={getMobileLinkClass(link.HREF)}
            onClick={onLinkClick}
          >
            {link.TEXT}
          </a>
        ))}
        <div className="w-24 h-px bg-[var(--color-border)] my-2" />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default MobileMenu;
