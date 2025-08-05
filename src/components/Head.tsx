// components/Head.tsx
import Head from "next/head"

export default function HeadSection() {
  return (
    <Head>
      <title>Bima Akbar</title>
      <meta name="description" content="Selamat datang. Sampai nanti." />
      <meta property="article:published_time"></meta>
      <link rel="icon" href="/favicon.ico" />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function() {
            const theme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (theme === 'dark' || (!theme && prefersDark)) {
              document.documentElement.classList.add('dark');
            }
          })();`,
        }}
      />
    </Head>
  )
}