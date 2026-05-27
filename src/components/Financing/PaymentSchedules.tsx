'use client'

import { FREQUENCY_CARDS } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

export default function PaymentSchedules(): React.JSX.Element {
  return (
    <section className="w-full py-20 border-b border-border bg-zinc-950">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mb-14 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-xl">📆</span>
            <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase">
              Flexible Payment Options
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-4">
            We make payments work for you
          </h2>
          <p className="font-body text-sm text-zinc-400 max-w-xl">
            Our goal is to keep your payments affordable and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FREQUENCY_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="bg-background border border-border p-6 rounded-sm relative flex flex-col justify-between"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <div className="w-8 h-8 rounded-sm bg-zinc-950 border border-border/80 text-primary-hover flex items-center justify-center mb-5">
                  <card.icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-black text-sm uppercase text-white tracking-wide mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
