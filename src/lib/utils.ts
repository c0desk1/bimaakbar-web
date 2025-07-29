//src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function isValidDate(date: string | Date | undefined | null): date is Date {
  const dt = typeof date === 'string' ? new Date(date) : date;
  return !!dt && !isNaN(dt.getTime());
}

export function con(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | undefined | null, options?: Intl.DateTimeFormatOptions): string {
  const dt = typeof date === 'string' ? new Date(date) : date;
  const safeDate = isValidDate(dt) ? dt : new Date();
  return safeDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

export function formatUpdateDate(date: string | Date | undefined | null): string {
  const dt = typeof date === 'string' ? new Date(date) : date;
  if (!isValidDate(dt)) return '';

  return `Terakhir diperbarui: ${dt.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const wordsPerMinute = 220;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  const displayTime = Math.max(1, minutes);
  return `${displayTime} min baca`; 
}