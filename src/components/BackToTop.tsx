// src/components/BackToTop.tsx
import React, { useState, useEffect, useCallback } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(toggleVisibility);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleVisibility]);

  return (
    <div className="flex items-center justify-end py-4 h-auto w-full text-[var(--color-muted)] hover:text-[var(--color-fg)]">
      <button
        type="button"
        onClick={scrollToTop}
        className={`group cursor-pointer flex justify-end px-2 py-1 w-fit gap-2 text-md items-center text-[var(--color-muted)] hover:text-[var(--color-fg)] rounded-full hover:bg-[var(--color-hover)] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Kembali ke atas"
      >
        <svg
          stroke="var(--color-fg)"
          className="size-4 pointer-events-none cursor-pointer"
        >
          <use href="/ui.svg                  
        </svg>
        <span className="block">Kembali ke atas</span>
      </button>
    </div>
  );
};

export default BackToTopButton;
