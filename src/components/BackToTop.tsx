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
	<div className="flex items-center h-auto w-auto gap-2 text-[var(--color-muted)] hover:text-[var(--color-fg)] cursor-pointer">
        <button type="button" onClick={scrollToTop} className={`group justify-start items-center ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} aria-label="Kembali ke atas">
          <i className="ri-arrow-up-circle-line text-xl"></i>
        </button>
        <span className="hidden md:block">Kembali ke atas</span>
     </div>
  );
};

export default BackToTopButton;