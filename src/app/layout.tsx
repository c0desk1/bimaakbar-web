import "./globals.css"
import { atkinson } from "@/lib/fonts"
import { siteMetadata } from "@/lib/metadata"
import { ThemeScript } from "@/components/scripts/ThemeScript"
import { Container } from "@/components/Container"
import Header from "@/components/Header"
import Footer from "@/components/Footer"


export const metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={atkinson.className}
      suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
      <ThemeScript />
      </head>
      <body className="antialiased">
        <Header />
        <Container size="lg">{children}</Container>
        <Footer />
      </body>
    </html>
  )
}
