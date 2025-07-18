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
    <section className="items-center py-4">
      <div className="flex items-center h-auto w-full justify-start">
        <button type="button" onClick={scrollToTop} className={`group flex bg-[var(--color-bg)] md:bg-transparent md:border-transparent border border-[var(--color-border)] px-2 pt-1 pb-1 rounded-full w-fit md:p-2 gap-2 text-md items-center text-[var(--color-muted)] hover:text-[var(--color-fg)] cursor-pointer ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} aria-label="Kembali ke atas">
          <i className="ri-arrow-up-circle-line text-xl"></i>
          <span className="hidden md:block">Kembali ke atas</span>
        </button>
      </div>
  </section>
  );
};

export default BackToTopButton;