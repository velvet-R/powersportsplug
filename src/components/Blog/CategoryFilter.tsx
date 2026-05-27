'use client'

import { CATEGORIES } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  active: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ active, onChange }: Props): React.JSX.Element {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {CATEGORIES.map((cat) => {
        const isActive = cat === active
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="group relative px-4 py-2 font-display text-[11px] font-bold tracking-widest uppercase rounded-sm transition-colors duration-200 cursor-pointer overflow-hidden"
            style={{
              color: isActive ? '#fff' : 'var(--color-muted-foreground)',
            }}
          >
            {/* Shared layout morph structural pill layer */}
            {isActive ? (
              <motion.span
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-primary-hover border border-primary-hover z-0 rounded-sm shadow-[0_2px_10px_rgba(255,87,34,0.15)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            ) : (
              <span className="absolute inset-0 border border-border group-hover:border-primary-hover transition-colors duration-200 rounded-sm z-0 bg-surface" />
            )}

            {/* Content text anchor */}
            <span className="relative z-10 group-hover:text-white transition-colors duration-200">
              {cat}
            </span>
          </button>
        )
      })}
    </div>
  )
}
