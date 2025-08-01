export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <aside className="w-[200px] bg-[#222] text-white p-4">
          <h2 className="text-lg font-semibold">Admin Menu</h2>
        </aside>
        {children}
      </>
  );
}
