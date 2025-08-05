import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy & Policy",
  description: "Kebijakan privasi situs Bima Akbar terkait pengumpulan, penggunaan, dan perlindungan data pengguna.",
}

export default function PrivacyPage() {
    return (
        <main className="relative border-x border-[var(--border)] mt-14 px-4">
            <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
            <article className="prose">
                <h1>Privacy Policy</h1>
                <p>
                Kami menghargai privasi Anda. Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
                dan melindungi data pribadi Anda saat menggunakan situs ini.
                </p>

                <h2>1. Data yang Kami Kumpulkan</h2>
                <p>
                Kami dapat mengumpulkan data seperti nama, alamat email, dan informasi lainnya yang Anda berikan
                secara langsung saat berinteraksi dengan situs ini. Kami juga menggunakan cookie untuk meningkatkan
                pengalaman pengguna.
                </p>

                <h2>2. Bagaimana Kami Menggunakan Data Anda</h2>
                <p>
                Data yang dikumpulkan digunakan untuk memproses permintaan Anda, meningkatkan layanan, dan memberikan 
                pembaruan yang relevan. Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga.
                </p>

                <h2>3. Perlindungan Data</h2>
                <p>
                Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi data Anda dari akses yang tidak sah,
                pengungkapan, atau kerusakan.
                </p>

                <h2>4. Perubahan Kebijakan Privasi</h2>
                <p>
                Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Setiap perubahan akan diumumkan di halaman ini.
                </p>

                <h2>5. Kontak Kami</h2>
                <p>
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami melalui halaman{" "}
                <a href="/contact">Contact</a>.
                </p>
            </article>
        </main>
    )
}