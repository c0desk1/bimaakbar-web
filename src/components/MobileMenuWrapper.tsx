'use client';
import { useEffect, useState } from "react";
import MobileMenu from './MobileMenu.tsx';

export default function MobileMenuWrapper() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setOpen(customEvent.detail?.isOpen ?? false);
    };

    window.addEventListener("mobileMenuToggle", handler);

    return () => {
      window.removeEventListener("mobileMenuToggle", handler);
    };
  }, []);

  return (
    <>
      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
