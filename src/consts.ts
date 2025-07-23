//src/consts.ts

import type { Site, Page, Links, Socials } from './types';

export const SITE: Site = {
  TITLE: "Bima Akbar",
  DESCRIPTION: "Selamat datang. Sampai nanti",
  AUTHOR: "Bima Akbar",
  OG_IMAGE: "/open-graph.png",
  AVATAR: '../assets/avatar.jpg',
}

export const HOME: Page = {
  TITLE: "Beranda",
  DESCRIPTION: "Selamat datang. Sampai nanti",
  OG_IMAGE: ''
}

export const ABOUT: Page = {
  TITLE: "Tentang",
  DESCRIPTION: "Tentang Saya",
  OG_IMAGE: ''
}

export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Menulis tentang topik yang saya minati.",
  OG_IMAGE: ''
}

export const CONTACT: Page = {
  TITLE: "Contact",
  DESCRIPTION: "Hubungi saya untuk kolaborasi, pertanyaan, atau sekadar menyapa.",
  OG_IMAGE: ''
}
  
export const PROJECTS: Page = {
  TITLE: "Proyek",
  DESCRIPTION: "Proyek terkini yang telah saya kerjakan.",
  OG_IMAGE: ''
}

export const TERMS: Page = {
  TITLE: "Ketentuan",
  DESCRIPTION: "Ketentuan",
  OG_IMAGE: ''
}

export const PRIVACY: Page = {
  TITLE: "Privasi",
  DESCRIPTION: "Privasi",
  OG_IMAGE: ''
}

export const REPORT: Page = {
  TITLE: "Report",
  DESCRIPTION: "Privasi",
  OG_IMAGE: ''
}

export const FEEDBACK: Page = {
  TITLE: "Feedback",
  DESCRIPTION: "Privasi",
  OG_IMAGE: ''
}

export const HELP: Page = {
  TITLE: "Help",
  DESCRIPTION: "Privasi",
  OG_IMAGE: ''
}

export const SUPPORT: Page = {
  TITLE: "Support",
  DESCRIPTION: "Privasi",
  OG_IMAGE: ''
}

export const ERROR: Page = {
  TITLE: "404",
  DESCRIPTION: "ERROR Halaman tidak ditemukan",
  OG_IMAGE: ''
}

export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
]

export const SOCIALS: Socials = [
  { 
    NAME: "TikTok",
    ICON: "ri-tiktok-line",
    TEXT: "Bima Akbar",
    HREF: "https://tiktok.com/@bimaakbarmusicc"
  },
  { 
    NAME: "Instagram",
    ICON: "ri-instagram-line",
    TEXT: "Bima Akbar",
    HREF: "https://instagram.com/notmesound",
  },
  {
    NAME: "Spotify",
    ICON: "ri-spotify-line",
    TEXT: "Bima Akbar",
    HREF: "https://open.spotify.com/artist/5ZLO25pWHVvAje7M6rVgUR",
  },
  { 
    NAME: "YouTube",
    ICON: "ri-youtube-line",
    TEXT: "Bima Akbar",
    HREF: "https://youtube.com/bimaakbarmusic",
  },
]
  