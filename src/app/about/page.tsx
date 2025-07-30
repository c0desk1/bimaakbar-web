export default function AboutPage() {
    return (
      <main className="py-16 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Tentang Saya</h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
          Halo! Saya <strong>Bima Akbar</strong>, seorang developer yang suka
          membangun website ringan, cepat, dan SEO-friendly dengan teknologi
          modern seperti <strong>Next.js</strong> dan <strong>MDX</strong>.
        </p>
        <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
          Blog ini saya buat untuk berbagi tips, tutorial, dan pengalaman seputar
          pengembangan web, UI/UX, dan teknologi yang saya gunakan sehari-hari.
        </p>
  
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Hubungi Saya</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:halo@bimaakbar.dev"
                className="text-[var(--accent)] hover:underline"
              >
                ✉️ halo@bimaakbar.dev
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/bimaakbar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                🐦 Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/bimaakbar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                💻 GitHub
              </a>
            </li>
          </ul>
        </div>
      </main>
    )
  }  