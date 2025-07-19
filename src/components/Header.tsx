// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { SITE, LINKS } from "../consts";
import { useScroll } from '../hooks/useScroll';
import Logo from './Logo';
import Container from "./Container";
import ThemeToggleButton from './ThemeToggleButton';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const isScrolled = useScroll(10);
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  
  const getLinkClass = (href: string) => {
    return `px-3 py-1 rounded-full hover:text-[var(--color-muted)] hover:bg-[var(--color-hover)] transition-colors ${href === currentPath ? 'text-[var(--color-fg)]' : 'text-[var(--color-muted)]'}`;
  };

  const headerClasses = `fixed top-0 z-50 w-full h-16 transition-all duration-300 ${
    isScrolled ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]' : 'bg-transparent border-b border-transparent'
  }`;

  return (
    <header className={headerClasses} aria-label="Navigasi utama">
      <Container size="2xl">
        <div className="py-4 flex items-center justify-between">
          <div className="flex-1">
            <a href="/" aria-label={`Beranda ${SITE.TITLE}`} className="flex gap-2 items-center text-[var(--color-fg)] text-xl hover:text-[var(--color-fg)]">
              <Logo width={32} height={32} />
              <span className="hidden md:inline font-semibold">{SITE.TITLE}</span>
            </a>
          </div>
          <nav
            className="hidden md:flex items-center gap-4"
            aria-label="Navigasi utama desktop">
            {LINKS.map((link) => (
              <a
                key={link.HREF}
                href={link.HREF}
                className={getLinkClass(link.HREF)}
                aria-current={currentPath === link.HREF ? 'page' : undefined}
                aria-label={`Menu ${link.TEXT}`}>
                {link.TEXT}
              </a>
            ))}
          </nav>
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex">
              <ThemeToggleButton aria-label="Toggle tema gelap atau terang" />
            </div>
            <button
              className="md:hidden flex items-center justify-center size-6 p-4 text-md text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] rounded-full"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu">
              {isMenuOpen ? (
                <i className="ri-close-line" aria-hidden="true"></i>
              ) : (
                <i className="ri-menu-3-line" aria-hidden="true"></i>
              )}
            </button>
          </div>
        </div>
      </Container>
      <MobileMenu
        isOpen={isMenuOpen}
        currentPath={currentPath}
        onLinkClick={() => setIsMenuOpen(false)}
        id="mobile-menu"
        aria-label="Navigasi Mobile"
        className="z-50" />
    </header>
  );
};

export default Header;