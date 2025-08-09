import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isValidDate(date: string | Date | undefined | null): date is Date {
  const dt = typeof date === 'string' ? new Date(date) : date;
  return !!dt && !isNaN(dt.getTime());
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

export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1) + "";
}
