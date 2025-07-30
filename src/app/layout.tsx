import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Container } from "@/components/Container"

const Atkinson = localFont({
  src: [
    { path: "./fonts/atkinson-regular.woff", weight: '400', style: "normal" },
    { path: "./fonts/atkinson-bold.woff", weight: '600', style: "bold" },
  ],
})

export const metadata: Metadata = {
  title: {
    default: "Bima Akbar",
    template: "%s | Bima Akbar",
  },
  description: "Blog ringan dan cepat dengan Next.js",
  metadataBase: new URL("https://bimaakbar.vercel.app"),

  icons: {
    icon: "/favicon.ico",
    shortcut: "./favicon/icon0.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Bima Akbar",
    description: "Blog ringan dan cepat dengan Next.js",
    url: "https://bimaakbar.vercel.app",
    siteName: "Bima Akbar",
    images: [
      {
        url: "/images/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Bima Akbar",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bimaakbar",
    creator: "@bimaakbar",
    images: ["/images/open-graph.png"],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={Atkinson.className}
      suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <Container size="md">{children}</Container>
        <Footer />
      </body>
    </html>
  )
}
