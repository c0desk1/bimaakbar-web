'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-[30vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
        <span className="text-[var(--foreground)]">Bima Akbar</span>
      </h1>

      <p className="mt-4 text-lg text-[var(--muted)] max-w-xl">
        Frontend developer with a passion for elegant design, modular systems, and immersive user experiences.
      </p>
    </section>
  );
}
