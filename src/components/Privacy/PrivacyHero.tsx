'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function PrivacyHero(): React.JSX.Element {
  return (
    <header className="relative w-full border-b border-border bg-zinc-950 py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none [background-image:linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          className="font-display text-[10px] font-black tracking-[0.3em] text-primary-hover uppercase mb-3 block"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Compliance Safeguards
        </motion.span>
        <motion.h1
          className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-none mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          PRIVACY POLICY & <span className="text-primary-hover">DATA PROTECTION</span>
        </motion.h1>
        <motion.p
          className="font-mono text-[10px] sm:text-xs text-zinc-500 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        ></motion.p>
      </div>
    </header>
  )
}
