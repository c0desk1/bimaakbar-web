// app/layout.tsx
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Container } from "@/components/Container"
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next';
import { ThemeScript } from "@/components/scripts/ThemeScript";

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <GoogleTagManager gtmId="GTM-TJXJBGLX" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Analytics />
        <Header />
        <Container size="md">{children}</Container>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-ZHKJ22MFVE" />
    </html>
  );
}
