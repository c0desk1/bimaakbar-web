//src/consts.ts

import type { Site, Page, Links, Socials } from './types';

export const SITE: Site = {
  title: "Bima Akbar",
  description: "Selamat datang. Sampai nanti",
  author: "Bima Akbar",
  avatar: '../assets/avatar.jpg',
  url: 'https://bimaakbar.my.id',
}

export const HOME: Page = {
  title: SITE.title,
  description: SITE.description,
}

export const ABOUT: Page = {
  title: "Tentang",
  description: "Tentang Saya",
}

export const BLOG: Page = {
  title: "Blog",
  description: "Menulis tentang topik yang saya minati.",
}

export const CONTACT: Page = {
  title: "Contact",
  description: "Hubungi saya untuk kolaborasi, pertanyaan, atau sekadar menyapa.",
}

export const TERMS: Page = {
  title: "Ketentuan",
  description: "Ketentuan",
}

export const PRIVACY: Page = {
  title: "Privasi",
  description: "Privasi",
}

export const REPORT: Page = {
  title: "Report",
  description: "Privasi",
}

export const FEEDBACK: Page = {
  title: "Feedback",
  description: "Privasi",
}

export const HELP: Page = {
  title: "Help",
  description: "Privasi",
}

export const SUPPORT: Page = {
  title: "Support",
  description: "Privasi",
}

export const ERROR: Page = {
  title: "404",
  description: "ERROR Halaman tidak ditemukan",
}

export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
    label: "Home"
  },
  { 
    TEXT: "About", 
    HREF: "/about", 
    label: "About"
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
    label: "Blog"
  },
]

export const SOCIALS: Socials = [
  { 
    NAME: "TikTok",
    TEXT: "Bima Akbar",
    HREF: "https://tiktok.com/@bimaakbarmusicc"
  },
  { 
    NAME: "Instagram",
    TEXT: "Bima Akbar",
    HREF: "https://instagram.com/notmesound",
  },
  {
    NAME: "Spotify",
    TEXT: "Bima Akbar",
    HREF: "https://open.spotify.com/artist/5ZLO25pWHVvAje7M6rVgUR",
  },
  { 
    NAME: "YouTube",
    TEXT: "Bima Akbar",
    HREF: "https://youtube.com/bimaakbarmusic",
  },
]
  