export default function SkeletonArticle() {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-3/4 bg-[var(--color-hover)] rounded" />
        <div className="h-6 w-1/2 bg-[var(--color-border-hover)] rounded" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-[var(--color-hover)] rounded" />
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 w-5/6 bg-[var(--color-border-hover)] rounded" />
          ))}
        </div>
      </div>
    );
  }
  
