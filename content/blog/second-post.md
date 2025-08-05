---
title: Mengenal Dark Mode di Next.js
excerpt: Cara mengaktifkan dan mengatur dark mode dengan Tailwind dan Next.js.
coverImage: /assets/open-graph.png
date: 2025-08-05T23:33:00.000Z
author:
  name: Bima Akbar
  picture: /assets/avatar.avif
ogImage:
  url: /assets/open-graph.png
tags:
  - nextjs
  - seo
  - performance
category: Coding
publish: true
---
Artikel ini membahas bagaimana dark mode bisa diintegrasikan dengan class `.dark` di Next.js.

Contoh kode:

````tsx
document.documentElement.classList.add("dark")


---

### `content/blog/third-post.mdx`
```mdx
---
title: "Optimasi SEO di Next.js"
excerpt: "Panduan lengkap menggunakan Metadata API dan OpenGraph di Next.js 14+."
date: "2025-07-29"
cover: "/images/cover3.jpg"
---

SEO adalah salah satu hal terpenting untuk blog.  
Dengan **Next.js Metadata API**, kamu bisa menambahkan `title`, `description`, dan `OpenGraph`.  

Lanjutkan membaca untuk detailnya!
````