// src/components/ThemeToggleButton.tsx
import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggleButton: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="flex items-center justify-center size-9 text-xl p-2 text-[var(--color-muted)] border border-[var(--color-border)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] rounded-full cursor-pointer"
      aria-label={theme === 'dark' ? 'Activate light mode' : 'Activate dark mode'}>
      {theme === 'dark' ? <i className="ri-sun-line" /> : <i className="ri-moon-line" />}
    </button>

    
  );
};

export default ThemeToggleButton;