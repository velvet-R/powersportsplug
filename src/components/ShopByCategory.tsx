'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// Quick config for your categories.
// Replace placeholders with your actual background image paths.
const CATEGORIES = [
  {
    title: 'ATV / Four-Wheeler',
    tagline: 'Trail Dominators',
    units: '70+ Units',
    href: '/shop?category=ATV&page=1',
    image: '/images/categories/atv.jpg',
  },
  {
    title: 'UTV / Side-by-Side',
    tagline: 'Work-Ready & Sport Performance',
    units: '10+ Units',
    href: '/shop?category=UTV&page=1',
    image: '/images/categories/utv.jpg',
  },
  {
    title: 'Dirt Bikes',
    tagline: 'Pure Motocross Power',
    units: '10+ Units',
    href: '/shop?category=Dirt+Bike&page=1',
    image: '/images/categories/dirt-bike.jpg',
  },
  {
    title: 'Boat',
    tagline: 'Built For The Next Gen',
    units: '10+ Units',
    href: '/shop?category=Boat&page=1',
    image: '/images/categories/boat.jpg',
  },
]

export default function ShopByCategory(): React.JSX.Element {
  return (
    <section className="w-full bg-background py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Subtle structural lines to maintain the premium dashboard style */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-border/10 pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-pulse" />
              <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                Shop by Category
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none">
              FIND YOUR{' '}
              <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
                PERFECT RIDE
              </span>
            </h2>
          </div>

          <p className="max-w-md font-body text-sm sm:text-base text-muted-foreground leading-relaxed lg:mb-1">
            From trail-dominating ATVs to work-ready UTVs and youth machines — we have something for
            every rider, every terrain, every budget.
          </p>
        </div>

        {/* ── CATEGORY GRID ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <Link href={cat.href} key={i} className="block group">
              <motion.div
                className="relative h-105 rounded-xl overflow-hidden border border-border/80 bg-zinc-900 flex flex-col justify-end p-6"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 80, damping: 15 },
                  },
                }}
                whileHover={{
                  y: -6,
                  borderColor: '#4B5563', // Soft gray glow borders on hover
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(255, 69, 0, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                  {/* Fallback pattern background if image is missing */}
                  <div className="absolute inset-0 bg-grid-dark opacity-30 mix-blend-overlay" />

                  {/* Real Image Layer */}
                  <div
                    className="w-full h-full bg-cover bg-center opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 ease-out"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  />

                  {/* Dynamic Dark Gradients to isolate text cleanly */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                </div>

                {/* Card Header Content (Top Right Details) */}
                <div className="absolute top-5 right-5 z-20">
                  <span className="font-display text-[10px] font-black tracking-widest text-white/90 bg-black/60 border border-white/10 px-2.5 py-1 rounded-sm uppercase backdrop-blur-xs">
                    {cat.units}
                  </span>
                </div>

                {/* Card Main Typography (Bottom Position) */}
                <div className="relative z-20 w-full transform">
                  <p className="font-display text-[10px] font-bold tracking-widest text-primary-hover uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {cat.tagline}
                  </p>

                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight group-hover:text-primary-hover transition-colors duration-200 leading-tight mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {cat.title}
                  </h3>

                  {/* Clean Action Button reveal */}
                  <div className="flex items-center gap-2 border-t border-white/10 pt-4 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="font-display text-[11px] font-black tracking-widest uppercase text-white">
                      Explore Inventory
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-primary-hover flex items-center justify-center transition-colors duration-200">
                      <ArrowUpRight className="w-3 h-3 text-white transition-transform duration-300 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
