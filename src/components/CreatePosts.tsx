'use client';

import { useState } from 'react';

type PostData = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  content: string;
  category: string;
  tags: string;
  author: string;
  date?: string;
  lastModified?: string;
  cover?: string;
  featured?: string;
  status?: string;
  canonicalUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
};

const INITIAL_DATA: PostData = {
  title: '',
  description: '',
  content: '',
  category: '',
  tags: '',
  author: '',
};

export default function CreatePost() {
  const [form, setForm] = useState<PostData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.content || !form.author) {
      setError('Mohon lengkapi minimal: judul, ringkasan, konten, dan penulis.');
      return;
    }

    setSubmitting(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: form })
      })

      const result = await res.json();

      if (result.success) {
        setSuccess(`✅ Post berhasil ditambahkan. ID: ${result.id}`);
        setForm(INITIAL_DATA);
      } else {
        setError(`❌ Gagal: ${result.error || 'Server tidak merespon dengan benar.'}`);
      }
    } catch (err: any) {
      setError('🚫 Gagal koneksi ke server. Cek URL endpoint dan status Web App Apps Script.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📝 Buat Postingan Baru</h1>

      <div className="space-y-4">
        {/* Input field utama */}
        {[
          { name: 'title', placeholder: 'Judul' },
          { name: 'slug', placeholder: 'Slug (opsional)' },
          { name: 'description', placeholder: 'Ringkasan' },
          { name: 'category', placeholder: 'Kategori' },
          { name: 'tags', placeholder: 'Tags (pisah koma)' },
          { name: 'author', placeholder: 'Penulis' },
          { name: 'cover', placeholder: 'URL gambar cover' },
          { name: 'featured', placeholder: 'Featured (yes/no)' },
          { name: 'status', placeholder: 'Status (draft/published)' },
          { name: 'canonicalUrl', placeholder: 'Canonical URL (opsional)' },
          { name: 'metaTitle', placeholder: 'Meta Title (SEO)' },
          { name: 'metaDescription', placeholder: 'Meta Description (SEO)' },
          { name: 'metaKeywords', placeholder: 'Meta Keywords (pisah koma)' },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            value={(form as any)[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full border px-3 py-2 rounded"
          />
        ))}

        <textarea
          name="content"
          placeholder="Konten lengkap postingan"
          value={form.content}
          onChange={handleChange}
          className="w-full border px-3 py-2 h-32 rounded"
        />

        <button onClick={handleSubmit} disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {submitting ? 'Mengirim...' : 'Submit'}
        </button>

        {success && <div className="text-green-600 font-semibold">{success}</div>}
        {error && <div className="text-red-600 font-semibold">{error}</div>}
      </div>

      {/* Preview */}
      <div className="bg-gray-50 p-4 rounded shadow mt-6">
        <h2 className="text-lg font-semibold mb-2">🔎 Preview Postingan</h2>
        <h1 className="text-xl font-bold">{form.title}</h1>
        <p><em>{form.description}</em></p>
        <p><strong>Author:</strong> {form.author} | <strong>Category:</strong> {form.category}</p>
        {form.cover && <img src={form.cover} alt="cover" className="max-w-full my-2" />}
        <div dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, '<br/>') }} />
        <p><strong>Status:</strong> {form.status || 'draft'}</p>
        <p><strong>Tags:</strong> {form.tags}</p>
      </div>
    </div>
  );
}
