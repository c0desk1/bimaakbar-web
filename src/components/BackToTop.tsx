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
    <section className="py-5">
      <div className="flex items-center justify-center sm:justify-end h-auto w-auto">
        <button type="button" onClick={scrollToTop} className={`group flex w-fit p-2 gap-2 text-sm items-center rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-hover)]  transition-colors duration-300 ease-in-out cursor-pointer ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} aria-label="Kembali ke atas">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white rotate-90">
              <line x1="19" y1="12" x2="5" y2="12" className="scale-x-0 group-hover:scale-x-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
              <polyline points="12 19 5 12 12 5" className="translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
            </svg>
          <div className="w-full group-hover:text-[var(--color-fg)] transition-colors duration-300 ease-in-out">
              Back to top
          </div>
        </button>
      </div>
    </section>
  );
};

export default BackToTopButton;