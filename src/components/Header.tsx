// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
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
      <button onClick={toggleTheme} className="text-2xl text-gray-400 hover:text-white transition-colors">
        {isDark ? <i className="ri-sun-line" /> : <i className="ri-moon-line" />}
      </button>
    );
  };
  


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
      <header className={`sticky top-0 z-50 w-full transition-all duration-300${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent border-b border-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1">
                <a href="/" className="flex items-center gap-2 text-xl font-bold hover:text-cyan-400 transition-colors">
                <Logo width={32} height={32} className="text-[var(--color-fg)]" />
                  <span className="hidden md:inline">Bima Akbar</span>
                </a>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-gray-400">
                <a href="/" className="hover:text-white transition-colors">Home</a>
                <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                <a href="/projects" className="hover:text-white transition-colors">Projects</a>
            </nav>
            <div className="flex-1 flex items-center justify-end gap-4">
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggleButton />
                    <a href="https://github.com/bima-akbar" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                        <i className="ri-github-fill"></i>
                    </a>
                </div>
                <button className="md:hidden text-2xl" onClick={toggleMenu} aria-label="Buka Menu">
                    {isMenuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-3-line"></i>}
                </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible -translate-y-2'}`}>
          <div className="container mx-auto flex flex-col items-center gap-6 py-8">
            <a href="/" className="text-xl text-gray-300 hover:text-cyan-400" onClick={toggleMenu}>Home</a>
            <a href="/blog" className="text-xl text-gray-300 hover:text-cyan-400" onClick={toggleMenu}>Blog</a>
            <a href="/projects" className="text-xl text-gray-300 hover:text-cyan-400" onClick={toggleMenu}>Projects</a>

            <div className='w-24 h-px bg-gray-700 my-2'></div>
            <div className="flex items-center gap-8">
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </header>
    );
};

export default Header;