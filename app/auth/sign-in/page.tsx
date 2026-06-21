'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignInPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (err) {
      setError(err.message)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-semibold text-primary mb-3">
            Check your inbox
          </h1>
          <p className="text-sm text-secondary mb-8">
            We sent a confirmation link to <strong className="text-primary">{email}</strong>.
            Click it to activate your account.
          </p>
          <Link
            href="/auth/login"
            className="text-sm text-accent hover:text-accent-alt transition-colors"
          >
            Back to log in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <Link href="/" className="font-display text-2xl font-semibold text-primary">
            bookVault
          </Link>
          <h1 className="font-display text-3xl font-semibold text-primary mt-6 mb-2">
            Create account
          </h1>
          <p className="text-sm text-secondary">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent hover:text-accent-alt transition-colors">
              Log in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-secondary uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-line text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary uppercase tracking-wide mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-line text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-secondary uppercase tracking-wide mb-1.5">
              Confirm password
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat your password"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-line text-sm text-primary placeholder:text-secondary focus:outline-none focus:border-accent/60 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent-alt transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-xs text-secondary text-center mt-8 leading-relaxed">
          By creating an account you agree to our{' '}
          <Link href="/legal/terms" className="text-primary hover:text-accent transition-colors">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/legal/privacy" className="text-primary hover:text-accent transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
