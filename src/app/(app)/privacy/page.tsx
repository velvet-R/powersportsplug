// src/app/(app)/privacy/page.tsx

import PrivacyContentBlocks from '@/components/Privacy/PrivacyContentBlocks'
import PrivacyHero from '@/components/Privacy/PrivacyHero'
import React from 'react'

export const metadata = {
  title: 'Secure Data Safeguards & Privacy Policy | PowerSports Plug',
  description:
    'Review our data security standards. See how your identification and financial income records are secured during our in-house approval process.',
}

export default function GlobalPrivacyPolicyPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary-hover selection:text-white pb-16">
      {/* COMPONENT SECTION 1: LEGAL SUB-HEADER BANNER */}
      <PrivacyHero />

      {/* COMPONENT SECTION 2: STRUCTURED RECORD DISCLOSURE LEDGER */}
      <main>
        <PrivacyContentBlocks />
      </main>
    </div>
  )
}
