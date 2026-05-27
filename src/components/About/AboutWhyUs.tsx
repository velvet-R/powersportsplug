'use client'

import { WHY_US_REASONS } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
}

export default function AboutWhyUs(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-zinc-950 border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* TITLE WRAPPER */}
        <div className="mb-16 text-center lg:text-left">
          <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
            Why Us
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            SIX REASONS RIDERS CHOOSE US
          </h2>
        </div>

        {/* SIX CARD PANEL MESH */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {WHY_US_REASONS.map((reason, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-surface/10 border border-border p-6 sm:p-8 rounded-sm relative overflow-hidden group"
              whileHover={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', borderColor: '#3f3f46' }}
            >
              {/* Dynamic Scanning Background Border Highlight Line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-hover/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              <div className="w-10 h-10 rounded-xs bg-zinc-900 border border-border flex items-center justify-center text-primary-hover mb-6 group-hover:bg-primary-hover group-hover:text-black transition-colors duration-300">
                <reason.icon className="w-4 h-4" />
              </div>

              <h3 className="font-display font-black text-sm uppercase text-white tracking-wide mb-3">
                {reason.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {reason.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
