'use client'

import { BlogPost } from '@/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

interface Props {
  post: BlogPost
}

const CATEGORY_COLORS: Record<string, string> = {
  'Buying Guides': '#3b82f6',
  Maintenance: '#22c55e',
  'Trail Riding': '#f59e0b',
  Financing: '#8b5cf6',
  'Brand Reviews': '#ff5722',
  Safety: '#ef4444',
}

const CARD_GRADIENTS: Record<string, string> = {
  'Buying Guides': 'linear-gradient(135deg, #0d1520 0%, #0f0f12 100%)',
  Maintenance: 'linear-gradient(135deg, #0d1a0f 0%, #0f0f12 100%)',
  'Trail Riding': 'linear-gradient(135deg, #1a1200 0%, #0f0f12 100%)',
  Financing: 'linear-gradient(135deg, #12091a 0%, #0f0f12 100%)',
  'Brand Reviews': 'linear-gradient(135deg, #1a0e00 0%, #0f0f12 100%)',
  Safety: 'linear-gradient(135deg, #1a0000 0%, #0f0f12 100%)',
}

export default function BlogCard({ post }: Props): React.JSX.Element {
  const color = CATEGORY_COLORS[post.category] ?? 'var(--color-primary-hover)'
  const gradient =
    CARD_GRADIENTS[post.category] ?? 'linear-gradient(135deg, #1a0e00 0%, #0f0f12 100%)'

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 17 } },
      }}
      whileHover="hovered"
      className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-all duration-300"
      style={{ '--hover-accent': color } as React.CSSProperties}
    >
      {/* Structural accent border morph overlay */}
      <motion.div
        variants={{
          hovered: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 border pointer-events-none z-30"
        style={{ borderColor: color }}
      />

      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full z-10">
        {/* Graphic Header Block */}
        <div className="relative overflow-hidden aspect-video bg-zinc-950">
          <motion.div
            variants={{
              hovered: { scale: 1.03 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
            style={{ background: gradient }}
          />

          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />

          <div className="absolute top-4 right-4 z-20">
            <span
              className="font-display text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm border"
              style={{
                background: `color-mix(in srgb, ${color} 15%, transparent)`,
                borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
                color,
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Large ghost context character */}
          <motion.div
            variants={{
              hovered: { x: 5, opacity: 0.25 },
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-2 left-4 font-display font-black uppercase select-none pointer-events-none leading-none opacity-15"
            style={{
              fontSize: '5rem',
              color: 'transparent',
              WebkitTextStroke: `1px ${color}`,
            }}
          >
            {post.category.charAt(0)}
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <h3
            className="font-display font-black uppercase leading-tight group-hover:text-primary-hover transition-colors duration-200 text-foreground"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
          >
            {post.title}
          </h3>
          <p className="font-body text-xs leading-relaxed text-muted-foreground line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full font-display text-[10px] font-black text-white shadow-sm"
                style={{ background: color }}
              >
                {post.author.charAt(0)}
              </div>
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-subtle">
                {post.author.split(' ')[0]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-subtle">
                {post.readTime}
              </span>
              <motion.svg
                variants={{
                  hovered: { x: 2 },
                }}
                transition={{ duration: 0.15 }}
                className="w-3 h-3"
                style={{ color }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
