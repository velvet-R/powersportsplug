'use client'

import { WHY_CHOOSE_US_CARDS } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

export default function WhyFinanceWithUs(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-background border-b border-border/40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mb-14 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-xl">🏆</span>
            <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase">
              Core Proof Matrix
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            WHY FINANCE WITH US?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {WHY_CHOOSE_US_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="bg-zinc-950 border border-border p-6 rounded-sm text-center md:text-left flex flex-col items-center md:items-start"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="w-8 h-8 rounded-sm bg-surface/40 border border-border flex items-center justify-center text-primary-hover mb-5">
                <card.icon className="w-4 h-4" />
              </div>
              <h3 className="font-display font-black text-xs uppercase text-white tracking-wider leading-snug">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
