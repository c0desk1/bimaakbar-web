//main
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Container } from "@/components/Container"

import "../globals.css"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container size="lg">{children}</Container>
      <Footer />
    </>
  )
}
