//src/consts.ts

import type { Site, Page, Links, Socials } from './types';

export const SITE: Site = {
  TITLE: "Bima Akbar",
  DESCRIPTION: "Selamat datang. Sampai nanti",
  AUTHOR: "Bima Akbar",
  AVATAR: '../assets/avatar.jpg',
}

export const HOME: Page = {
  TITLE: "Beranda",
  DESCRIPTION: "Selamat datang. Sampai nanti",
}

export const ABOUT: Page = {
  TITLE: "Tentang",
  DESCRIPTION: "Tentang Saya",
}

export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Menulis tentang topik yang saya minati.",
}

export const CONTACT: Page = {
  TITLE: "Contact",
  DESCRIPTION: "Hubungi saya untuk kolaborasi, pertanyaan, atau sekadar menyapa.",
}

export const TERMS: Page = {
  TITLE: "Ketentuan",
  DESCRIPTION: "Ketentuan",
}

export const PRIVACY: Page = {
  TITLE: "Privasi",
  DESCRIPTION: "Privasi",
}

export const REPORT: Page = {
  TITLE: "Report",
  DESCRIPTION: "Privasi",
}

export const FEEDBACK: Page = {
  TITLE: "Feedback",
  DESCRIPTION: "Privasi",
}

export const HELP: Page = {
  TITLE: "Help",
  DESCRIPTION: "Privasi",
}

export const SUPPORT: Page = {
  TITLE: "Support",
  DESCRIPTION: "Privasi",
}

export const ERROR: Page = {
  TITLE: "404",
  DESCRIPTION: "ERROR Halaman tidak ditemukan",
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
  