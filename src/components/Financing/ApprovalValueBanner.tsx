'use client'

import { PILL_BENEFITS } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

export default function ApprovalValueBanner(): React.JSX.Element {
  return (
    <section className="w-full py-20 border-b border-border/40 bg-background">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏁</span>
            <h2 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tight">
              NO CREDIT CHECK — EVERYONE APPROVED
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-zinc-400 max-w-2xl">
            Forget the banks. Our in-house financing program is designed to make ownership simple.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {PILL_BENEFITS.map((pill, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-zinc-950 border border-border p-5 rounded-full flex items-center gap-3.5 pl-6"
            >
              <div className="w-8 h-8 rounded-full bg-primary-hover/10 flex items-center justify-center text-primary-hover shrink-0">
                <pill.icon className="w-4 h-4" />
              </div>
              <span className="font-display text-xs font-black uppercase tracking-wider text-zinc-200">
                {pill.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <p className="font-body text-xs font-bold text-zinc-500 italic border-l border-border pl-4">
          "We care more about getting you riding than your credit history."
        </p>
      </div>
    </section>
  )
}
