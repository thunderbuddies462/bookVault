import Link from 'next/link'
import { HeroSection } from '@/components/HeroSection'
import { books, featuredIds, genres } from '@/lib/books'
import { BookCard } from '@/components/BookCard'
import { FeaturedSpotlight } from '@/components/FeaturedSpotlight'
import { AnimatedGrid } from '@/components/AnimatedGrid'
import { LISTS } from '@/lib/lists'
import { BUNDLES, getBundlePrice } from '@/lib/bundles'
import { formatPrice } from '@/lib/currency'

const featured = featuredIds.map((id) => books.find((b) => b.id === id)!).filter(Boolean)
const heroBook  = featured[0]
const spotlightRest = featured.slice(1, 7)
const newArrivals = books.slice(-8)

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── Featured spotlight ───────────────────────────────── */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Curated picks</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary">Featured titles</h2>
          </div>
          <Link href="/browse" className="text-sm text-secondary hover:text-primary transition-colors hidden sm:block">
            View all &rarr;
          </Link>
        </div>
        <FeaturedSpotlight hero={heroBook} rest={spotlightRest} />
      </section>

      {/* ── Staff picks rail ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Editorial</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary">Curated collections</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LISTS.slice(0, 3).map((list) => {
            const listBooks = list.bookIds.slice(0, 4).map((id) => books.find((b) => b.id === id)!).filter(Boolean)
            return (
              <Link
                key={list.slug}
                href={`/lists/${list.slug}`}
                className="group relative overflow-hidden rounded-xl border border-line bg-surface hover:border-accent/30 transition-all duration-300 p-5 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
              >
                <span className="inline-block text-[10px] font-medium uppercase tracking-widest text-accent border border-accent/30 rounded-full px-2 py-0.5 mb-3">
                  {list.tag}
                </span>
                <h3 className="font-display text-lg font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                  {list.title}
                </h3>
                <p className="text-xs text-secondary line-clamp-2 mb-4">{list.description}</p>
                <div className="flex -space-x-2">
                  {listBooks.map((b) => (
                    <div
                      key={b.id}
                      className="w-8 h-12 rounded overflow-hidden border border-line flex-shrink-0"
                      style={{ background: 'linear-gradient(150deg,#33302a,#1a1410)' }}
                      title={b.title}
                    />
                  ))}
                  <div className="w-8 h-12 rounded border border-line bg-elevated flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] text-secondary font-mono">+{list.bookIds.length - 4}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Bundles ──────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Value packs</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-primary">Curated bundles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUNDLES.map((bundle) => {
              const pricing = getBundlePrice(bundle, books)
              return (
                <div
                  key={bundle.id}
                  className="rounded-xl border border-line bg-surface p-4 hover:border-accent/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-accent">Bundle</span>
                    <span className="text-[10px] font-mono text-green-400 bg-green-400/10 rounded px-1.5 py-0.5">
                      -{bundle.discountPct}%
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-primary mb-1">{bundle.title}</h3>
                  <p className="text-xs text-secondary mb-3 line-clamp-2">{bundle.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-sm font-medium text-primary tabular-nums">
                      {formatPrice(pricing.discounted, 'US')}
                    </span>
                    <span className="font-mono text-xs text-muted line-through tabular-nums">
                      {formatPrice(pricing.original, 'US')}
                    </span>
                  </div>
                  <p className="text-xs text-secondary mt-1">{bundle.bookIds.length} books</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── New arrivals ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Just added</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary">New arrivals</h2>
          </div>
          <Link href="/browse?sort=newest" className="text-sm text-secondary hover:text-primary transition-colors hidden sm:block">
            See all &rarr;
          </Link>
        </div>
        <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {newArrivals.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </AnimatedGrid>
      </section>

      {/* ── Genre grid ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">Browse by genre</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary">Every category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {genres.map((genre) => {
            const count = books.filter((b) => b.genre === genre).length
            return (
              <Link
                key={genre}
                href={`/browse?genre=${encodeURIComponent(genre)}`}
                className="group relative overflow-hidden rounded-lg border border-line bg-surface hover:border-accent/40 transition-all duration-300 p-5"
              >
                <p className="font-display text-xl font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                  {genre}
                </p>
                <p className="text-xs text-secondary">{count} books</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-primary mb-4">
            Your library, your terms.
          </h2>
          <p className="text-base text-secondary max-w-lg mx-auto mb-8">
            Buy to own forever or rent for as little as a day. No subscriptions
            required — pay only for what you read.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
          >
            Browse all 30 titles
          </Link>
        </div>
      </section>
    </>
  )
}
