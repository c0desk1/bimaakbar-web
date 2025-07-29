//src/consts.ts

import type { Site, Page, Links } from './types';

export const SITE: Site = {
  title: "Bima Akbar",
  description: "Selamat datang. Sampai nanti",
  author: "Bima Akbar",
  avatar: '../assets/avatar.jpg',
  url: 'https://bimaakbar.my.id',
}

export const HOME: Page = {
  title: "Home",
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
  title: "Kontak",
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

export const ERROR: Page = {
  title: "404",
  description: "ERROR Halaman tidak ditemukan",
}

export const Tags: Page = {
  title: "Tag Cloud",
  description: "Daftar tag yang digunakan diwebsite ini.",
}

export const LINKS: Links = [
  { 
    text: HOME.title,
    href: "/", 
    label: HOME.title
  },
  { 
    text: ABOUT.title,
    href: "/about", 
    label: ABOUT.title
  },
  { 
    text: BLOG.title, 
    href: "/blog", 
    label: BLOG.title
  },
  { 
    text: CONTACT.title, 
    href: "/contact", 
    label: CONTACT.title
  },
]