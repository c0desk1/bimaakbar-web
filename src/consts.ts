//src/consts.ts

import type { Site, Page, Links, Socials } from "./types"

export const SITE: Site = {
    TITLE: "Bima Akbar",
    DESCRIPTION: "Selamat datang. Sampai nanti",
    AUTHOR: "Bima Akbar",
}

export const BLOG: Page = {
    TITLE: "Blog",
    DESCRIPTION: "Menulis tentang topik yang saya minati.",
}
  
export const PROJECTS: Page = {
    TITLE: "Proyek",
    DESCRIPTION: "Proyek terkini yang telah saya kerjakan.",
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
    { 
      TEXT: "Projects", 
      HREF: "/projects", 
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
      NAME: "YouTube",
      ICON: "ri-youtube-line",
      TEXT: "Bima Akbar",
      HREF: "https://youtube.com/bimaakbarmusic",
    },
]
  