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
    return `hover:text-[var(--color-fg)] transition-colors ${href === currentPath ? 'text-[var(--color-fg)]' : 'text-[var(--color-muted)]'}`;
  };

  const headerClasses = `fixed top-0 z-50 w-full h-16 transition-all duration-300 ${
    isScrolled ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]' : 'bg-transparent border-b border-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <Container size="xl">
        <div className="py-4 flex items-center justify-between font-semibold">
          <div className="flex-1">
            <a href="/" className="flex gap-2 items-center text-current hover:text-[var(--color-fg)]">
              <Logo width={32} height={32} />
              <span className="hidden md:inline">{SITE.TITLE}</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            {LINKS.map((link) => (
              <a key={link.HREF} href={link.HREF} className={getLinkClass(link.HREF)}>{link.TEXT}</a>
            ))}
          </nav>
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex">
              <ThemeToggleButton />
            </div>
            <button 
              className="md:hidden flex items-center justify-center size-9 p-2 text-xl text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] rounded-xl" 
              onClick={toggleMenu} 
              aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
              aria-expanded={isMenuOpen}>
              {isMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-3-line"></i>}
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu 
        isOpen={isMenuOpen} 
        currentPath={currentPath}
        onLinkClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Header;