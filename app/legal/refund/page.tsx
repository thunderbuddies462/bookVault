import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'bookVault Refund Policy — when and how we process refunds for purchases and rentals.',
}

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">Legal</p>
      <h1 className="font-display text-5xl font-semibold text-primary mb-3">Refund Policy</h1>
      <p className="text-sm text-secondary mb-12">Last updated: 21 June 2026</p>

      <div className="space-y-10">

        <Section title="1. General Policy">
          <p>Because bookVault sells digital content, all sales are generally final. Once you have downloaded or accessed digital content, we are unable to offer a refund under standard circumstances. This policy is consistent with digital goods regulations in most jurisdictions and mirrors industry practice among ebook platforms.</p>
          <p>However, we believe in fair treatment and will evaluate all refund requests on a case-by-case basis. Exceptions are detailed in the sections below.</p>
        </Section>

        <Section title="2. Purchased Ebooks (Buy)">
          <p>A refund may be issued for a purchased ebook if:</p>
          <ul>
            <li>You request a refund within <strong className="text-primary">72 hours</strong> of purchase, and</li>
            <li>The content has not been downloaded or opened (as determined by our access logs).</li>
          </ul>
          <p>After 72 hours or after the content has been accessed, purchases are non-refundable. Refunds will not be granted because you changed your mind, found the book elsewhere at a lower price, or no longer wish to read it.</p>
        </Section>

        <Section title="3. Rented Ebooks (Rent 7 or Rent 30 Days)">
          <p>Rental fees are non-refundable once the rental period has begun. The rental period begins immediately upon payment. A refund may be issued only if:</p>
          <ul>
            <li>You have not accessed the content within <strong className="text-primary">24 hours</strong> of the rental start time, and</li>
            <li>You contact support within those 24 hours requesting cancellation.</li>
          </ul>
          <p>After 24 hours of rental access or after the content has been opened, no refund will be issued regardless of how much of the rental period remains.</p>
        </Section>

        <Section title="4. Technical Issues">
          <p>If you experience a genuine technical problem that prevents you from accessing content you paid for — such as a platform error, corrupted file delivery, or access failure not attributable to your device or internet connection — you are entitled to a full refund or replacement, regardless of the above time limits.</p>
          <p>To qualify under this provision you must:</p>
          <ul>
            <li>Report the issue to support@bookvault.app within <strong className="text-primary">7 days</strong> of purchase or rental.</li>
            <li>Provide reasonable details (screenshots, error messages) to help us diagnose the problem.</li>
            <li>Allow us a reasonable opportunity (up to 48 hours) to resolve the technical issue before a refund is issued.</li>
          </ul>
        </Section>

        <Section title="5. Duplicate Purchases">
          <p>If you accidentally purchase or rent the same title twice within a 24-hour period, contact us at support@bookvault.app with both order references. We will refund the duplicate charge in full.</p>
        </Section>

        <Section title="6. How to Request a Refund">
          <p>To request a refund, email <strong className="text-primary">support@bookvault.app</strong> with the subject line &quot;Refund Request — [Order ID]&quot;. Include:</p>
          <ul>
            <li>Your account email address.</li>
            <li>The order or transaction ID (found in your confirmation email).</li>
            <li>The title of the book.</li>
            <li>The reason for your refund request.</li>
          </ul>
        </Section>

        <Section title="7. Processing Time">
          <p>Approved refunds are processed within <strong className="text-primary">5–7 business days</strong>. The refund will be issued to the original payment method. Depending on your bank or card issuer, it may take an additional 3–5 business days to appear on your statement. We are unable to process refunds to a different payment method than the one used for the original purchase.</p>
        </Section>

        <Section title="8. Chargebacks">
          <p>If you initiate a chargeback with your bank without first contacting us, we reserve the right to suspend or permanently ban your account. We encourage you to contact our support team first — in most cases we can resolve disputes faster and with less friction than a formal chargeback process.</p>
        </Section>

        <Section title="9. Contact">
          <p>For refund requests or questions:</p>
          <p><strong className="text-primary">bookVault Support</strong><br />Email: support@bookvault.app</p>
          <p>We aim to respond to all support requests within one business day.</p>
        </Section>
      </div>

      <div className="mt-16 pt-8 border-t border-line flex gap-6">
        <Link href="/legal/terms" className="text-sm text-secondary hover:text-primary transition-colors">
          Terms of Service
        </Link>
        <Link href="/legal/privacy" className="text-sm text-secondary hover:text-primary transition-colors">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-primary mb-4">{title}</h2>
      <div className="space-y-3 text-sm text-secondary leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_strong]:font-medium">
        {children}
      </div>
    </section>
  )
}
