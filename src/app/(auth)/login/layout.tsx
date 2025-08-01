// src/app/(auth)/layout.tsx
import Footer from "@/components/Footer"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <main className="grid place-items-center justify-center min-h-dvh bg-[var(--background)] px-4">
      {children}
    </main>
    <Footer />
    </>
    
  );
}
