//src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import slugger from 'github-slugger';
import type {Heading, RawPost, BlogPost} from '../types';


import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');



export function con(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date, format = 'D MMMM YYYY'): string {
  return dayjs(date).format(format);
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
  const slug = new slugger();

  visit(tree, 'heading', (node: any) => {
    const depth = node.depth;
    const text = node.children
      .filter((child: any) => child.type === 'text' || child.type === 'inlineCode')
      .map((child: any) => child.value)
      .join(' ');

    if (text) {
      headings.push({ text, slug: slug.slug(text), depth });
    }
  });

  return headings;
}

export function normalizePosts(data: RawPost[]): BlogPost[] {
  return data
    .filter((post) => post.status === "PUBLISH")
    .map((post) => ({
      title: post.title || "",
      slug: post.slug || "",
      date: post.date || new Date().toISOString(),
      content: post.content || "",
      tags: post.tags
        ? post.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [],
      author: post.author || "Anonim",
      image_url: post.image_url || "",
      featured: Boolean(post.featured),
      status: post.status,
      category: post.category || "Umum",
      lastModified: post.lastModified || post.date || new Date().toISOString(),
    }));
}