export default function CardSkeleton() {
    return (
      <div className="animate-pulse space-y-3">
        <div className="rounded-[var(--radius)] bg-[var(--muted)] aspect-video w-full" />
        <div className="flex justify-between items-center text-sm mt-2">
          <div className="h-4 w-20 rounded bg-[var(--muted)]" />
          <div className="h-4 w-16 rounded bg-[var(--muted)]" />
        </div>
        <div className="h-6 w-3/4 rounded bg-[var(--muted)]" />
        <div className="h-4 w-full rounded bg-[var(--muted)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--muted)]" />
      </div>
    )
  }
  