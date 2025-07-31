'use client';

import React from 'react';
import { siteConfig } from '@/config';

export default function Hero() {
  return (
    <section className="min-h-[30vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
        <span className="text-[var(--foreground)]">{siteConfig.name}</span>
      </h1>

      <p className="mt-4 text-lg text-[var(--muted)] max-w-xl">
        {siteConfig.description}
      </p>
    </section>
  );
}
