import { notFound } from 'next/navigation'
import { books, getBookById } from '@/lib/books'
import { getSample } from '@/lib/samples'
import { ReaderClient } from './ReaderClient'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return books.map((b) => ({ id: String(b.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const book = getBookById(Number(id))
  if (!book) return {}
  return { title: `Reading: ${book.title} — bookVault` }
}

export default async function ReadPage({ params }: Props) {
  const { id } = await params
  const book = getBookById(Number(id))
  if (!book) notFound()

  const sample = getSample(book.id)

  if (!sample) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-semibold text-primary mb-3">No sample available</h1>
        <p className="text-secondary mb-6">We don&apos;t have a reading sample for this title yet.</p>
        <Link
          href={`/book/${book.id}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
        >
          View book details
        </Link>
      </div>
    )
  }

  return <ReaderClient book={book} sample={sample} isOwned={false} />
}
