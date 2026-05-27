'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function BlogHero(): React.JSX.Element {
  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-zinc-950">
      {/* Moving Technical Ambient Grid Texture */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zm0 39h40v1H0zM0 0v40h1V0zm39 0v40h1V0z' fill='%2327272A' fill-opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Radial lighting glow map expansion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 50%, rgba(255,87,34,0.09) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-16 lg:py-24 z-10">
        <div className="max-w-3xl">
          {/* Animated eyebrow indicator bar */}
          <div className="flex items-center gap-2 mb-5">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              className="block h-0.5 bg-primary-hover"
            />
            <span className="font-display text-[10px] font-bold tracking-widest uppercase text-primary-hover">
              PowersportsHub Internal Dispatch
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display font-black uppercase leading-none tracking-tight mb-5 text-foreground"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
          >
            FIELD INTEL, GUIDES &<br />
            <span className="text-primary-hover drop-shadow-[0_0_20px_rgba(255,87,34,0.15)]">
              OFF-ROAD ENGINE MANUALS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="font-body leading-relaxed max-w-xl text-muted-foreground"
            style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
          >
            Expert mechanical breakdowns, asset financing terms, and wilderness trail maps compiled
            directly from our technicians and deep-country route scouts.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
