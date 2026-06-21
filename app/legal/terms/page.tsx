import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'bookVault Terms of Service — the rules governing your use of our platform.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      <p className="text-xs font-medium uppercase tracking-widest text-accent mb-4">Legal</p>
      <h1 className="font-display text-5xl font-semibold text-primary mb-3">Terms of Service</h1>
      <p className="text-sm text-secondary mb-12">Last updated: 21 June 2026</p>

      <div className="prose-custom space-y-10">

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using bookVault (the &quot;Platform&quot;), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this Platform are protected by applicable copyright and trademark law.</p>
        </Section>

        <Section title="2. Definitions">
          <ul>
            <li><strong className="text-primary">Platform</strong> — the bookVault website and associated services.</li>
            <li><strong className="text-primary">Content</strong> — any digital ebook, document, or file available for purchase or rental.</li>
            <li><strong className="text-primary">User</strong> — any individual who accesses or uses the Platform.</li>
            <li><strong className="text-primary">Purchase</strong> — a one-time payment granting permanent access to Content.</li>
            <li><strong className="text-primary">Rental</strong> — a time-limited payment granting access to Content for a specified period (7 or 30 days).</li>
          </ul>
        </Section>

        <Section title="3. Account Registration">
          <p>To purchase or rent Content, you must create an account by providing a valid email address and password. You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. bookVault will not be liable for any loss resulting from unauthorized use of your account.</p>
          <p>You must be at least 13 years of age to create an account. If you are under 18, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.</p>
        </Section>

        <Section title="4. Purchases and Rentals">
          <p>All prices are displayed in your selected currency. Prices are subject to change without notice. Payment is processed at the time of transaction. By completing a purchase or rental, you confirm that you are authorized to use the payment method provided.</p>
          <p>Purchased Content grants you a permanent, non-transferable, non-exclusive license to access and read the Content for personal, non-commercial use. Rental Content grants the same license for the rental period only. After the rental period expires, access to the Content is revoked automatically.</p>
        </Section>

        <Section title="5. Digital Content License">
          <p>bookVault grants you a limited, non-exclusive, non-transferable, revocable license to access and use Content solely for personal, non-commercial reading purposes. You may not:</p>
          <ul>
            <li>Copy, reproduce, distribute, or resell any Content.</li>
            <li>Remove or alter any copyright, trademark, or proprietary rights notices.</li>
            <li>Use the Content for commercial purposes without express written permission.</li>
            <li>Attempt to reverse-engineer, decompile, or extract source materials from Content.</li>
            <li>Share, sublicense, or transfer your access credentials to any third party.</li>
          </ul>
        </Section>

        <Section title="6. Prohibited Activities">
          <p>You agree not to engage in any of the following activities on or through the Platform:</p>
          <ul>
            <li>Violating any applicable law or regulation.</li>
            <li>Attempting to gain unauthorized access to any part of the Platform or its related systems.</li>
            <li>Transmitting viruses, malware, or any other harmful code.</li>
            <li>Circumventing any digital rights management or access-control measures.</li>
            <li>Using automated tools (bots, scrapers) to access, query, or copy Content without authorization.</li>
            <li>Impersonating another person or entity.</li>
          </ul>
        </Section>

        <Section title="7. Intellectual Property">
          <p>The Platform and its original content (excluding Content licensed from publishers), features, and functionality are and will remain the exclusive property of bookVault and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of bookVault. The content of ebooks is the intellectual property of their respective authors and publishers and is licensed to bookVault for distribution.</p>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <p>The Platform is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. bookVault does not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. bookVault does not warrant the accuracy, completeness, or usefulness of any Content.</p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>To the fullest extent permitted by applicable law, bookVault, its affiliates, officers, employees, agents, suppliers, or licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the Platform or Content. In no event shall bookVault&apos;s total liability exceed the amount paid by you for the specific Content giving rise to the claim in the twelve months preceding the event.</p>
        </Section>

        <Section title="10. Governing Law and Disputes">
          <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which bookVault is incorporated, without regard to its conflict-of-law provisions. Any dispute arising under these Terms shall first be attempted to be resolved through good-faith negotiation. Failing resolution within 30 days, the dispute shall be submitted to binding arbitration in accordance with applicable arbitration rules.</p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 14 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Continued use of the Platform after any changes constitutes your acceptance of the new Terms.</p>
        </Section>

        <Section title="12. Contact">
          <p>Questions about these Terms should be sent to:</p>
          <p><strong className="text-primary">bookVault Legal Team</strong><br />Email: legal@bookvault.app</p>
        </Section>
      </div>

      <div className="mt-16 pt-8 border-t border-line flex gap-6">
        <Link href="/legal/privacy" className="text-sm text-secondary hover:text-primary transition-colors">
          Privacy Policy
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
