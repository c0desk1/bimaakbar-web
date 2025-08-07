import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function isValidDate(date: string | Date | undefined | null): date is Date {
  const dt = typeof date === 'string' ? new Date(date) : date;
  return !!dt && !isNaN(dt.getTime());
}

export function cn(...inputs: ClassValue[]) {
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
