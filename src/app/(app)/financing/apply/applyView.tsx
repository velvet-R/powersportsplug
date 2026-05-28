// src/app/(app)/financing/page.tsx
'use client'
import FinancingApplicationForm from '@/components/Financing/FinancingApplicationForm'
import FinancingFooterFootnote from '@/components/Financing/FinancingFooterFootnote'
import FinancingHero from '@/components/Financing/FinancingHero'
import FinancingPlans from '@/components/Financing/FinancingPlans'
import FinancingSteps from '@/components/Financing/FinancingSteps'
import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import React from 'react'

export const metadata = {
  title: 'No-Credit-Check Financing Approval | PowerSports Plug',
  description:
    'Apply online for flexible low monthly powersports payment options with zero traditional dealer credit barriers.',
}

export default function MasterFinancingApplicationPage(): React.JSX.Element {
  const companyInfo: CompanyInfo | null = useCompanyInfo()
  return (
    <div className="min-h-screen bg-background text-white selection:bg-purple-500 selection:text-black">
      {/* SECTION 1: SYSTEM OVERVIEW HERO SPLASH */}
      <FinancingHero />

      {/* SECTION 2: FIVE CARDS PAYMENT CONFIGURATOR PLANS */}
      <FinancingPlans />

      {/* SECTION 3: NUMBERED STEP ACTION FLOW PIPELINE */}
      <FinancingSteps />

      {/* SECTION 4: PRIMARY INTAKE PORTAL SYSTEM FORM & REQUIREMENTS */}
      <FinancingApplicationForm phone={companyInfo?.phone || '+1 (800) 123-4567'} />

      {/* SECTION 5: DISCLOSURE NOTES FOOTER STAMP */}
      <FinancingFooterFootnote email={companyInfo?.email || 'test@mail.com'} />
    </div>
  )
}
