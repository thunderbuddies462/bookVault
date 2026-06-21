'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { books, getCoverUrl } from '@/lib/books'

const HERO_POSITIONS = [
  { rotate: '-7deg', x: '-8%', y: '0%',  zIndex: 1, delay: 0.5  },
  { rotate: '2deg',  x: '16%', y: '-5%', zIndex: 2, delay: 0.25 },
  { rotate: '10deg', x: '42%', y: '4%',  zIndex: 3, delay: 0    },
]
const HERO_IDS = [27, 3, 9]
const HERO_BOOKS = HERO_IDS.map((id, i) => ({
  ...HERO_POSITIONS[i],
  book: books.find(b => b.id === id)!,
}))

export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const coverRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    function onScroll() {
      const rect = wrapper!.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)
      const max = wrapper!.offsetHeight - window.innerHeight
      const raw = max > 0 ? scrolled / max : 0
      const progress = Math.min(1, Math.max(0, raw))

      HERO_BOOKS.forEach((entry, i) => {
        const el = coverRefs[i].current
        if (!el) return
        const p = Math.min(1, Math.max(0, (progress - entry.delay * 0.5) * 2.5))
        el.style.opacity = String(p)
        el.style.transform = `translateY(${(1 - p) * 56}px) rotate(${entry.rotate})`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: '160vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div className="pt-16 lg:pt-0">
              <p
                className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-6 animate-fade-up"
                style={{ animationDelay: '0.1s', opacity: 0 }}
              >
                Premium Digital Library
              </p>
              <h1
                className="font-display font-semibold leading-none text-primary text-balance animate-fade-up"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', animationDelay: '0.2s', opacity: 0 }}
              >
                Read without
                <br />
                <span className="text-accent">limits.</span>
              </h1>
              <p
                className="mt-6 text-base text-secondary leading-relaxed max-w-md animate-fade-up"
                style={{ animationDelay: '0.35s', opacity: 0 }}
              >
                30 hand-curated titles spanning philosophy, science, fiction, and
                more. Buy to own or rent for a week — your library, your terms.
              </p>
              <div
                className="mt-10 flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: '0.5s', opacity: 0 }}
              >
                <Link
                  href="/browse"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
                >
                  Browse collection
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line text-sm font-medium text-primary hover:border-accent/50 transition-colors"
                >
                  Create account
                </Link>
              </div>
            </div>

            {/* Book covers — desktop only */}
            <div className="hidden lg:block relative h-[520px]">
              {HERO_BOOKS.map((entry, i) => (
                <div
                  key={entry.book.id}
                  ref={coverRefs[i]}
                  className="absolute w-52 rounded-lg overflow-hidden shadow-2xl shadow-black/60"
                  style={{
                    left: entry.x,
                    top: entry.y,
                    zIndex: entry.zIndex,
                    transform: `translateY(56px) rotate(${entry.rotate})`,
                    opacity: 0,
                    transformOrigin: 'center bottom',
                  }}
                >
                  <div className="aspect-[2/3] relative bg-elevated">
                    <Image
                      src={getCoverUrl(entry.book, 'M')}
                      alt=""
                      fill
                      className="object-cover"
                      priority={i === 2}
                      sizes="208px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
            style={{ animationDelay: '1.2s', opacity: 0 }}
          >
            <span className="text-[11px] uppercase tracking-widest text-secondary">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-line to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
