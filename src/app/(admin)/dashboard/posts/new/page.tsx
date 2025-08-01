"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [publishedDate, setPublishedDate] = useState('');

  const handleTagClick = (tag: string) => {
    setTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isContentEmpty = !content.trim();

    if (isContentEmpty) {
      console.error('Konten tidak boleh kosong!');
      return;
    }

    console.log('Data post yang akan dikirim:', {
      title,
      slug,
      content,
      status,
      category,
      tags,
      publishedDate,
    });

    // Simulasi respons sukses
    const success = true;
    if (success) {
      // router.push(`/dashboard/posts/${slug}`);
      // Mengganti navigasi dengan pesan karena tidak ada `next/navigation`
      console.log('Post berhasil disimpan!');
      // Reset form
      setTitle('');
      setSlug('');
      setContent('');
      setCategory('');
      setTags([]);
      setPublishedDate('');
      setStatus('draft');
    } else {
      console.error('Gagal menyimpan post.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#0a0a0a] rounded-lg shadow-xl text-white font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">Buat Post Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white border border-[#333] focus:outline-none focus:border-purple-600"
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              setTitle(newTitle);
              
              setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white border border-[#333] focus:outline-none focus:border-purple-600"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white border border-[#333] focus:outline-none focus:border-purple-600"
            required
          >
            <option value="">-- Pilih Kategori --</option>
            {/* Opsi kategori akan diambil dari data dinamis (misalnya dari Google Sheets) */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tag</label>
          <div className="flex flex-wrap gap-2">
            {/* Tag akan diambil dari data dinamis (misalnya dari Google Sheets) */}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Konten</label>
          {/* Bagian ini akan menjadi Rich Text Editor Lexical.
              Karena keterbatasan lingkungan, kita menggunakan textarea sederhana sebagai pengganti.
              Dalam aplikasi Next.js asli, Anda akan menggunakan komponen Lexical di sini.
          */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white border border-[#333] focus:outline-none focus:border-purple-600 min-h-[200px]"
            required
            placeholder="Ketik konten post di sini..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Publikasi</label>
          <input
            type="date"
            className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white border border-[#333] focus:outline-none focus:border-purple-600"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white border border-[#333] focus:outline-none focus:border-purple-600"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
        >
          Simpan Post
        </button>
      </form>
    </div>
  );
}

