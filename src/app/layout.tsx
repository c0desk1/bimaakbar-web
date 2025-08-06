// app/layout.tsx
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { ThemeScript } from "@/components/scripts/ThemeScript";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Container } from "@/components/Container"
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next';

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ThemeScript />
      </head>
      <GoogleTagManager gtmId="GTM-TJXJBGLX" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <Header />
        <Container size="lg">{children}</Container>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-ZHKJ22MFVE" />
    </html>
  );
}
