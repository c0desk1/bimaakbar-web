import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // Mengambil semua post dari koleksi 'blog'
  // Ganti 'blog' jika nama koleksi Anda berbeda
  const posts = await getCollection('blog');

  return rss({
    // (wajib) Judul RSS Feed Anda
    title: 'Blog | RSS Feed',
    // (wajib) Deskripsi singkat RSS Feed
    description: 'Ikuti update terbaru dari blog saya!',
    // (wajib) Mengambil URL situs dari konfigurasi Astro
    site: context.site,
    // (opsional) Daftar item feed.
    // Biasanya berisi postingan blog atau artikel
    items: posts.map((post) => ({
      // Judul post diambil dari frontmatter (data.title)
      title: post.data.title,
      // Tanggal publikasi post
      pubDate: post.data.pubDate,
      // Deskripsi singkat atau cuplikan post
      description: post.data.description,
      // Link unik ke postingan
      link: `/blog/${post.slug}/`,
    })),
    // (opsional) Bahasa kustom untuk feed
    customData: `<language>id-id</language>`,
  });
}