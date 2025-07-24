'use client';

import { useState } from 'react';

const initialForm = {
  id: crypto.randomUUID(),
  title: '',
  slug: '',
  description: '',
  content: '',
  category: '',
  tags: '',
  author: '',
  date: '',
  lastModified: '',
  cover: '',
  featured: false,
  status: 'DRAFT',
  canonicalUrl: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
};

export default function AddPostForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const target = e.target;

  const name = target.name;
  const type = target.type;
  const value = type === 'checkbox' && 'checked' in target ? (target as HTMLInputElement).checked : target.value;

  setForm(prev => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const payload = {
      ...form,
      tags: form.tags.trim().split(/\s+/),
      metaKeywords: form.metaKeywords.trim().split(/\s+/),
      featured: !!form.featured,
      status: form.status?.toUpperCase() || 'DRAFT',
      cover: !form.cover || form.cover === '(tidak ada)' ? null : form.cover.trim(),
      date: form.date || new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError('Gagal menyimpan postingan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold">Add New Blog Post</h1>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Posting berhasil disimpan!</p>}

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="input" />
      <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required className="input" />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" />
      <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required className="textarea" />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="input" />
      <input name="tags" placeholder="Tags (dipisah spasi)" value={form.tags} onChange={handleChange} className="input" />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} className="input" />
      <input name="date" placeholder="Date (YYYY-MM-DD)" type="date" value={form.date} onChange={handleChange} className="input" />
      <input name="cover" placeholder="Cover URL" value={form.cover} onChange={handleChange} className="input" />
      <input name="canonicalUrl" placeholder="Canonical URL" value={form.canonicalUrl} onChange={handleChange} className="input" />
      <input name="metaTitle" placeholder="Meta Title" value={form.metaTitle} onChange={handleChange} className="input" />
      <input name="metaDescription" placeholder="Meta Description" value={form.metaDescription} onChange={handleChange} className="input" />
      <input name="metaKeywords" placeholder="Meta Keywords (spasi)" value={form.metaKeywords} onChange={handleChange} className="input" />

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Featured?
        </label>

        <select name="status" value={form.status} onChange={handleChange} className="input">
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISH">PUBLISH</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  );
}
