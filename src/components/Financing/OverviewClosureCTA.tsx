'use client'

import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function OverviewClosureCTA(): React.JSX.Element {
  const CompanyInfo: CompanyInfo | null = useCompanyInfo()
  return (
    <section className="w-full py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial from-primary-hover/5 to-transparent pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 text-center flex flex-col items-center">
        {/* Floating Mini Warning/Promo Badge Component */}
        <motion.div
          className="border border-primary-hover/30 bg-surface/30 px-4 py-1.5 rounded-sm mb-6 inline-flex flex-col items-center"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="font-display text-[9px] font-black tracking-widest text-primary-hover uppercase">
            RIDE NOW. PAY LATER.
          </span>
          <span className="font-mono text-[8px] font-bold text-zinc-500 tracking-wider uppercase mt-0.5">
            NO CREDIT CHECK REQUIRED
          </span>
        </motion.div>

        <div className="mb-10 space-y-3">
          <span className="text-xl block">📞</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white max-w-3xl">
            START YOUR ATV JOURNEY TODAY
          </h2>
          <p className="font-body text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Ready to own your ATV? Apply now to get approved instantly, or call us to get started
            over the phone. Don't wait — your next ride is ready.
          </p>
        </div>

        <div className="w-full max-w-md flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link
            href="/financing/apply"
            className="w-full sm:w-auto h-12 px-8 bg-primary-hover text-white font-display text-xs font-black tracking-widest uppercase rounded-sm flex items-center justify-center shadow-xl hover:brightness-110 transition-all cursor-pointer"
          >
            Apply For Financing
          </Link>
          <a
            href={`tel:${CompanyInfo?.phone || '+1 (800) 123-4567'}`}
            className="w-full sm:w-auto h-12 px-8 bg-surface border border-border text-white hover:bg-zinc-900 font-display text-xs font-black tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-primary-hover" /> Call Now
          </a>
        </div>
      </div>
    </section>
  )
}
