'use client'

import React from 'react'

export default function FinancingFooterFootnote(): React.JSX.Element {
  return (
    <footer className="w-full bg-zinc-950 border-t border-border py-12 px-4 sm:px-8 lg:px-16 text-subtle">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 font-body text-[10px] sm:text-[11px] leading-relaxed text-zinc-500">
        <p className="max-w-4xl">
          All financing is subject to approval and availability. Monthly payment amounts are
          estimates and may vary based on vehicle price, term length, down payment, and applicable
          fees. No credit check financing options are available through select in-house programs.
          Rates and terms are subject to change without notice. Offroad Powersports Hub is not a
          licensed lender; financing is arranged through third-party programs. Contact us for full
          details.
        </p>
        <div className="shrink-0 font-mono text-[10px] bg-zinc-900 border border-border/40 px-3 py-1.5 rounded-xs tracking-wider text-zinc-400">
          INTAKE_SUPPORT:{' '}
          <a
            href="mailto:info@offroadpowersportshub.com"
            className="text-purple-400 hover:underline"
          >
            info@offroadpowersportshub.com
          </a>
        </div>
      </div>
    </footer>
  )
}
