'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Blog } from '../../../types';

export default function AddPost() {
  const [form, setForm] = useState<Partial<Blog>>({
    title: '',
    slug: '',
    author: '',
    category: '',
    date: '',
    description: '',
    tags: [],
    cover: '',
    content: '',
    status: 'PUBLISH'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'tags'
        ? value.split(',').map((tag) => tag.trim())
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setSuccess('✅ Post berhasil ditambahkan!');
      setForm({
        title: '',
        slug: '',
        author: '',
        category: '',
        date: '',
        description: '',
        tags: [],
        cover: '',
        content: '',
        status: 'PUBLISH'
      });
    } catch {
      alert('❌ Gagal menambahkan post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">📝 Tambah Post Baru</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input name="title" required placeholder="Judul" value={form.title} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="slug" required placeholder="Slug (tanpa spasi)" value={form.slug} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="author" required placeholder="Penulis" value={form.author} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="category" required placeholder="Kategori" value={form.category} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="date" type="date" value={form.date?.toString()} onChange={handleChange} className="border px-3 py-2 rounded" />
        <textarea name="description" placeholder="Deskripsi singkat" value={form.description} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="tags" placeholder="Tag (pisah koma)" value={form.tags?.join(', ')} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="cover" placeholder="URL Cover (opsional)" value={form.cover || ''} onChange={handleChange} className="border px-3 py-2 rounded" />

        {/* Markdown Editor */}
        <div>
          <label className="block text-sm font-medium mb-2">Konten Markdown</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Tulis konten di sini..."
              className="border rounded px-3 py-2 h-[300px] resize-none"
            />
            <div className="border rounded p-3 bg-gray-50 dark:bg-neutral-900 overflow-auto">
              <ReactMarkdown>{form.content || ''}</ReactMarkdown>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Mengirim...' : 'Tambah Post'}
        </button>

        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </section>
  );
}
