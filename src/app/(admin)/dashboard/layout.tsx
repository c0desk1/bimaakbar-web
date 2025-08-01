import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative border-x border-[var(--border)] gap-4">
      <Sidebar />
      {children}
    </main>
  );
}
