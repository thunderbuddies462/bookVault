'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { CurrencySelector } from './CurrencySelector'
import { ThemeToggle } from './ThemeToggle'
import { createClient } from '@/lib/supabase/client'
import { genres } from '@/lib/books'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export function Navbar() {
  const itemCount    = useCartStore((s) => s.items.length)
  const wishCount    = useWishlistStore((s) => s.ids.length)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [genreOpen, setGenreOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const genreRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) {
        setGenreOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  async function signOut() {
    const supabase = createClient()
    if (supabase) await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-line'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Brand */}
          <Link
            href="/"
            className="font-display text-lg sm:text-xl font-semibold tracking-tight text-primary shrink-0"
          >
            bookVault
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/browse"
              className="px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-md transition-colors"
            >
              Browse
            </Link>

            {/* Genres dropdown */}
            <div ref={genreRef} className="relative">
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors ${
                  genreOpen ? 'text-primary bg-elevated' : 'text-secondary hover:text-primary hover:bg-elevated'
                }`}
              >
                Genres
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${genreOpen ? 'rotate-180' : ''}`}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {genreOpen && (
                <div className="absolute left-0 top-full mt-2 w-44 bg-elevated border border-line rounded-lg shadow-2xl shadow-black/40 z-50 overflow-hidden animate-fade-in py-1">
                  {genres.map((g) => (
                    <Link
                      key={g}
                      href={`/browse?genre=${encodeURIComponent(g)}`}
                      onClick={() => setGenreOpen(false)}
                      className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface transition-colors"
                    >
                      {g}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/browse?sort=new"
              className="px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-md transition-colors"
            >
              New Arrivals
            </Link>

            <Link
              href="/library"
              className="px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-md transition-colors"
            >
              My Library
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-0.5">
            <ThemeToggle />
            <CurrencySelector />

            {/* Wishlist */}
            <Link
              href="/library"
              className="relative p-2 text-secondary hover:text-primary transition-colors rounded-md hover:bg-elevated"
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {wishCount > 9 ? '9+' : wishCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-secondary hover:text-primary transition-colors rounded-md hover:bg-elevated"
              aria-label="Cart"
            >
              <BagIcon />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Auth — desktop */}
            {user ? (
              <div className="hidden md:flex items-center gap-3 ml-1">
                <span className="text-xs text-secondary truncate max-w-28">
                  {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={signOut}
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:inline-flex ml-1 text-sm px-4 py-1.5 rounded-full bg-accent text-black font-semibold hover:bg-accent-alt transition-colors"
              >
                Sign in
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-secondary hover:text-primary hover:bg-elevated rounded-md transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-line">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            <Link
              href="/browse"
              className="flex items-center px-3 py-2.5 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Browse
            </Link>

            {/* Genres in mobile — show all as list */}
            <div className="px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-widest text-secondary mb-2">Genres</p>
              <div className="flex flex-wrap gap-1.5">
                {genres.map((g) => (
                  <Link
                    key={g}
                    href={`/browse?genre=${encodeURIComponent(g)}`}
                    onClick={() => setMenuOpen(false)}
                    className="px-2.5 py-1 text-xs rounded-full border border-line text-secondary hover:text-primary hover:border-accent/40 transition-colors"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/browse"
              className="flex items-center px-3 py-2.5 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              New Arrivals
            </Link>

            <Link
              href="/cart"
              className="flex items-center justify-between px-3 py-2.5 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="w-5 h-5 bg-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <div className="pt-2 mt-1 border-t border-line">
              {user ? (
                <>
                  <p className="px-3 py-1.5 text-xs text-secondary truncate">{user.email}</p>
                  <button
                    onClick={() => { setMenuOpen(false); signOut() }}
                    className="w-full text-left px-3 py-2.5 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-lg transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center px-3 py-2.5 text-sm text-secondary hover:text-primary hover:bg-elevated rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/sign-in"
                    className="flex items-center px-3 py-2.5 text-sm text-accent font-medium hover:bg-elevated rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
