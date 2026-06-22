'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Book } from '@/lib/books'
import type { Sample } from '@/lib/samples'

interface ReaderClientProps {
  book: Book
  sample: Sample
  isOwned: boolean
}

type ReaderTheme = 'dark' | 'sepia' | 'light'
type FontFamily = 'serif' | 'sans'

const THEMES: Record<ReaderTheme, { bg: string; text: string; secondary: string; border: string }> = {
  dark:  { bg: '#0c0a09', text: '#f5f0ea', secondary: '#9e9284', border: '#33302a' },
  sepia: { bg: '#f4ede0', text: '#2d1f0f', secondary: '#7a6044', border: '#d4c4aa' },
  light: { bg: '#ffffff', text: '#1a1410', secondary: '#6b5c4a', border: '#e5ddd0' },
}

export function ReaderClient({ book, sample, isOwned }: ReaderClientProps) {
  const [fontSize, setFontSize] = useState(17)
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif')
  const [theme, setTheme]       = useState<ReaderTheme>('dark')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const key = `reader-progress-${book.id}`
    const saved = localStorage.getItem(key)
    if (saved) setProgress(Number(saved))
  }, [book.id])

  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current
      if (!el) return
      const rect    = el.getBoundingClientRect()
      const total   = el.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.min(1, Math.max(0, scrolled / total))
      setProgress(p)
      localStorage.setItem(`reader-progress-${book.id}`, String(p))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [book.id])

  const t = THEMES[theme]
  const fontStyle = fontFamily === 'serif'
    ? "'Cormorant Garamond', Georgia, serif"
    : "'Plus Jakarta Sans', system-ui, sans-serif"

  const paragraphs = sample.content.split('\n\n')

  return (
    <div style={{ background: t.bg, minHeight: '100vh', color: t.text, transition: 'background 0.3s, color 0.3s' }}>

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-50 transition-all duration-150"
        style={{ width: `${progress * 100}%`, background: '#c9a448' }}
      />

      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 h-12 backdrop-blur-md"
        style={{ background: `${t.bg}e0`, borderBottom: `1px solid ${t.border}` }}
      >
        <Link
          href={`/book/${book.id}`}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: t.secondary }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span className="hidden sm:inline">{book.title}</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <p className="text-xs font-medium" style={{ color: t.secondary }}>
          {Math.round(progress * 100)}% · {sample.chapterTitle.split('—')[0].trim()}
        </p>

        <button
          onClick={() => setSettingsOpen((s) => !s)}
          className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
          style={{ color: t.secondary }}
          aria-label="Reader settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>
      </header>

      {/* Settings panel */}
      {settingsOpen && (
        <div
          className="fixed top-12 right-4 z-40 rounded-xl p-4 shadow-2xl w-64"
          style={{ background: t.bg, border: `1px solid ${t.border}` }}
        >
          {/* Font size */}
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: t.secondary }}>Font size</p>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setFontSize((s) => Math.max(14, s - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-opacity hover:opacity-70"
              style={{ border: `1px solid ${t.border}`, color: t.text }}
            >−</button>
            <span className="flex-1 text-center text-sm font-mono" style={{ color: t.text }}>{fontSize}px</span>
            <button
              onClick={() => setFontSize((s) => Math.min(24, s + 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-opacity hover:opacity-70"
              style={{ border: `1px solid ${t.border}`, color: t.text }}
            >+</button>
          </div>

          {/* Font family */}
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: t.secondary }}>Font</p>
          <div className="flex gap-2 mb-4">
            {(['serif', 'sans'] as FontFamily[]).map((f) => (
              <button
                key={f}
                onClick={() => setFontFamily(f)}
                className="flex-1 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  border: `1px solid ${fontFamily === f ? '#c9a448' : t.border}`,
                  color: fontFamily === f ? '#c9a448' : t.secondary,
                  fontFamily: f === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                }}
              >
                {f === 'serif' ? 'Serif' : 'Sans'}
              </button>
            ))}
          </div>

          {/* Theme */}
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: t.secondary }}>Theme</p>
          <div className="flex gap-2">
            {(['dark', 'sepia', 'light'] as ReaderTheme[]).map((th) => (
              <button
                key={th}
                onClick={() => setTheme(th)}
                className="flex-1 py-1.5 rounded-lg text-xs capitalize transition-all"
                style={{
                  background: THEMES[th].bg,
                  color: THEMES[th].text,
                  border: `1px solid ${theme === th ? '#c9a448' : t.border}`,
                  outline: theme === th ? '1px solid #c9a448' : 'none',
                }}
              >
                {th}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <main ref={contentRef} className="pt-20 pb-32 mx-auto px-6" style={{ maxWidth: '65ch' }}>
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: '#c9a448' }}>{book.genre}</p>
          <h1 className="mb-2 font-display text-3xl sm:text-4xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: t.text }}>{book.title}</h1>
          <p className="text-sm" style={{ color: t.secondary }}>{book.author}</p>
          <p className="mt-3 text-xs" style={{ color: t.secondary }}>~{sample.readingTime} min read · {sample.chapterTitle}</p>
        </div>

        <div
          className="prose"
          style={{
            fontFamily: fontStyle,
            fontSize: `${fontSize}px`,
            lineHeight: '1.8',
            color: t.text,
          }}
        >
          {paragraphs.map((para, i) => {
            if (para.startsWith('# ')) {
              return <h2 key={i} className="font-display text-2xl font-semibold mt-10 mb-4" style={{ color: t.text }}>{para.slice(2)}</h2>
            }
            if (para.startsWith('## ')) {
              return <h3 key={i} className="font-display text-xl font-semibold mt-8 mb-3" style={{ color: t.text }}>{para.slice(3)}</h3>
            }
            if (para === '---') {
              return <hr key={i} className="my-8 border-0" style={{ borderTop: `1px solid ${t.border}` }} />
            }
            if (para.startsWith('**') && para.endsWith('**')) {
              return <p key={i} className="font-semibold my-4" style={{ color: t.text }}>{para.slice(2, -2)}</p>
            }
            return <p key={i} className="my-4" style={{ color: t.text }}>{para}</p>
          })}
        </div>

        {/* Sample end gate */}
        {!isOwned && (
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ border: `1px solid ${t.border}`, background: theme === 'dark' ? '#171410' : theme === 'sepia' ? '#ede3d0' : '#f5f5f5' }}
          >
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#c9a448' }}>End of sample</p>
            <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: t.text }}>
              Enjoying {book.title}?
            </h3>
            <p className="text-sm mb-6" style={{ color: t.secondary }}>
              Purchase to unlock the full {book.pages}-page book — buy to own forever, or rent for 7 or 30 days.
            </p>
            <Link
              href={`/book/${book.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-accent text-black hover:bg-accent-alt transition-colors"
            >
              Get full access
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
