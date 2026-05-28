'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bike,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  ShieldAlert,
  Truck,
  UserCheck,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// Core structural layout configurations
const STEPS = [
  {
    num: '01',
    title: 'Select Your Machine',
    desc: 'Explore our massive digital showroom or call (972) 688-9613. Our specialists will lock down the exact unit you want.',
    icon: Bike,
  },
  {
    num: '02',
    title: '5-Minute Application',
    desc: 'Submit your secure profile digitally. Absolute zero impact on your credit score—we use soft credit checks only.',
    icon: FileText,
  },
  {
    num: '03',
    title: 'Instant Terms & Delivery',
    desc: 'Get approved same-day, execute your electronic paperwork securely, and clear your driveway for cross-country shipping.',
    icon: Truck,
  },
]

const PERKS = [
  {
    title: 'No Credit Score Harm',
    desc: 'We operate strictly through soft inquiry checks. Your baseline credit rating remains completely untouched.',
    icon: ShieldAlert,
  },
  {
    title: 'Rapid Response Approval',
    desc: 'Our heavy-duty lending networks process and approve most buyers within hours of submission.',
    icon: Clock,
  },
  {
    title: 'Payments From $99/mo',
    desc: 'Engineered financing structures that adapt flexibly to your budget footprint.',
    icon: DollarSign,
  },
  {
    title: '12 to 60-Month Terms',
    desc: 'Total control over your payout landscape with multi-year flexible calendar structures.',
    icon: Calendar,
  },
  {
    title: 'Universal Inclusion Policy',
    desc: 'Prior bankruptcies, first-time buyers, poor credit history, or ITIN holders—everyone has a seat at the table.',
    icon: UserCheck,
  },
  {
    title: 'Frictionless Paperwork',
    desc: 'No endless files. Keep your valid identification, basic verification of income, and phone number ready.',
    icon: FileText,
  },
]

const SAMPLE_TERMS = [
  { price: 7999, down: 499, term: '48 Mos', payment: 175 },
  { price: 11499, down: 999, term: '60 Mos', payment: 210 },
  { price: 14899, down: 1499, term: '60 Mos', payment: 265 },
]

export default function FinancingSection(): React.JSX.Element {
  return (
    <section className="w-full bg-background py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Structural Accent Grid Background lines */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px]" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-primary-hover/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        {/* ── PART 1: THE CORE BROADCAST HERO ── */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="font-display text-xs font-black tracking-[0.25em] text-primary-hover uppercase">
              Guaranteed Approvals Ecosystem
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-none mb-6">
            GET APPROVED{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-400 to-zinc-600">
              TODAY
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Subprime credit, zero credit history, or stepping up as a first-time pilot—our
            integrated collective of elite, high-volume lenders specializes exclusively in
            powersports tiering. We dismantle traditional banking hurdles to secure you the absolute
            lowest barrier to acquisition possible.
          </p>
        </div>

        {/* ── PART 2: THE 3-STEP PIPELINE ── */}
        <div className="mb-24">
          <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-12">
            <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wider">
              How It Works —{' '}
              <span className="text-zinc-500 font-normal">No Showroom Visit Required</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={idx}
                  className="relative group bg-zinc-950/40 backdrop-blur-md border border-border/50 rounded-xl p-8 flex flex-col justify-between transition-colors duration-300 hover:border-zinc-700"
                  whileHover={{ y: -4 }}
                >
                  <div>
                    {/* Top Accent Index Meta */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-display font-black text-4xl text-zinc-800 tracking-tighter group-hover:text-primary-hover/20 transition-colors">
                        {step.num}
                      </span>
                      <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-border/60 flex items-center justify-center group-hover:bg-primary-hover/10 group-hover:border-primary-hover/30 transition-all">
                        <IconComponent className="w-5 h-5 text-zinc-400 group-hover:text-primary-hover transition-colors" />
                      </div>
                    </div>

                    <h4 className="font-display font-black text-lg text-white uppercase tracking-tight mb-3">
                      {step.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Central Call-to-Action Link Anchor */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/financing/apply"
              className="group inline-flex items-center gap-3 h-14 px-8 bg-primary-hover text-white font-display text-xs font-black tracking-[0.2em] uppercase rounded-sm shadow-[0_4px_20px_rgba(255,69,0,0.25)] hover:bg-white hover:text-black hover:shadow-none transition-all duration-300"
            >
              <span>Apply For Financing Now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* ── PART 3: THE HIGH-SPEC PERKS GRID & ESTIMATOR MATRIX ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 pt-16 border-t border-border/40">
          {/* Left Column Block: The 6 Cards Spec Grid */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERKS.map((perk, idx) => {
              const IconComponent = perk.icon
              return (
                <div
                  key={idx}
                  className="bg-surface/20 border border-border/30 rounded-lg p-5 flex gap-4 hover:bg-surface/40 transition-colors"
                >
                  <div className="shrink-0 mt-0.5">
                    <IconComponent className="w-5 h-5 text-primary-hover" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm text-white uppercase tracking-wide mb-1.5">
                      {perk.title}
                    </h5>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column Block: Premium Real-world Payment Estimator Table */}
          <div className="bg-zinc-950/60 border border-border/60 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h4 className="font-display font-black text-lg text-white uppercase tracking-tight">
                  Sample Payment Matrix
                </h4>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Estimated calculation plans based on standard approved variables.
                </p>
              </div>

              {/* Pure CSS Clean Scannable HTML Table Layout */}
              <div className="w-full overflow-hidden rounded-md border border-border/30">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 font-display text-[10px] font-black tracking-widest text-muted-foreground uppercase border-b border-border/40">
                      <th className="py-3 px-4">Vehicle Value</th>
                      <th className="py-3 px-4 text-center">Down Pmt</th>
                      <th className="py-3 px-4 text-right">Est. Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 font-display text-xs">
                    {SAMPLE_TERMS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">
                          ${row.price.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-center text-amber-500 font-bold">
                          ${row.down.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right text-white font-black">
                          ${row.payment}
                          <span className="text-[10px] text-muted-foreground font-normal lowercase">
                            /{row.term.split(' ')[1]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] font-body text-zinc-500 leading-relaxed mt-4">
                * Rates listed are for illustrative purposes. Actual multi-month contracts vary
                relative to tier verification, localized tax boundaries, and underwriter evaluation
                criteria.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border/20">
              <div className="flex items-center justify-between text-xs font-display">
                <span className="text-muted-foreground">Ready to configure your term?</span>
                <Link
                  href="/financing/apply"
                  className="text-primary-hover font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  Launch Calculator <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
