'use client'

import React from 'react'

export default function TransparencyTiers(): React.JSX.Element {
  return (
    <section className="w-full py-16 bg-zinc-950 border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xl">⚖️</span>
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">
              SIMPLE & TRANSPARENT TERMS
            </h2>
          </div>
          <p className="font-body text-sm text-zinc-400 leading-relaxed">
            No surprises. No hidden fees. You'll know exactly what you're paying from day one.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            {[
              'Clear payment agreements',
              'Fixed total cost upfront',
              'Honest, straightforward terms',
            ].map((term, i) => (
              <div
                key={i}
                className="bg-background border border-border/60 py-3.5 px-4 rounded-sm font-display text-[10px] font-black uppercase tracking-wider text-zinc-300"
              >
                {term}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
