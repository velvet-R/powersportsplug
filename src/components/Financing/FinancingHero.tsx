'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function FinancingHero(): React.JSX.Element {
  return (
    <header className="relative w-full border-b border-border bg-zinc-950 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none [background-image:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] [background-size:35px_35px]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-hover/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 text-center md:text-left">
        <motion.span
          className="font-display text-xs font-black tracking-[0.25em] text-primary-hover uppercase mb-3 block"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          No Credit Check Required
        </motion.span>
        <motion.h1
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-none mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 80 }}
        >
          GET ON THE{' '}
          <span className="text-primary-hover drop-shadow-[0_0_20px_rgba(255,69,0,0.3)]">
            ROAD.
          </span>
        </motion.h1>
        <motion.p
          className="font-body text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Everyone is approved. Choose a monthly payment plan that works for your budget and get
          rolling in days — not weeks. Flexible terms, zero hassle.
        </motion.p>
      </div>
    </header>
  )
}
