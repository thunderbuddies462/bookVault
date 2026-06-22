'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('bookvault-consent')) setVisible(true)
    } catch { /* blocked cookies */ }
  }, [])

  function accept() {
    try { localStorage.setItem('bookvault-consent', '1') } catch { /* */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5">
      <div className="max-w-3xl mx-auto bg-elevated border border-line rounded-xl shadow-2xl shadow-black/40 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-secondary leading-relaxed flex-1">
          By using bookVault you agree to our{' '}
          <Link href="/legal/terms" className="text-accent hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
          {' '}We use cookies to keep you signed in and remember your preferences.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={accept}
            className="px-4 py-2 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors"
          >
            Accept
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-full border border-line text-sm text-secondary hover:text-primary hover:border-accent/40 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
