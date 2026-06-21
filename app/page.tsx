import Link from 'next/link'
import { HeroSection } from '@/components/HeroSection'
import { books, featuredIds, genres } from '@/lib/books'
import { BookCard } from '@/components/BookCard'

const featured = featuredIds.map((id) => books.find((b) => b.id === id)!).filter(Boolean)

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Featured books */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">
              Curated picks
            </p>
            <h2 className="font-display text-4xl font-semibold text-primary">
              Featured titles
            </h2>
          </div>
          <Link
            href="/browse"
            className="text-sm text-secondary hover:text-primary transition-colors hidden sm:block"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Genre grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-2">
            Browse by genre
          </p>
          <h2 className="font-display text-4xl font-semibold text-primary">
            Every category
          </h2>
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

      {/* CTA banner */}
      <section className="border-y border-line bg-surface">
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
