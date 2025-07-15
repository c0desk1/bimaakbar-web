//src/consts.ts

import type { Site, Page, Links, Socials } from "./types"

export const SITE: Site = {
    TITLE: "Bima Akbar",
    DESCRIPTION: "Welcome to Astro Sphere, a portfolio and blog for designers and developers.",
    AUTHOR: "Bima Akbar",
}

export const BLOG: Page = {
    TITLE: "Blog",
    DESCRIPTION: "Writing on topics I am passionate about.",
}
  
export const PROJECTS: Page = {
    TITLE: "Projects",
    DESCRIPTION: "Recent projects I have worked on.",
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
      NAME: "Email",
      ICON: "ri-mail-line", 
      TEXT: "markhorn.dev@gmail.com",
      HREF: "mailto:markhorn.dev@gmail.com",
    },
    { 
      NAME: "Github",
      ICON: "ri-github-line",
      TEXT: "markhorn-dev",
      HREF: "https://github.com/markhorn-dev/astro-sphere"
    },
    { 
      NAME: "LinkedIn",
      ICON: "ri-linkedin-line",
      TEXT: "markhorn-dev",
      HREF: "https://www.linkedin.com/in/markhorn-dev/",
    },
    { 
      NAME: "Twitter",
      ICON: "ri-twitter-x-line",
      TEXT: "markhorn_dev",
      HREF: "https://twitter.com/markhorn_dev",
    },
]
  