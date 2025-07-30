"use client"
import { useState } from "react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulasi submit form
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  return (
    <main className="py-16 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Hubungi Saya</h1>
      <p className="text-lg text-[var(--muted)] mb-8">
        Punya pertanyaan, kerjasama, atau sekadar menyapa? Silakan kirim pesan
        melalui form di bawah atau email saya di{" "}
        <a
          href="mailto:halo@bimaakbar.dev"
          className="text-[var(--accent)] hover:underline"
        >
          halo@bimaakbar.dev
        </a>
        .
      </p>

      {success ? (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          ✅ Pesan berhasil terkirim! Saya akan balas secepatnya.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nama
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full p-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Pesan
            </label>
            <textarea
              id="message"
              rows={4}
              required
              className="w-full p-2 border border-[var(--border)] rounded-md bg-[var(--background)]"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:opacity-80 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </form>
      )}
    </main>
  )
}
