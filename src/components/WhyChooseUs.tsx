'use client'

import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  FileCheck,
  PhoneCall,
  ShieldAlert,
  ThumbsUp,
  Truck,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const VALUE_PROPS = [
  {
    icon: ShieldAlert,
    title: 'Guaranteed Financing',
    subtitle: 'No Credit Checks',
    description:
      'We don’t care about past bankruptcies, repossessions, or low scores. Our specialized in-house financing ensures everyone gets approved with flexible, clear payment paths.',
    highlight: '100% Approval Rate',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    subtitle: 'Direct To Your Driveway',
    description:
      'Skip the logistics headache. We coordinate fully-insured, enclosed transportation across all 50 states, dropping your new machine right at your home or farm.',
    highlight: 'Fully Insured Shipping',
  },
  {
    icon: ThumbsUp,
    title: 'Premium Multi-Point Inspection',
    subtitle: 'Track-Tested Performance',
    description:
      'Every single new and used vehicle undergoes a brutal 45-point mechanical and safety calibration check by certified technicians before it leaves our floors.',
    highlight: 'Certified Tech Approved',
  },
  {
    icon: Wrench,
    title: 'Lifetime Support & Parts Access',
    subtitle: 'We Have Your Back',
    description:
      'You are never stranded on the trails. Get direct, priority access to our master mechanics, exclusive OEM parts channels, and immediate performance upgrade sourcing.',
    highlight: 'Priority Maintenance Pipeline',
  },
]

export default function WhyChooseUs(): React.JSX.Element {
  const companyInfo: CompanyInfo | null = useCompanyInfo()
  return (
    <section className="w-full bg-zinc-950 py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden border-t border-border/40">
      {/* Structural Racing Line Grid Overlays */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-border/5 pointer-events-none hidden lg:block" />
      <div className="absolute top-24 -left-48 w-96 h-96 bg-primary-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* ── LEFT SIDE: STICKY STAGED TEXT BLOCK ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-pulse" />
              <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                The Dealer Advantage
              </span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none mb-6">
              WHY RIDERS <br />
              <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
                CHOOSE US
              </span>
            </h2>

            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
              We have spent years dismantling the friction of buying off-road machines. No
              dealership games, no hidden dynamic markups, and zero credit judgment—just raw power
              delivered directly to you.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-primary-hover hover:bg-primary-hover/80 text-white font-display text-xs font-black tracking-widest uppercase rounded shadow-glow-orange transition-all duration-200 active:scale-95 text-center"
              >
                <span>Find Your Next Machine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${companyInfo?.phone || '123-456-7890'}`}
                className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-surface hover:bg-zinc-900 text-white font-display text-xs font-bold tracking-widest uppercase rounded border border-border transition-colors duration-200 text-center"
              >
                <PhoneCall className="w-3.5 h-3.5 text-primary-hover" />
                Speak To A Specialist
              </a>
            </div>
          </div>

          {/* ── RIGHT SIDE: VALUE PROPOSITION MATRIX ── */}
          <motion.div
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {VALUE_PROPS.map((prop, i) => (
              <motion.div
                key={i}
                className="group relative bg-surface/30 backdrop-blur-md border border-border/60 rounded-xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 70, damping: 14 },
                  },
                }}
                whileHover={{
                  y: -5,
                  borderColor: '#4B5563',
                  backgroundColor: 'rgba(24, 24, 27, 0.6)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 69, 0, 0.1)',
                }}
              >
                {/* Micro-Glow Accent Panels */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary-hover/5 rounded-full blur-xl group-hover:bg-primary-hover/10 transition-colors duration-300" />

                <div>
                  {/* Icon Frame Block */}
                  <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center text-primary-hover mb-6 transition-colors duration-300 group-hover:border-primary-hover/40 group-hover:bg-zinc-900">
                    <prop.icon className="w-5 h-5 filter drop-shadow-[0_0_4px_rgba(255,69,0,0.3)] group-hover:animate-pulse" />
                  </div>

                  {/* Header Subtitles */}
                  <p className="font-display text-[10px] font-bold tracking-widest text-primary-hover uppercase mb-1">
                    {prop.subtitle}
                  </p>

                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-3 transition-colors duration-200 group-hover:text-primary-hover">
                    {prop.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                {/* Bottom Highlight Verification Footer */}
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-status-available opacity-80" />
                  <span className="font-display text-[9px] font-black tracking-widest uppercase text-white/90">
                    {prop.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
