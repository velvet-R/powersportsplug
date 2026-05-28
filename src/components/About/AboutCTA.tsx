'use client'

import { CTA_TRUST_BADGES } from '@/lib/constants'
import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { ChevronRight, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AboutCTA(): React.JSX.Element {
  const companyInfo: CompanyInfo | null = useCompanyInfo()
  return (
    <section className="w-full py-24 bg-zinc-950 relative overflow-hidden">
      {/* Dynamic Background Radial Shading Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        {/* CORE FUNNEL CARD AREA */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white mb-6">
            READY TO FIND YOUR <br className="hidden sm:inline" />
            <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
              PERFECT RIDE?
            </span>
          </h2>
          <p className="font-body text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you're buying your very first machine or upgrading to something that finally
            matches your skills, we're ready to help. Stop in, say hello, and let's find your
            perfect ride. No pressure. No gimmicks. Just real people who love what they do.
          </p>

          {/* DUAL CTA BUTTON MODULE */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              href="/shop"
              className="group w-full sm:w-auto bg-white text-black font-display text-xs font-black tracking-widest uppercase px-8 h-12 flex items-center justify-center rounded-sm hover:bg-zinc-200 transition-colors duration-150 shadow-xl"
            >
              Browse Inventory
              <ChevronRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`tel:${companyInfo?.phone || '555-123-4567'}`} // Fallback phone number
              className="group w-full sm:w-auto border border-border bg-surface text-white hover:bg-zinc-900 font-display text-xs font-black tracking-widest uppercase px-8 h-12 flex items-center justify-center rounded-sm transition-colors duration-150"
            >
              <Phone className="w-3.5 h-3.5 mr-2 text-primary-hover" />
              Call Us Now
            </a>
          </div>
        </div>

        {/* EXTRA TRUST BADGE OVERLAYS */}
        <div className="border-t border-border/60 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {CTA_TRUST_BADGES.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <div className="w-11 h-11 rounded-full bg-zinc-900 border border-border/80 flex items-center justify-center text-primary-hover mb-4 shadow-inner relative">
                {/* Micro outer pulse line animation loop */}
                <div className="absolute inset-0 rounded-full border border-primary-hover/20 animate-ping opacity-75" />
                <badge.icon className="w-4 h-4 relative z-10" />
              </div>
              <h4 className="font-display font-black text-xs uppercase text-white tracking-wider mb-2">
                {badge.title}
              </h4>
              <p className="font-body text-xs text-zinc-400 leading-relaxed max-w-xs">
                {badge.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
