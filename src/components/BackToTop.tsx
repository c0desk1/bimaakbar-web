// src/components/BackToTop.tsx
import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="flex items-center justify-end py-4 h-auto w-auto text-[var(--color-muted)] hover:text-[var(--color-fg)]">
      <button type="button" onClick={scrollToTop} className={`group cursor-pointer flex justify-end px-2 py-1 w-fit gap-2 text-md items-center text-[var(--color-muted)] hover:text-[var(--color-fg)] rounded-full hover:bg-[var(--color-hover)] ${isVisible ? 'opacity-100' : 'opacity-0'}`} aria-label="Kembali ke atas">
        <i className="ri-arrow-up-circle-line text-xl"></i>
        <span className="block">Kembali ke atas</span>
      </button>
    </div>
  );
};

export default BackToTopButton;