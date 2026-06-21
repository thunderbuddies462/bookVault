import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <p className="font-display text-xl font-semibold text-primary mb-3">
              bookVault
            </p>
            <p className="text-sm text-secondary leading-relaxed max-w-xs">
              A curated digital library of the world&apos;s most important books.
              Buy to own or rent for a day, a week, or a month.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-secondary mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-secondary hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-sm text-secondary hover:text-primary transition-colors">
                  Browse
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-secondary hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-secondary hover:text-primary transition-colors">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-secondary mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/legal/terms" className="text-sm text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-sm text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/refund" className="text-sm text-secondary hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary">
            &copy; {new Date().getFullYear()} bookVault. All rights reserved.
          </p>
          <p className="text-xs text-secondary">
            Prices in USD. Taxes may apply.
          </p>
        </div>
      </div>
    </footer>
  )
}
