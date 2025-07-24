// components/MobileMenu.tsx
'use client';

import { useEffect, useRef } from 'react';
import { con } from '../lib/utils';
import HeaderLink from './HeaderLink.tsx';
import { LINKS } from '../consts';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-[var(--color-bg)]/40 backdrop-blur-sm transition-opacity" />
      )}

      <div
        ref={menuRef}
        inert={!isOpen}
        className={con(
          'fixed bottom-0 left-0 right-0 z-50 w-full max-h-[90vh] rounded-t-xl border-t border-[var(--color-border)] bg-[var(--color-bg)] shadow-xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}>
        <nav className="flex flex-col gap-2 px-6 py-6">
          {LINKS.map((link) => (
            <HeaderLink
              href={link.HREF}
              key={link.HREF}
              currentPath={''}
              className={con(
                'text-lg transition-colors duration-200',
                'text-[var(--color-fg)] font-semibold',
                'text-[var(--color-muted)] hover:text-[var(--color-fg)]',
              )}
              aria-label={`Menu ${link.TEXT}`}>
              {link.TEXT}
            </HeaderLink>
          ))}
        </nav>
      </div>
    </>
  );
}
