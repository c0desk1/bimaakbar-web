import { useState, useEffect, useCallback, useRef } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false); // untuk throttle dengan requestAnimationFrame

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 400;
        setIsVisible((prev) => {
          // hanya update jika berubah
          if (prev !== shouldShow) return shouldShow;
          return prev;
        });
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex items-center justify-end py-4 h-auto w-full">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className={`group flex items-center gap-2 px-2 py-1 rounded-full w-fit text-md text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-hover)] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg stroke="var(--color-fg)" className="size-4 pointer-events-none">
          <use href="/ui.svg#backtotop" />
        </svg>
        <span>Kembali ke atas</span>
      </button>
    </div>
  );
};

export default BackToTopButton;
