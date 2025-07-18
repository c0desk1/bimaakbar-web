//src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function con(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
    return Intl.DateTimeFormat("id-ID", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    }).format(date)
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const wordsPerMinute = 220;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  const displayTime = Math.max(1, minutes);
  return `${displayTime} min baca`; 
}

export function truncateText(str: string, maxLength: number): string {
    const ellipsis = '…';
  
    if (str.length <= maxLength) return str;
  
    const trimmed = str.trimEnd();
    if (trimmed.length <= maxLength) return trimmed;
  
    const cutoff = maxLength - ellipsis.length;
    let sliced = str.slice(0, cutoff).trimEnd();
  
    return sliced + ellipsis;
}

export function getBreadcrumbs(slug: string): { name: string; href: string }[] {
    const segments = slug.split("/").filter(Boolean);
    const breadcrumbs = [];
  
    let path = "";
    for (const segment of segments) {
      path += `/${segment}`;
      breadcrumbs.push({
        name: segment.replace(/-/g, " "),
        href: path
      });
    }
  
    return breadcrumbs;
  }