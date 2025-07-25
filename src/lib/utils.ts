//src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import slugger from 'github-slugger';
import type {Heading} from '../types';

function isValidDate(date: string | Date | undefined | null): date is Date {
  const dt = typeof date === 'string' ? new Date(date) : date;
  return !!dt && !isNaN(dt.getTime());
}

export function con(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isLinkActive(href: string, currentPath: string): boolean {
  const clean = (s: string) => s.replace(/\/+$/, '');
  const baseHref = clean(href);
  const basePath = clean(currentPath);
  return (
    baseHref === basePath ||
    basePath.startsWith(baseHref + '/')
  );
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

export async function getHeadings(markdown: string): Promise<Heading[]> {
  const tree = unified().use(remarkParse).parse(markdown);
  const headings: Heading[] = [];
  const s = new slugger();

  visit(tree, 'heading', (node: any) => {
    const depth = node.depth;
    const text = node.children
      .filter((child: any) => child.type === 'text' || child.type === 'inlineCode')
      .map((child: any) => child.value)
      .join(' ');

    if (text) {
      headings.push({ text, slug: s.slug(text), depth });
    }
  });

  return headings;
}