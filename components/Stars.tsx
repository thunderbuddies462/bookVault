interface StarsProps {
  rating: number // 0–5, supports halves
  size?: 'sm' | 'md'
  showNumber?: boolean
  count?: number
}

export function Stars({ rating, size = 'sm', showNumber = false, count }: StarsProps) {
  const sz = size === 'sm' ? 12 : 16
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = rating >= i + 1
    const half = !filled && rating >= i + 0.5
    return { filled, half }
  })

  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex items-center gap-0.5">
        {stars.map((s, i) => (
          <svg key={i} width={sz} height={sz} viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={s.filled ? 'currentColor' : s.half ? `url(#half-${i})` : 'transparent'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            />
          </svg>
        ))}
      </span>
      {showNumber && (
        <span className="text-xs text-secondary tabular-nums">
          {rating.toFixed(1)}{count !== undefined ? ` (${count})` : ''}
        </span>
      )}
    </span>
  )
}
