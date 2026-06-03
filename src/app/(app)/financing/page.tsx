// src/app/(app)/financing/page.tsx

import ApprovalValueBanner from '@/components/Financing/ApprovalValueBanner'
import CreditDefinitionSplit from '@/components/Financing/CreditDefinitionSplit'
import DownPaymentExplanation from '@/components/Financing/DownPaymentExplanation'
import FinancingWorkflow from '@/components/Financing/FinancingWorkflow'
import OverviewClosureCTA from '@/components/Financing/OverviewClosureCTA'
import OverviewHero from '@/components/Financing/OverviewHero'
import PaymentSchedules from '@/components/Financing/PaymentSchedules'
import TransparencyTiers from '@/components/Financing/TransparencyTiers'
import WhyFinanceWithUs from '@/components/Financing/WhyFinanceWithUs'
import React from 'react'

export const metadata = {
  title: 'Financing | Powersports Plug',
  description:
    'Explore flexible financing options for your powersports vehicles and accessories. Learn about our easy application process, competitive rates, and how we can help you get on the road faster with affordable payment plans.',
}

export default function FinancingOverviewPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary-hover selection:text-white">
      {/* SECTION 1: SYSTEM SPLASH BANNER WITH TARGET ACTION NODES */}
      <OverviewHero />

      {/* SECTION 2: SYSTEM APPROVAL VALUE PILLS */}
      <ApprovalValueBanner />

      {/* SECTION 3: STEP WORKFLOW DIAGRAM */}
      <FinancingWorkflow />

      {/* SECTION 4: DOWN PAYMENT ENGINE EXAMPLE LOGS */}
      <DownPaymentExplanation />

      {/* SECTION 5: FREQUENCY TIMELINE TRACKING SYSTEM */}
      <PaymentSchedules />

      {/* SECTION 6: CREDIT METRIC WHAT-WE-DO MATRIX */}
      <CreditDefinitionSplit />

      {/* SECTION 7: TRANSPARENCY TERMS BAR */}
      <TransparencyTiers />

      {/* SECTION 8: 5-COLUMN WHY CHOOSE US MATRIX */}
      <WhyFinanceWithUs />

      {/* SECTION 9: FINAL CONVERSION CLOSURE DECKS */}
      <OverviewClosureCTA />
    </div>
  )
}
