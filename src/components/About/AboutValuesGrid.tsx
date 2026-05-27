'use client'

import { CORE_VALUES_GRID } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

import type { Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 18, stiffness: 80 },
  },
}

export default function AboutValuesGrid(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-zinc-950 border-b border-border overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* HEADER BLOCK */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
            What We Stand For
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            OUR CORE VALUES
          </h2>
        </motion.div>

        {/* 6-CARD GRID SYSTEM */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {CORE_VALUES_GRID.map((val, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-surface/20 border border-border/80 p-6 sm:p-8 rounded-sm relative overflow-hidden group hover:border-zinc-600 hover:bg-zinc-900/30 transition-all duration-300 flex flex-col justify-between"
              whileHover={{ y: -4 }}
            >
              <div>
                {/* Upper Metadata Layer Row */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-9 h-9 rounded-sm bg-zinc-900 border border-border flex items-center justify-center text-primary-hover group-hover:bg-primary-hover group-hover:text-black transition-colors duration-300">
                    <val.icon className="w-4 h-4 transition-transform group-hover:rotate-6 duration-300" />
                  </div>
                  <span className="font-display font-black text-2xl tracking-tighter text-zinc-800 group-hover:text-primary-hover/20 transition-colors duration-300">
                    {val.num}
                  </span>
                </div>

                {/* Text Block Labels */}
                <h3 className="font-display font-black text-sm uppercase text-white tracking-wide mb-3">
                  {val.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {val.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
