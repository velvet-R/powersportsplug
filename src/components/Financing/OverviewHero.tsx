'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

export default function OverviewHero(): React.JSX.Element {
  return (
    <header className="relative w-full border-b border-border bg-zinc-950 py-28 lg:py-40 overflow-hidden">
      {/* Background Image Texture Overlay */}
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1600&auto=format&fit=crop&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-zinc-950/40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-hover/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 text-center md:text-left">
        <motion.h1
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-none mb-6 max-w-5xl"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 80 }}
        >
          ATV & FOUR-WHEELER{' '}
          <span className="text-primary-hover drop-shadow-[0_0_20px_rgba(255,69,0,0.2)]">
            PAYMENT PLANS
          </span>
        </motion.h1>

        <motion.p
          className="font-body text-zinc-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Get the ATV or four-wheeler you want today without the stress of traditional financing. We
          offer fast, flexible in-house financing with NO credit check required, so you can hit the
          trails sooner.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/financing/apply"
            className="w-full sm:w-auto h-12 px-8 bg-primary-hover text-white font-display text-xs font-black tracking-widest uppercase rounded-sm flex items-center justify-center shadow-xl hover:brightness-110 active:scale-[0.99] transition-all"
          >
            Apply Now
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto h-12 px-8 bg-surface/40 border border-border text-white font-display text-xs font-black tracking-widest uppercase rounded-sm flex items-center justify-center hover:bg-zinc-900 active:scale-[0.99] transition-all"
          >
            Browse ATVs
          </Link>
        </motion.div>
      </div>
    </header>
  )
}
