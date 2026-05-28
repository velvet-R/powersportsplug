'use client'

import { ChevronRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BlogCTAProps {
  accentColor?: string
}

export default function BlogCTA({
  accentColor = 'var(--color-primary-hover, #ff5722)',
}: BlogCTAProps): React.JSX.Element {
  return (
    <section className="relative w-full overflow-hidden border border-border bg-zinc-950 rounded-sm p-8 md:p-12 my-12">
      {/* Ambient Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='35' height='35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h35v1H0zm0 34h35v1H0zM0 0v35h1V0zm34 0v35h1V0z' fill='%2327272A' fill-opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Corner Graphic Accent Line */}
      <div className="absolute top-0 left-0 w-24 h-0.5" style={{ backgroundColor: accentColor }} />
      <div className="absolute top-0 left-0 w-0.5 h-24" style={{ backgroundColor: accentColor }} />

      {/* Radial Highlight Glow */}
      <div
        className="absolute -right-24 -bottom-24 w-80 h-80 pointer-events-none rounded-full blur-[80px] opacity-20 transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          {/* Subtle Tagline */}
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="font-display text-[9px] font-black tracking-widest uppercase text-muted-foreground">
              Verified Powersports Inventory
            </span>
          </div>

          {/* Heading */}
          <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-white mb-3">
            Ready to Find Your Perfect ATV?
          </h3>

          {/* Body Text */}
          <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Browse our full inventory of new and used ATVs with easy financing and nationwide
            delivery.
          </p>
        </div>

        {/* Tactical Buttons Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <Link
            href="/shop"
            className="group/btn relative overflow-hidden bg-primary-hover text-white font-display text-[11px] font-black tracking-widest uppercase px-6 py-3.5 rounded-sm text-center shadow-lg transition-transform active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              Shop Now
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/financing/apply"
            className="group/btn border border-border bg-surface text-white hover:bg-zinc-900 font-display text-[11px] font-black tracking-widest uppercase px-6 py-3.5 rounded-sm text-center transition-all duration-200 active:scale-[0.98]"
            style={{ '--hover-accent': accentColor } as React.CSSProperties}
          >
            <span className="flex items-center justify-center gap-1.5 group-hover/btn:text-white">
              Get Financing
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
