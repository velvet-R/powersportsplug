'use client'

import { EXTENDED_REVIEWS } from '@/lib/constants'
import { AnimatePresence, motion } from 'framer-motion'
import {
    CheckCircle,
    ChevronDown,
    MessageSquare,
    ShieldCheck,
    SlidersHorizontal,
    Star,
} from 'lucide-react'
import React, { useMemo, useState } from 'react'

const REVIEW_METRICS = {
  average: 4.9,
  totalCount: '2,480+',
  distribution: [
    { stars: 5, percentage: 94 },
    { stars: 4, percentage: 5 },
    { stars: 3, percentage: 1 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ],
}

const FILTER_CATEGORIES = ['All Feedback', 'Financing', 'Delivery', 'Polaris', 'Can-Am', 'Honda']
const INITIAL_BATCH_SIZE = 4

export default function DedicatedReviewsPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState('All Feedback')
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE)

  // 1. DYNAMIC COMPUTE FILTERED MATRIX
  const filteredReviews = useMemo(() => {
    setVisibleCount(INITIAL_BATCH_SIZE) // Reset page depth batch count when filter flips
    if (activeFilter === 'All Feedback') return EXTENDED_REVIEWS

    return EXTENDED_REVIEWS.filter((review) =>
      review.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase()),
    )
  }, [activeFilter])

  // 2. SLICE STREAM TO VISIBLE SCOPE
  const visibleReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount)
  }, [filteredReviews, visibleCount])

  const hasMore = visibleCount < filteredReviews.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + INITIAL_BATCH_SIZE)
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary-hover selection:text-black">
      {/* CINEMATIC BG ELEMENT GRIDS */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-border/5 pointer-events-none hidden lg:block" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER HERO AREA */}
      <header className="relative border-b border-border bg-zinc-950 py-20 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zm0 39h40v1H0zM0 0v40h1V0zm39 0v40h1V0z' fill='%2327272A' fill-opacity='0.5'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="mx-auto max-w-screen-2xl w-full relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-hover animate-pulse" />
              <span className="font-display text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
                CENTRAL PILOT REGISTRY
              </span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-none mb-6">
              VERIFIED RIDER{' '}
              <span className="text-primary-hover drop-shadow-[0_0_20px_rgba(255,69,0,0.15)]">
                INTELLIGENCE.
              </span>
            </h1>
            <p className="font-body text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Every log below represents an authenticated delivery contract, complete with dynamic
              asset routing maps and finalized financing agreements across all 50 states.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN REGISTRY CONTROL GRID */}
      <main className="mx-auto max-w-screen-2xl w-full px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: STICKY METRICS SUMMARY (4 COLS) */}
          <div className="xl:col-span-4 lg:sticky lg:top-24">
            <div className="bg-zinc-950 border border-border rounded-sm p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-primary-hover" />
                <h3 className="font-display font-black text-xs text-white uppercase tracking-wider">
                  Aggregated Scoreboard
                </h3>
              </div>

              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-display font-black text-6xl sm:text-7xl text-white tracking-tighter">
                  {REVIEW_METRICS.average}
                </span>
                <div>
                  <div className="flex items-center gap-0.5 text-primary-hover mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-body text-[11px] text-muted-foreground">
                    Derived from{' '}
                    <span className="text-white font-bold">{REVIEW_METRICS.totalCount}</span> field
                    reports
                  </p>
                </div>
              </div>

              <p className="font-body text-xs text-muted-foreground mb-8 leading-relaxed border-b border-border/60 pb-6">
                Metrics sync continuously with actual asset identification codes, cross-state load
                carrier bills, and finalized contract closures.
              </p>

              {/* Score Distribution Stack */}
              <div className="space-y-3.5">
                {REVIEW_METRICS.distribution.map((item) => (
                  <div
                    key={item.stars}
                    className="flex items-center gap-3 text-xs font-display font-bold"
                  >
                    <span className="w-4 text-muted-foreground text-right">{item.stars}★</span>
                    <div className="flex-1 h-2 bg-zinc-900 border border-border/40 rounded-xs overflow-hidden">
                      <motion.div
                        className="h-full bg-primary-hover"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="w-8 text-muted-foreground text-right font-mono">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom System Subtext Stamp */}
              <div className="mt-8 pt-5 border-t border-border flex items-center gap-3 bg-surface/30 -mx-8 -mb-8 p-5 rounded-b-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="font-body text-[11px] text-zinc-400 leading-normal">
                  All logged entries conform to rigid transaction transparency standards. Zero
                  synthetic edits permitted.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DYNAMIC GRID INTERACTIVE CONTROLLER (8 COLS) */}
          <div className="xl:col-span-8 space-y-8">
            {/* TACTICAL FILTER BAR HUB */}
            <div className="bg-zinc-950 border border-border p-3 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-muted-foreground px-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="font-display text-[10px] font-black tracking-wider uppercase">
                  Filter Logs:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {FILTER_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 rounded-xs font-display text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                      activeFilter === cat
                        ? 'bg-white text-black border-white'
                        : 'bg-surface text-zinc-400 border-border/40 hover:text-white hover:border-zinc-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE ANCHOR FEED MATRIX STREAM */}
            <motion.div className="grid grid-cols-1 gap-5" layout="position">
              <AnimatePresence mode="popLayout">
                {visibleReviews.length > 0 ? (
                  visibleReviews.map((review, i) => (
                    <motion.div
                      key={review.name + '-' + idxSecure(review.name, i)}
                      className="group relative bg-surface/10 border border-border rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all"
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -10 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      whileHover={{
                        borderColor: 'var(--color-border-hover, #52525b)',
                        backgroundColor: 'rgba(20, 20, 23, 0.4)',
                      }}
                    >
                      {/* Top Meta Identity Layer */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-border flex items-center justify-center font-display text-xs font-black text-primary-hover uppercase">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-2">
                              <span className="font-display font-black text-sm text-white uppercase tracking-wide">
                                {review.name}
                              </span>
                              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-display font-bold tracking-widest uppercase">
                                <CheckCircle className="w-2.5 h-2.5 fill-current" /> Verified Owner
                              </div>
                            </div>
                            <p className="font-body text-[11px] text-zinc-500 mt-0.5">
                              {review.location} •{' '}
                              <span className="font-mono text-[10px]">{review.date}</span>
                            </p>
                          </div>
                        </div>

                        {/* Custom Star Score Layout */}
                        <div className="flex items-center gap-0.5 text-primary-hover shrink-0">
                          {[...Array(review.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Content Prose block quote */}
                      <p className="font-body text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 italic">
                        "{review.text}"
                      </p>

                      {/* System Asset Reference Tag Footers */}
                      <div className="pt-4 border-t border-border/40 flex items-center justify-between text-[9px] font-display text-zinc-500 uppercase tracking-widest">
                        <span>Allocated System Asset:</span>
                        <span className="text-white font-black group-hover:text-primary-hover transition-colors">
                          {review.machine}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  /* Clean empty search fallback state boundary */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 text-center border border-dashed border-border rounded-sm bg-zinc-950/20"
                  >
                    <span className="font-display text-xs text-zinc-500 uppercase tracking-widest block">
                      No matching records found for configuration "{activeFilter}".
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* DYNAMIC PROGRESSIVE REVEAL BUTTON BAR */}
            {hasMore && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="group inline-flex items-center gap-2 h-11 px-8 bg-zinc-950 hover:bg-zinc-900 border border-border hover:border-zinc-700 text-white font-display text-[10px] font-black tracking-widest uppercase rounded-sm transition-all duration-150 cursor-pointer active:scale-[0.99]"
                >
                  <span>Load More Field Reports</span>
                  <ChevronDown className="w-3.5 h-3.5 text-primary-hover transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// Utility lock generator for indexing list nodes safely
function idxSecure(str: string, index: number): string {
  return str.replace(/[^A-Z0-9]/gi, '').toLowerCase() + '-' + index
}
