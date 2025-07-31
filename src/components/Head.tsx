// components/HeadSection.tsx
import Head from "next/head"

export default function HeadSection() {
  return (
    <Head>
      <title>Bima Akbar</title>
      <meta name="description" content="Blog ringan dan cepat dengan Next.js" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preload" href="/globals.css" as="style" />
      <link rel="stylesheet" href="/globals.css" />
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