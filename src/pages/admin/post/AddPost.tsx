'use client';

import { useState } from 'react';

export default function AddPost() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    date: '',
    description: '',
    tags: '',
    content: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
  
    const result = await res.json();
    console.log('Response dari server:', result);
  };
  

  return (
    <section className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tambah Postingan</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="title" placeholder="Judul" value={form.title} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="slug" placeholder="Slug (URL)" value={form.slug} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="category" placeholder="Kategori" value={form.category} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border px-3 py-2 rounded" />
        <textarea name="description" placeholder="Deskripsi singkat" value={form.description} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="tags" placeholder="Tag (pisahkan dengan koma)" value={form.tags} onChange={handleChange} className="border px-3 py-2 rounded" />
        <textarea name="content" placeholder="Isi konten (Markdown)" value={form.content} onChange={handleChange} className="border px-3 py-2 rounded h-40" />
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">Tambah Post</button>
      </form>
    </section>
  );
}
