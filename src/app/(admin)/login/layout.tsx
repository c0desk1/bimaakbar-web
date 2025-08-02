export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 dark:bg-black">
      {children}
    </main>
  );
}