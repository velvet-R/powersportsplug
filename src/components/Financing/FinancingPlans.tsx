'use client'

import { FINANCING_PLANS } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

export default function FinancingPlans(): React.JSX.Element {
  return (
    <section className="w-full py-20 border-b border-border/40 bg-background overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mb-14 text-center md:text-left">
          <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
            CHOOSE YOUR PLAN
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            Monthly Payment Options
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {FINANCING_PLANS.map((plan, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 16 } },
              }}
              className={`rounded-sm border p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                plan.featured
                  ? 'bg-zinc-950 border-primary-hover/80 shadow-[0_0_30px_rgba(255,69,0,0.15)] lg:-translate-y-2'
                  : 'bg-surface/10 border-border/70 hover:border-zinc-700 hover:bg-zinc-950/40'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-primary-hover text-black font-display text-[8px] font-black tracking-widest uppercase px-2.5 py-1 rounded-bl-xs">
                  Most Popular
                </div>
              )}

              <div>
                <span className="font-display text-[9px] font-bold uppercase tracking-widest text-zinc-500 block mb-4">
                  {plan.tier}
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display font-black text-4xl text-white">${plan.price}</span>
                  <span className="font-body text-xs text-zinc-500">/mo</span>
                </div>

                <ul className="space-y-2.5 border-t border-border/40 pt-4 font-body text-xs text-zinc-400">
                  <li className="flex items-center gap-1.5 font-medium text-zinc-200">
                    ▪ {plan.term}
                  </li>
                  <li>• {plan.suitability}</li>
                </ul>
              </div>

              <p className="font-display text-[9px] font-bold uppercase tracking-wider text-primary-hover mt-6 pt-2 border-t border-border/20">
                {plan.benefit}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
