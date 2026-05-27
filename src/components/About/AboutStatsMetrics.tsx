'use client'

import { STATS_CARDS } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 16, stiffness: 90 },
  },
}

export default function AboutStatsMetrics(): React.JSX.Element {
  return (
    <section className="w-full py-20 bg-zinc-950 border-b border-border overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* HEADER BLOCK */}
        <motion.div
          className="text-center md:text-left mb-14"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
            By the Numbers
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            OUR STATS
          </h2>
        </motion.div>

        {/* FOUR CARD GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {STATS_CARDS.map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-surface/30 border border-border p-6 rounded-sm relative overflow-hidden transition-colors duration-300 hover:border-zinc-700 hover:bg-zinc-900/40 group"
              whileHover={{ y: -3 }}
            >
              {/* Tactical Scanning Laser Edge Accent */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-hover/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              <div className="flex items-center justify-between mb-4">
                <card.icon className="w-5 h-5 text-primary-hover transition-transform group-hover:scale-110 duration-300" />
                <span className="font-mono text-[9px] text-zinc-600 font-bold">
                  REGISTRY_LOG_{i + 1}
                </span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tighter mb-1">
                {card.value}
              </h3>
              <h4 className="font-display font-bold text-[11px] text-zinc-200 uppercase tracking-wider mb-2">
                {card.label}
              </h4>
              <p className="font-body text-xs text-zinc-400 leading-normal">{card.subtext}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
