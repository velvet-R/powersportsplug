'use client'

import { WORKFLOW_STEPS } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

export default function FinancingWorkflow(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-zinc-950 border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-xl">💳</span>
            <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase">
              How Our ATV Financing Works
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            Getting your ATV is quick and straightforward
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div
              key={i}
              className="bg-surface/20 border border-border/80 p-6 rounded-sm relative group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-9 h-9 rounded-sm bg-zinc-900 border border-border flex items-center justify-center text-primary-hover group-hover:bg-primary-hover group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-4 h-4" />
                </div>
                <span className="font-display font-black text-3xl text-zinc-800 tracking-tighter select-none">
                  {step.num}
                </span>
              </div>
              <h3 className="font-display font-black text-sm uppercase text-white tracking-wide mb-2">
                {step.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
