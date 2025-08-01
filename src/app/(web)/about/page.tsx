export default function AboutPage() {
    return (
      <main className="relative border-x border-[var(--border)] mt-14 px-4">
      <div className="absolute left-1/2 top-0 h-full border-l border-dashed border-[var(--border)] transform z-0 opacity-20" />
        <article className="prose">
          <h1>Tentang Saya</h1>
          <p>
            Halo! Saya <strong>Bima Akbar</strong>, seorang developer yang suka
            membangun website ringan, cepat, dan SEO-friendly dengan teknologi
            modern seperti <strong>Next.js</strong> dan <strong>MDX</strong>.
          </p>
          <p>
            Blog ini saya buat untuk berbagi tips, tutorial, dan pengalaman seputar
            pengembangan web, UI/UX, dan teknologi yang saya gunakan sehari-hari.
          </p>
        </article>
      </main>
    )
  }  