'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function AboutHeroBanner(): React.JSX.Element {
  return (
    <section className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-start overflow-hidden border-b border-border">
      {/* Heavy-Duty Image Background with Initial Scale In Variant */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/about-hero-trail.jpg')`,
        }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

      {/* Grid Overlay Graphic */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-10 mix-blend-overlay
        [background-image:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] [background-size:40px_40px]"
      />

      <motion.div
        className="relative z-20 max-w-screen-2xl w-full mx-auto px-4 sm:px-8 lg:px-16 flex flex-col items-start"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.span
          className="font-display text-xs font-black tracking-[0.25em] text-primary-hover uppercase mb-3 block"
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
          }}
        >
          Our Story
        </motion.span>

        <motion.h1
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-none mb-6 max-w-4xl"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: 'spring', damping: 15, stiffness: 70 },
            },
          }}
        >
          WE ARE RIDERS{' '}
          <span className="text-primary-hover drop-shadow-[0_0_20px_rgba(255,69,0,0.3)]">
            FIRST.
          </span>
        </motion.h1>

        <motion.p
          className="font-body text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          More than a dealership — we're a community of off-road enthusiasts who believe every trail
          deserves to be explored on the right machine.
        </motion.p>
      </motion.div>
    </section>
  )
}
