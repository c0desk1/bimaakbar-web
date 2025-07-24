export interface Site extends Page {
    AUTHOR: string
    AVATAR: string
}

export interface Heading {
    text: string;
    slug: string;
    depth: number;
}

export type Page = {
    TITLE: string
    DESCRIPTION: string
    OG_IMAGE: string
}

export type Links = {
    TEXT: string
    HREF: string
}[]

export type Socials = {
    NAME: string
    ICON: string
    TEXT: string
    HREF: string
}[]

export type Blog = {
    id: string;
    title: string;
    slug: string;
    description?: string;
    content?: string;
    category?: string;
    tags: string[];
    author: string;
    date: string | Date;
    lastModified: string | Date;
    cover: string | null;
    featured: boolean;
    status: string;
    canonicalUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];  
}
    