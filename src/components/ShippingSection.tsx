'use client'

import { motion } from 'framer-motion'
import {
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    Compass,
    CreditCard,
    MapPin,
    Search,
    ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DELIVERY_STEPS = [
  {
    title: 'Browse & Secure',
    desc: 'Select your machine from our active online showroom or dial our dispatch floor directly to lock in your unit.',
    icon: Search,
  },
  {
    title: 'Execute Terms',
    desc: 'Complete our high-speed, no-credit-check financing application or coordinate directly with your dedicated agent to secure your unit balance.',
    icon: CreditCard,
  },
  {
    title: 'Pre-Shipment Verification',
    desc: 'Our master technicians execute a rigorous mechanical inspection and full detail clean before loading the trailer.',
    icon: ClipboardCheck,
  },
  {
    title: 'Live GPS Tracking',
    desc: 'Receive a dedicated digital tracking portal to monitor your enclosed transport carrier in real time across state lines.',
    icon: Compass,
  },
  {
    title: 'Driveway Arrival',
    desc: 'Your vehicle drops fully insured and ready to ride, backed by an expert physical walkthrough to confirm pristine condition.',
    icon: CheckCircle2,
  },
]

export default function ShippingSection(): React.JSX.Element {
  return (
    <section className="w-full bg-zinc-950 py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden border-t border-border/40">
      {/* Ambient background glow tracking the right panel */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-primary-hover/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        {/* ── SECTION LABEL HEADER ── */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-pulse" />
            <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              White-Glove Logistics Network
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none mb-6">
            HOW DELIVERY{' '}
            <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
              WORKS
            </span>
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            We bypass traditional dealership pickup bottlenecks by shipping your machine safely to
            your driveway anywhere in the USA. Every unit travels fully insured, completely GPS
            tracked, and securely managed by powersports transport logistics specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-stretch">
          {/* ── LEFT CONTAINER: THE ENGINE TRACKING TIMELINE (7 COLS) ── */}
          <div className="xl:col-span-7 flex flex-col justify-center relative">
            {/* Embedded Tracking Line Connector Asset */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-border/30 hidden md:block" />

            <div className="space-y-6">
              {DELIVERY_STEPS.map((step, idx) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={idx}
                    className="relative group bg-surface/10 border border-border/40 hover:border-zinc-700 rounded-xl p-5 md:pl-16 flex flex-col sm:flex-row gap-4 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    {/* The Node Pin Bullet */}
                    <div className="md:absolute md:left-3.5 md:top-6 w-6 h-6 rounded-full bg-zinc-900 border-2 border-border group-hover:border-primary-hover flex items-center justify-center transition-colors z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-primary-hover transition-colors" />
                    </div>

                    {/* Step Icon Frame */}
                    <div className="w-10 h-10 rounded bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 group-hover:text-primary-hover group-hover:bg-zinc-900 transition-all flex-shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Step Typography content */}
                    <div>
                      <h3 className="font-display font-black text-base text-white uppercase tracking-wider mb-1">
                        <span className="text-zinc-600 font-normal mr-2">Step 0{idx + 1} —</span>
                        {step.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT CONTAINER: THE ALL 50 STATES TARGET CARD (5 COLS) ── */}
          <motion.div
            className="xl:col-span-5 relative rounded-2xl border border-border/60 overflow-hidden bg-zinc-900/40 p-8 sm:p-12 flex flex-col justify-between group"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Linear abstract mesh design lines mapping grid feel */}
            <div className="absolute inset-0 opacity-10 bg-grid-dark pointer-events-none group-hover:opacity-15 transition-opacity" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-hover/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Floating Shield Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 mb-8 backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-status-available" />
                <span className="font-display text-[9px] font-black tracking-widest text-white uppercase">
                  100% Fully Insured Transit
                </span>
              </div>

              {/* Large Display Statement */}
              <p className="font-display text-xs font-bold tracking-[0.2em] text-primary-hover uppercase mb-3">
                Interstate Delivery Guarantee
              </p>

              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-none mb-6">
                WE DELIVER TO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                  ALL 50 STATES
                </span>
              </h3>

              <div className="flex gap-3 items-start bg-black/40 border border-border/40 p-4 rounded-lg backdrop-blur-md mb-8 max-w-md">
                <MapPin className="w-5 h-5 text-primary-hover mt-0.5 flex-shrink-0 animate-bounce" />
                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No matter where you sit on the map—from remote Alaskan trails to deep Texas
                  ranches—we negotiate and coordinate direct door-to-door delivery execution
                  effortlessly.
                </p>
              </div>
            </div>

            {/* Heavy Call to Action Hook Button */}
            <div>
              <Link
                href="/inventory"
                className="w-full h-14 bg-primary-hover hover:bg-white text-white hover:text-black font-display text-xs font-black tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(255,69,0,0.25)] hover:shadow-none transition-all duration-300"
              >
                <span>Shop Now — We Deliver To You</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
