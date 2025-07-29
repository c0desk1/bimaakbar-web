//src/types/ts

export interface Site extends Page {
    author: string
    avatar: string
    url: string
}
export type Page = {
    title: string
    description: string
}
export type Links = {
    label: string;
    text: string
    href: string
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