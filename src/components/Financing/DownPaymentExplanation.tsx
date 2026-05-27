'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function DownPaymentExplanation(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-background border-b border-border/40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT PANEL: EXPLANATORY COPY */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase">
                  Down Payment Explained
                </span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                Your down payment is the first step toward ownership
              </h2>
            </div>

            <ul className="space-y-4 font-body text-sm sm:text-base text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-primary-hover font-bold select-none mt-0.5">▪</span>
                <span>
                  Typically <strong>10% – 20%</strong> of the ATV price
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-hover font-bold select-none mt-0.5">▪</span>
                <span>Paid upfront to secure your unit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-hover font-bold select-none mt-0.5">▪</span>
                <span>Reduces your total financed balance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-hover font-bold select-none mt-0.5">▪</span>
                <span>Helps keep your monthly payments lower</span>
              </li>
            </ul>
          </div>

          {/* RIGHT PANEL: VISUAL EXAMPLE GRID CARD */}
          <div className="lg:col-span-5">
            <motion.div
              className="w-full bg-zinc-950 border-2 border-border p-6 rounded-lg relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="absolute top-0 left-0 h-1 bg-primary-hover w-full" />
              <span className="font-mono text-[10px] font-bold text-zinc-500 tracking-widest uppercase block mb-4">
                EXAMPLE CALCULATION MESH
              </span>

              <p className="font-display font-black text-sm text-white uppercase mb-6">
                If your ATV costs <span className="text-primary-hover">$4,000:</span>
              </p>

              <div className="space-y-3 font-mono text-xs border-b border-border/40 pb-5 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">ATV Price</span>
                  <span className="text-white font-bold">$4,000</span>
                </div>
                <div className="flex justify-between items-center bg-surface/20 p-2.5 border border-border/60 rounded-xs">
                  <span className="text-zinc-200">Down Payment</span>
                  <span className="text-primary-hover font-black">$500 – $1,000</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[11px] font-body text-zinc-400 bg-zinc-900/40 p-3 border border-dashed border-border rounded-sm">
                <span className="text-emerald-500 font-bold">✓</span>
                <p>Remaining Balance Financed Over Time</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
