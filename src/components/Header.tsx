// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { SITE, LINKS } from "../consts"
import Logo from './Logo';

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    if (saved === 'dark' || (!saved && prefersDark)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);
  
  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    root.classList.toggle('dark', newTheme === 'dark');
    setIsDark(!isDark);
  };
  
  return (
    <button onClick={toggleTheme} className="text-2xl text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] rounded-full cursor-pointer transition-colors">
      {isDark ? <i className="ri-sun-line px-1 py-1" /> : <i className="ri-moon-line px-1 py-1" />}
    </button>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
}, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
}, [isMenuOpen]);

  const getLinkClass = (href: string) => {
    return href === currentPath ? 'text-[var(--color-fg)] px-2 font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)] px-2';
  };

  const getMobileLinkClass = (href: string) => {
    return href === currentPath ? 'text-[var(--color-fg)] px-2 font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)] px-2';
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-[var(--color-bg)] backdrop-blur-md border-b border-[var(--color-border)]' : 'bg-transparent border-b border-transparent'}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1">
            <a href="/" className="flex items-center gap-2 text-xl font-bold transition-colors">
              <Logo width={32} height={32} className='text-[var(-color-muted)] hover:text-[var(--color-fg)]' />
              <span className="hidden md:inline text-[var(-color-muted)] hover:text-[var(--color-fg)]">{SITE.TITLE}</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {
              LINKS.map((LINK) => (
                <a key={LINK.HREF} href={LINK.HREF} className={getLinkClass(LINK.HREF)}>{LINK.TEXT}</a>
              ))
            }
          </nav>
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggleButton />
            </div>
            <button className="md:hidden text-2xl" onClick={toggleMenu} aria-label="Buka Menu">
              {isMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-3-line"></i>}
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden absolute top-full left-0 w-full bg-[var(--color-bg)] backdrop-blur-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible -translate-y-2'}`}>
        <div className="container mx-auto flex flex-col items-center gap-6 py-8">
          {
            LINKS.map((LINK) => (
              <a key={LINK.HREF} href={LINK.HREF} className={getMobileLinkClass(LINK.HREF)} onClick={toggleMenu}>{LINK.TEXT}</a>
            ))
          }
          <div className='w-24 h-px bg-[var(--color-border)] my-2'></div>
          <div className="flex items-center gap-8">
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;