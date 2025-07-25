//src/types/ts

export interface Site extends Page {
    author: string
    avatar: string
    url: string
}

export interface Heading {
    text: string;
    slug: string;
    depth: number;
}

export type Page = {
    title: string
    description: string
}

export type Links = {
    label: string;
    TEXT: string
    HREF: string
}[]

export type Socials = {
    NAME: string
    TEXT: string
    HREF: string
}[]

export interface Blog {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  tags: string[]
  author: string
  date: string
  lastModified: string
  cover: string | null
  featured: boolean
  status: 'PUBLISHED' | 'DRAFT'
  canonicalUrl: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
}