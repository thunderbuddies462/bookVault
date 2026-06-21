import { BookCardSkeleton } from '@/components/BookCardSkeleton'

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="pt-16 lg:pt-0 space-y-6">
              <div className="h-2.5 w-40 bg-surface rounded-full animate-pulse" />
              <div className="space-y-3">
                <div className="h-16 w-3/4 bg-surface rounded-lg animate-pulse" />
                <div className="h-16 w-1/2 bg-surface rounded-lg animate-pulse" style={{ animationDelay: '100ms' }} />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-surface rounded animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="h-4 w-5/6 bg-surface rounded animate-pulse" style={{ animationDelay: '200ms' }} />
              </div>
              <div className="flex gap-3 pt-2">
                <div className="h-11 w-40 bg-surface rounded-full animate-pulse" />
                <div className="h-11 w-36 bg-surface rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured grid skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-10">
          <div className="h-2.5 w-24 bg-surface rounded-full animate-pulse mb-3" />
          <div className="h-10 w-48 bg-surface rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  )
}
