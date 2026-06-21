export function BookCardSkeleton() {
  return (
    <div className="rounded-lg bg-surface border border-line overflow-hidden">
      <div className="aspect-[2/3] bg-elevated animate-pulse" />
      <div className="p-3.5 space-y-2">
        <div className="h-2 bg-elevated rounded-full w-14 animate-pulse" />
        <div className="h-4 bg-elevated rounded w-full animate-pulse" />
        <div className="h-4 bg-elevated rounded w-4/5 animate-pulse" />
        <div className="h-3 bg-elevated rounded w-1/2 animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="pt-1 h-4 bg-elevated rounded w-1/3 animate-pulse" style={{ animationDelay: '200ms' }} />
      </div>
    </div>
  )
}
