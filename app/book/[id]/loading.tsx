export default function Loading() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button skeleton */}
        <div className="h-4 w-32 bg-surface rounded animate-pulse mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Cover skeleton */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-64 sm:w-80 aspect-[2/3] rounded-xl bg-surface animate-pulse" />
          </div>

          {/* Details skeleton */}
          <div className="space-y-4">
            <div className="h-2.5 w-16 bg-surface rounded-full animate-pulse" />
            <div className="h-12 w-4/5 bg-surface rounded-lg animate-pulse" />
            <div className="h-12 w-2/3 bg-surface rounded-lg animate-pulse" style={{ animationDelay: '50ms' }} />
            <div className="h-6 w-1/3 bg-surface rounded animate-pulse" style={{ animationDelay: '100ms' }} />
            <div className="h-px bg-line mt-4 mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-surface rounded animate-pulse" />
              <div className="h-4 w-full bg-surface rounded animate-pulse" style={{ animationDelay: '50ms' }} />
              <div className="h-4 w-3/4 bg-surface rounded animate-pulse" style={{ animationDelay: '100ms' }} />
            </div>
            {/* Pricing cards skeleton */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-20 bg-surface rounded-lg animate-pulse" style={{ animationDelay: `${i * 75}ms` }} />
              ))}
            </div>
            <div className="h-12 w-full bg-surface rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
