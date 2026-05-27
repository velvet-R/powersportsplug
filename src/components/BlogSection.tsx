'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ARTICLES = [
  {
    slug: 'atv-maintenance-guide-2026',
    title: 'The Outpost Manual: Deep-Woods Maintenance Tasks Every Rider Must Master',
    excerpt:
      'Bypassing basic oil checks. We map out the critical suspension adjustments, axle seal inspections, and wet-clutch calibrations required to survive brutal backcountry isolation.',
    category: 'Field Mechanics',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    slug: 'no-credit-financing-breakdown',
    title: 'Demystifying Powersports Terms: How No-Credit Financing Operates Behind the Scenes',
    excerpt:
      'An explicit breakdown of asset-backed verification pipelines and how you can leverage alternative tracking points to bypass traditional bank credit blocks.',
    category: 'Buyer Intelligence',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    featured: false,
  },
  {
    slug: 'top-trails-alaska-texas',
    title: 'Cross-Border Expeditions: The Absolute Most Punishing Off-Road Trails in America',
    excerpt:
      'From the frozen mud-bogs of deep Alaska to the blistering rock-crawling paths of West Texas, these are the proving grounds built for extreme utility machines.',
    category: 'Trail Mapping',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
    featured: false,
  },
]

export default function BlogSection(): React.JSX.Element {
  return (
    <section className="w-full bg-zinc-950 py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden border-t border-border/40">
      {/* Structural Ambient Grid Lighting */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-border/5 pointer-events-none hidden lg:block" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-hover/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        {/* ── SECTION HEADER WITH ASYMMETRICAL LAYOUT ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-border/40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-pulse" />
              <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                The Dispatch Room
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none">
              FIELD REPORTS &{' '}
              <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
                INTELLIGENCE
              </span>
            </h2>
          </div>

          <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md lg:text-right leading-relaxed">
            Professional mechanical overviews, route deep-dives, and financial breakdowns compiled
            straight from our dispatch technicians and logistics network specialists.
          </p>
        </div>

        {/* ── STAGGERED EDITORIAL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── LEFT SIDE: THE FEATURED ARTICLE HERO (7 COLS) ── */}
          {ARTICLES.filter((a) => a.featured).map((post) => (
            <motion.div
              key={post.slug}
              className="lg:col-span-7 group relative flex flex-col justify-between bg-zinc-900/20 border border-border/60 hover:border-zinc-700 rounded-xl overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Massive Cinematic Image Frame */}
              <div className="w-full aspect-video sm:aspect-[16/10] relative overflow-hidden bg-zinc-950 border-b border-border/40">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 z-10 group-hover:opacity-40 transition-opacity" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-102 transition-transform duration-700 ease-out grayscale-[30%] group-hover:grayscale-0"
                />

                {/* Upper Absolute Tag Cloud */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-white font-display text-[9px] font-black tracking-wider uppercase rounded-xs">
                    <Tag className="w-2.5 h-2.5 text-primary-hover" /> {post.category}
                  </span>
                </div>
              </div>

              {/* Text Meta Content Block */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] font-body text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary-hover" /> {post.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className="text-primary-hover font-display font-black tracking-widest uppercase text-[10px]">
                      ★ Featured Dispatch
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-primary-hover transition-colors">
                    {post.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/40">
                  <Link
                    href={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-2 font-display text-[11px] font-black tracking-widest text-white group-hover:text-primary-hover uppercase transition-colors"
                  >
                    <span>Read Full Briefing</span>
                    <ArrowUpRight className="w-4 h-4 text-primary-hover transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* ── RIGHT SIDE: COMPACT GRID STREAM (5 COLS) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {ARTICLES.filter((a) => !a.featured).map((post, idx) => (
              <motion.div
                key={post.slug}
                className="group relative bg-zinc-900/10 border border-border/40 hover:border-zinc-700 rounded-xl overflow-hidden p-5 flex flex-col sm:flex-row gap-5 transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Thumb Core Frame Asset */}
                <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-lg bg-zinc-950 border border-border/40 overflow-hidden relative flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Vertical Stream Segment Typography */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] font-display font-bold tracking-wider text-muted-foreground uppercase mb-1.5">
                      <span className="text-primary-hover">{post.category}</span>
                      <span>•</span>
                      <span className="font-body font-normal text-zinc-500">{post.readTime}</span>
                    </div>

                    <h4 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wide leading-tight mb-2 group-hover:text-primary-hover transition-colors">
                      {post.title}
                    </h4>

                    <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/20 flex justify-end">
                    <Link
                      href={`/journal/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-display text-[10px] font-black tracking-widest text-white group-hover:text-primary-hover uppercase transition-colors"
                    >
                      <span>Analyze</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary-hover" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* ── DEEP FOOTER INDEX ANCHOR BUTTON ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-2"
            >
              <Link
                href="/journal"
                className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 border border-border hover:border-zinc-700 text-white font-display text-[11px] font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-primary-hover" />
                <span>Access Full Journal Index</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
