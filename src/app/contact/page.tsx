"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Buttons"
import {Breadcrumb} from "@/components/ui/Breadcrumb"
import Hero from "@/components/ui/Hero"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  return (
    <section className="relative mt-22 mb-22">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Kontak", href: "/contact" },
      ]} />
      <Hero
        title="Hubungi Saya"
        description="Punya pertanyaan atau sekadar menyapa? Silakan kirim pesan
        melalui form di bawah atau email saya"
        align="left">
          <Button
            variant="outline"
            size='sm'
            type="submit"
            disabled={loading}>
            <a href="mailto:contact@bimaakbar.my.id">
              Email
            </a>
          </Button>
      </Hero>
      {success ? (
        <div className="p-4 bg-green-100 text-green-700 rounded-[var(--radius)]">
          Pesan berhasil terkirim! Saya akan balas secepatnya.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-md font-medium mb-2">
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
            <label htmlFor="email" className="block text-md font-medium mb-2">
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
            <label htmlFor="message" className="block text-md font-medium mb-2">
              Pesan
            </label>
            <textarea
              id="message"
              rows={4}
              required
              className="w-full p-2 border border-[var(--border)] rounded-[var(--radius)] bg-[var(--background)]"
            ></textarea>
          </div>
          <Button
            variant="outline"
            size='md'
            type="submit"
            disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </Button>
        </form>
      )}
    </section>
  )
}
