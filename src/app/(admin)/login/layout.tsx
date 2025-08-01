// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="grid place-items-center justify-center min-h-dvh">
        {children}
      </main>
    </>
    
  );
}
