// app/layout.tsx
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { ThemeScript } from "@/components/scripts/ThemeScript";
import { Analytics } from '@vercel/analytics/next';
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Container } from "@/components/Container"

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Analytics />
      <Header />
        <main>
          <Container size="lg">{children}</Container>
        </main>
      <Footer />
      </body>
    </html>
  );
}
