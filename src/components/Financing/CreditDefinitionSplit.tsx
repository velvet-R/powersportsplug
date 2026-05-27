'use client'

import { CheckCircle2, XCircle } from 'lucide-react'
import React from 'react'

export default function CreditDefinitionSplit(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-background border-b border-border/40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mb-14 text-center">
          <span className="text-xl block mb-2">🔒</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-3">
            WHAT &ldquo;NO CREDIT CHECK&rdquo; MEANS
          </h2>
          <p className="font-body text-sm text-zinc-400 max-w-md mx-auto">
            You won't be judged by your financial past.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* LEFT DECK: WHAT WE AVOID */}
          <div className="bg-zinc-950 border border-red-950/40 p-6 sm:p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-6 border-b border-border/40 pb-4">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-zinc-300">
                We DO NOT
              </h3>
            </div>
            <ul className="space-y-4 font-body text-sm text-zinc-400">
              <li className="flex items-center gap-3">▪ Pull credit reports</li>
              <li className="flex items-center gap-3">▪ Require a minimum credit score</li>
              <li className="flex items-center gap-3">▪ Deny based on bad credit</li>
            </ul>
          </div>

          {/* RIGHT DECK: WHAT WE FULFILL */}
          <div className="bg-zinc-950 border border-emerald-950/40 p-6 sm:p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-6 border-b border-border/40 pb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-zinc-300">
                We DO
              </h3>
            </div>
            <ul className="space-y-4 font-body text-sm text-zinc-400">
              <li className="flex items-center gap-3">✓ Work directly with you</li>
              <li className="flex items-center gap-3">✓ Set realistic payment plans</li>
              <li className="flex items-center gap-3">✓ Help you get approved quickly</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
