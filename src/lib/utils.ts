//src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import slugger from 'github-slugger';
import type {Heading} from '../types';


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
  if (!date) return '';

  const dt = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dt.getTime())) return '';

  return dt.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

export function formatUpdateDate(date: string | Date | undefined | null): string {
  if (!date) return '';

  const dt = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dt.getTime())) return '';

  const day = dt.getDate().toString().padStart(2, '0');
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const year = dt.getFullYear();

  return `${day}-${month}-${year}`;
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