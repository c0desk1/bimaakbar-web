// app/layout.tsx
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { ThemeScript } from "@/components/scripts/ThemeScript";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Container } from "@/components/Container"

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
<meta name="google-site-verification" content="kho65u9v63Iyq-j3KpnIKChy0yh_vVLZhzCrBDpnVVs" />
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
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header />
      <Container size="lg">{children}</Container>
      <Footer />
      </body>
    </html>
  );
}