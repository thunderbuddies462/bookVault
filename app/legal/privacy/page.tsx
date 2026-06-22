import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'bookVault Privacy Policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">Legal</p>
      <h1 className="font-display text-5xl font-semibold text-primary mb-3">Privacy Policy</h1>
      <p className="text-sm text-secondary mb-12">Last updated: 21 June 2026</p>

      <div className="space-y-10">

        <Section title="1. Introduction">
          <p>bookVault (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your personal information. This Privacy Policy explains what data we collect when you use our Platform, how we use it, and the choices you have. By using bookVault, you consent to the practices described in this policy.</p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect information in the following ways:</p>
          <p><strong className="text-primary">Information you provide directly:</strong></p>
          <ul>
            <li>Account information: email address and password (stored securely via Supabase).</li>
            <li>Billing information: name, billing address. Card details are processed by our payment provider and are never stored on our servers.</li>
            <li>Communication: messages you send to our support team.</li>
          </ul>
          <p><strong className="text-primary">Information collected automatically:</strong></p>
          <ul>
            <li>Purchase and rental history.</li>
            <li>Usage data: pages visited, time spent, features used.</li>
            <li>Device information: browser type, operating system, IP address, and approximate geographic location.</li>
            <li>Cookies and similar tracking technologies (see Section 5).</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use collected information to:</p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process purchases and rentals and send order confirmations.</li>
            <li>Provide access to purchased and rented Content.</li>
            <li>Prevent fraud and enforce our Terms of Service.</li>
            <li>Improve the Platform through analytics (aggregated, anonymized data).</li>
            <li>Send transactional emails (receipts, expiry reminders). We will only send marketing emails with your explicit consent.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="4. Information Sharing">
          <p>We do not sell, trade, or rent your personal information to third parties. We share data only in the following circumstances:</p>
          <ul>
            <li><strong className="text-primary">Service providers:</strong> We use Supabase for authentication and database services. These providers process data on our behalf under data processing agreements.</li>
            <li><strong className="text-primary">Legal requirements:</strong> We may disclose your information if required by law, court order, or governmental authority.</li>
            <li><strong className="text-primary">Business transfers:</strong> If bookVault is acquired or merges with another company, your information may be transferred. We will notify you before any such transfer.</li>
          </ul>
        </Section>

        <Section title="5. Cookies and Tracking">
          <p>We use the following types of cookies:</p>
          <ul>
            <li><strong className="text-primary">Strictly necessary:</strong> Authentication tokens and session cookies required to keep you logged in and maintain your cart.</li>
            <li><strong className="text-primary">Preference:</strong> Cookies that remember your settings, such as selected currency.</li>
            <li><strong className="text-primary">Analytics:</strong> Aggregated, anonymized usage data to understand how users navigate the Platform. We do not use third-party advertising cookies.</li>
          </ul>
          <p>You can control cookies through your browser settings. Disabling strictly necessary cookies may affect Platform functionality.</p>
        </Section>

        <Section title="6. Data Security">
          <p>We implement industry-standard security measures to protect your personal information, including TLS encryption for data in transit and encryption at rest for stored data. Passwords are hashed using bcrypt and never stored in plaintext. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="7. Data Retention">
          <p>We retain account information for as long as your account is active. If you close your account, we will delete or anonymize your personal data within 90 days, except where retention is required by law (e.g., financial records for 7 years). Purchase history is retained to allow you to re-download Content you have purchased.</p>
        </Section>

        <Section title="8. Your Rights">
          <p>Depending on your jurisdiction, you may have the following rights:</p>
          <ul>
            <li><strong className="text-primary">Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong className="text-primary">Rectification:</strong> Request correction of inaccurate data.</li>
            <li><strong className="text-primary">Deletion:</strong> Request deletion of your personal data (subject to legal obligations).</li>
            <li><strong className="text-primary">Portability:</strong> Request your data in a machine-readable format.</li>
            <li><strong className="text-primary">Opt-out:</strong> Unsubscribe from marketing communications at any time via the unsubscribe link in any email or by contacting us.</li>
          </ul>
          <p>To exercise any of these rights, contact us at privacy@bookvault.app. We will respond within 30 days.</p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>bookVault is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us and we will promptly delete it.</p>
        </Section>

        <Section title="10. International Data Transfers">
          <p>Your information may be transferred to and processed in countries other than your own. We ensure adequate safeguards are in place for such transfers, including Standard Contractual Clauses approved by applicable data protection authorities.</p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by a prominent notice on the Platform. The date at the top of this page indicates when this policy was last revised.</p>
        </Section>

        <Section title="12. Contact">
          <p>For privacy-related questions or requests:</p>
          <p><strong className="text-primary">bookVault Privacy Team</strong><br />Email: privacy@bookvault.app</p>
        </Section>
      </div>

      <div className="mt-16 pt-8 border-t border-line flex gap-6">
        <Link href="/legal/terms" className="text-sm text-secondary hover:text-primary transition-colors">
          Terms of Service
        </Link>
        <Link href="/legal/refund" className="text-sm text-secondary hover:text-primary transition-colors">
          Refund Policy
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
