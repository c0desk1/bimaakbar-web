export default function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col justify-between h-full w-full text-left p-4 gap-2 border rounded-xl bg-[var(--color-bg)] border-[var(--color-border)]">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex justify-between items-center mb-1">
          <div className="h-3 w-24 rounded bg-[var(--color-hover)]" />
          <div className="h-5 w-16 rounded-full bg-[var(--color-hover)]" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-4 w-2/3 rounded bg-[var(--color-hover)]" />
          <div className="h-4 w-1/3 rounded bg-[var(--color-hover)]" />
        </div>
        <div className="my-2 space-y-2">
          <div className="h-3 w-full rounded bg-[var(--color-hover)]" />
          <div className="h-3 w-5/6 rounded bg-[var(--color-border-hover)]" />
        </div>
        <ul className="flex flex-wrap mt-auto gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="h-6 w-14 rounded-lg bg-[var(--color-hover)]"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
