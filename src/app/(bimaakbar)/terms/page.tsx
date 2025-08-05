import React from "react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Syarat dan ketentuan penggunaan situs Bima Akbar",
}

export default function TermsPage() {
  return (
    <main className="relative border-x border-[var(--border)] mt-14 px-4">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
      <article className="prose">
        <h1>Terms & Conditions</h1>
        <p>
          Dengan mengakses situs ini, Anda setuju untuk terikat oleh Syarat dan Ketentuan Penggunaan,
          hukum dan peraturan yang berlaku, dan setuju bahwa Anda bertanggung jawab untuk mematuhi hukum lokal yang relevan.
        </p>

        <h2>1. Penggunaan Situs</h2>
        <p>
          Konten yang tersedia di situs ini hanya untuk tujuan informasi dan pribadi. Anda tidak boleh menyalin,
          menggandakan, atau memanfaatkan materi tanpa izin tertulis dari pemilik situs.
        </p>

        <h2>2. Hak Kekayaan Intelektual</h2>
        <p>
          Seluruh konten seperti teks, desain, logo, dan gambar merupakan milik Bima Akbar dan dilindungi oleh hukum hak cipta.
        </p>

        <h2>3. Batas Tanggung Jawab</h2>
        <p>
          Kami tidak bertanggung jawab atas kerugian atau kerusakan akibat penggunaan situs ini atau ketidaktersediaan layanan.
        </p>

        <h2>4. Perubahan Ketentuan</h2>
        <p>
          Syarat dan ketentuan ini dapat diperbarui sewaktu-waktu. Perubahan akan ditampilkan di halaman ini tanpa pemberitahuan sebelumnya.
        </p>

        <h2>5. Kontak</h2>
        <p>
          Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami melalui halaman{" "}
          <a href="/contact">Contact</a>.
        </p>
      </article>
    </main>
  )
}
