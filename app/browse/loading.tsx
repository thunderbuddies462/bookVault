import { BookCardSkeleton } from '@/components/BookCardSkeleton'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-2.5 w-20 bg-surface rounded-full animate-pulse mb-3" />
        <div className="h-12 w-40 bg-surface rounded-lg animate-pulse" />
      </div>

      {/* Search skeleton */}
      <div className="h-12 w-full bg-surface rounded-lg animate-pulse mb-8" />

      {/* Genre pill skeletons */}
      <div className="flex gap-2 mb-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-8 rounded-full bg-surface animate-pulse"
            style={{ width: `${60 + (i % 3) * 20}px`, animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
