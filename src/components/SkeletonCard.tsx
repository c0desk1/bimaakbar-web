// src/components/SkeletonCard.tsx
export default function SkeletonCard() {
    return (
        <div className="p-4 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] animate-pulse flex flex-col gap-2">
            <div className="flex justify-between">
            <div className="w-1/3 h-4 bg-[var(--color-hover)] rounded" />
            <div className="w-1/4 h-4 bg-[var(--color-hover)] rounded" />
            </div>
            <div className="h-5 w-4/5 bg-[var(--color-hover)] rounded" />
            <div className="h-4 w-full bg-[var(--color-hover)] rounded" />
            <div className="h-4 w-2/3 bg-[var(--color-hover)] rounded" />
            <div className="flex gap-2 mt-2">
            <div className="w-12 h-4 bg-[var(--color-hover)] rounded" />
            <div className="w-10 h-4 bg-[var(--color-hover)] rounded" />
            </div>
        </div>
    )
  }
  