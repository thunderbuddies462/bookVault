'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { CurrencySelector } from './CurrencySelector'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export function Navbar() {
  const itemCount = useCartStore((s) => s.items.length)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
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
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-primary"
          >
            bookVault
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/browse"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Browse
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <CurrencySelector />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-secondary hover:text-primary transition-colors"
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
              <div className="hidden md:flex items-center gap-3 ml-2">
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
                className="hidden md:inline-flex ml-2 text-sm px-4 py-1.5 rounded-full bg-accent text-black font-medium hover:bg-accent-alt transition-colors"
              >
                Sign in
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
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
        <div className="md:hidden bg-surface border-b border-line">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link
              href="/browse"
              className="block px-2 py-2 text-sm text-secondary hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/cart"
              className="block px-2 py-2 text-sm text-secondary hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
            <div className="pt-2 border-t border-line">
              {user ? (
                <button
                  onClick={() => { setMenuOpen(false); signOut() }}
                  className="block w-full text-left px-2 py-2 text-sm text-secondary hover:text-primary transition-colors"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-2 py-2 text-sm text-secondary hover:text-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/sign-in"
                    className="block px-2 py-2 text-sm text-accent font-medium hover:text-accent-alt transition-colors"
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
