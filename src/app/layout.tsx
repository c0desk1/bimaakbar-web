// app/layout.tsx
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { ThemeScript } from "@/components/scripts/ThemeScript";

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <head>
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
