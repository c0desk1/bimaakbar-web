// types/index.ts atau di mana pun kamu tempatkan

export interface PostMeta {
    slug: string
    title: string
    excerpt: string
    date: string
    coverImage?: string
    category?: string
    tags?: string[]
    publish?: boolean
    author?: {
      name: string
      picture?: string
    }
    ogImage?: {
      url: string
    }
  }
  