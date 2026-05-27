'use client'

import { MILESTONES_TIMELINE } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

export default function AboutTimelineTracker(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-background relative border-b border-border/40 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* HEADER */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
            Our Journey
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            MILESTONE BY MILESTONE
          </h2>
        </motion.div>

        {/* TIMELINE HUB */}
        <div className="relative w-full max-w-5xl mx-auto mt-12">
          {/* CENTRAL TRACKING backbone SPINE LINE - Progressive revealing effect via initial size reduction */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/80 transform md:-translate-x-1/2 pointer-events-none origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />

          <div className="space-y-12 relative">
            {MILESTONES_TIMELINE.map((node, i) => {
              const isLeft = node.alignment === 'left'

              return (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row w-full items-start relative ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* TEXT PANEL BODY AREA */}
                  <motion.div
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                    initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                  >
                    <div className="bg-zinc-950 border border-border p-6 rounded-sm relative group hover:border-zinc-700 transition-colors duration-200">
                      {/* Top Corner Badge Period Marker */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="font-display text-xs font-black text-primary-hover uppercase tracking-widest">
                          {node.period}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-700">NODE_0{i + 1}</span>
                      </div>
                      <h3 className="font-display font-black text-base sm:text-lg uppercase text-white tracking-wide mb-2">
                        {node.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {node.text}
                      </p>
                    </div>
                  </motion.div>

                  {/* CENTER ICON/PIN PLACEMENT POINT */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-3 h-3 bg-zinc-950 border-2 border-primary-hover rounded-full transform -translate-x-1/2 top-7 z-20 shadow-[0_0_10px_rgba(255,69,0,0.5)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 150 }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
