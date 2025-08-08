'use client';

import React from 'react';
import { siteConfig } from '@/config';

export default function Hero() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-22 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        {siteConfig.name}.
      </h1>
      <span className="text-center md:text-left text-lg mt-5 md:pl-8">
        {siteConfig.description}
      </span>
    </section>
  );
}
