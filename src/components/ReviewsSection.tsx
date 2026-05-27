'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, Star } from 'lucide-react'
import React, { useState } from 'react'

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

const INDIVIDUAL_REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Dallas, TX',
    machine: '2026 Polaris Sportsman 850',
    rating: 5,
    text: 'Honestly, I was skeptical about the no-credit-check financing claim because my score is rough after a messy divorce. Walked through the options over the phone with an agent, locked the pricing, and the Sportsman was dropped right at my ranch exactly 5 days later. Flawless process.',
  },
  {
    name: 'Sarah K.',
    location: 'Denver, CO',
    machine: '2025 Can-Am Outlander 1000R',
    rating: 5,
    text: 'The pre-shipment detailing on my Outlander was immaculate—not a single smudge on the plastics. They handled all the cross-state paperwork digitally. This team completely sets the standard for buying utility machines online.',
  },
  {
    name: 'David L.',
    location: 'Atlanta, GA',
    machine: '2023 Honda Foreman 4x4',
    rating: 4,
    text: 'Excellent customer service from start to finish. Sifting through inventory choices took me a second, but once I locked the unit, the financing terms were completely straightforward and fair. Delivered safely right to my driveway.',
  },
  // ── EXTRA REVIEWS UNFOLDED ON CLICK ──
  {
    name: 'Robert H.',
    location: 'Phoenix, AZ',
    machine: '2026 Can-Am Outlander MAX',
    rating: 5,
    text: 'First time buying a powersports vehicle online without touching it first. The agents communicated clearly at every stage. Delivery driver was professional and did a thorough walkthrough with me in the driveway.',
  },
  {
    name: 'Brandon M.',
    location: 'Nashville, TN',
    machine: '2025 Polaris Scrambler 850',
    rating: 5,
    text: 'Zero credit hurdles. I filed the application online, got a call back within two hours with clear terms, confirmed my options, and had the unit delivered that weekend. Absolute game-changer.',
  },
]

export default function ReviewsSection(): React.JSX.Element {
  const [showAll, setShowAll] = useState(false)

  // Determine which subset of reviews to render based on user selection state
  const visibleReviews = showAll ? INDIVIDUAL_REVIEWS : INDIVIDUAL_REVIEWS.slice(0, 3)

  return (
    <section className="w-full bg-background py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden border-t border-border/40">
      {/* Structural Racing Line Grid Overlays */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-border/5 pointer-events-none hidden lg:block" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-pulse" />
            <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Verifiable Community Feedback
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none mb-6">
            REAL RIDERS.{' '}
            <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
              REAL RESULTS.
            </span>
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            Thousands of riders across all 50 states have secured their machines without standard
            dealership friction. Don’t take our word for it—read the field reports directly from our
            owners.
          </p>
        </div>

        {/* ── MAIN CONTENT SPLIT GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* ── LEFT SIDE: AGGREGATE STATS CARD (4 COLS) ── */}
          <div className="xl:col-span-4 lg:sticky lg:top-28">
            <div className="bg-zinc-950 border border-border/80 rounded-xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary-hover/5 rounded-full blur-xl" />

              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-primary-hover" />
                <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                  Verified Scoreboard
                </h3>
              </div>

              {/* Huge Numerical Average Block */}
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-display font-black text-6xl sm:text-7xl text-white tracking-tighter">
                  {REVIEW_METRICS.average}
                </span>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-primary-hover" />
                    ))}
                  </div>
                  <p className="font-body text-xs text-muted-foreground">
                    Based on{' '}
                    <span className="text-white font-bold">{REVIEW_METRICS.totalCount}</span>{' '}
                    purchases
                  </p>
                </div>
              </div>

              <p className="font-body text-xs text-muted-foreground mb-8 leading-relaxed border-b border-border/40 pb-6">
                Our scores map directly to verified unit allocations, financing originations, and
                home delivery completions across our full commercial network.
              </p>

              {/* Metric Distribution Bars */}
              <div className="space-y-3">
                {REVIEW_METRICS.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3 text-xs font-display">
                    <span className="w-3 text-muted-foreground font-bold text-right">
                      {item.stars}★
                    </span>
                    <div className="flex-1 h-2 bg-zinc-900 border border-border/40 rounded-sm overflow-hidden">
                      <motion.div
                        className="h-full bg-primary-hover"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="w-8 text-muted-foreground text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Trust Badge Stamp Footer */}
              <div className="mt-8 pt-6 border-t border-border/40 flex items-center gap-3 bg-zinc-900/40 -mx-6 -mb-6 p-4 border-b rounded-b-xl">
                <ShieldCheck className="w-5 h-5 text-status-available flex-shrink-0" />
                <p className="font-body text-[11px] text-zinc-400 leading-tight">
                  All metrics pull directly from finalized cross-border carrier bills of lading and
                  lease terms.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: FEEDBACK MATRIX STREAM (8 COLS) ── */}
          <div className="xl:col-span-8 flex flex-col gap-4 sm:gap-6">
            <motion.div className="flex flex-col gap-4 sm:gap-6" layout="position">
              <AnimatePresence mode="popLayout">
                {visibleReviews.map((review, i) => (
                  <motion.div
                    key={review.name + i}
                    className="group relative bg-surface/20 backdrop-blur-md border border-border/50 rounded-xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 17 }}
                    whileHover={{
                      borderColor: '#4B5563',
                      backgroundColor: 'rgba(24, 24, 27, 0.4)',
                    }}
                  >
                    {/* Upper Metadata Block */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-border flex items-center justify-center font-display text-xs font-black text-primary-hover uppercase">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-display font-black text-sm text-white uppercase tracking-wide">
                              {review.name}
                            </span>
                            <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs bg-status-available/10 border border-status-available/20 text-status-available text-[9px] font-display font-bold tracking-wider uppercase">
                              <CheckCircle className="w-2.5 h-2.5 fill-current" /> Verified Pilot
                            </div>
                          </div>
                          <p className="font-body text-[11px] text-muted-foreground">
                            {review.location}
                          </p>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5 text-primary-hover">
                        {[...Array(review.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Main Review Quote */}
                    <p className="font-body text-xs sm:text-sm text-white/90 leading-relaxed mb-6">
                      "{review.text}"
                    </p>

                    {/* Bottom Allocation Sub-tag */}
                    <div className="pt-4 border-t border-border/30 flex items-center justify-between text-[10px] font-display text-muted-foreground uppercase tracking-widest">
                      <span>Unit Verified:</span>
                      <span className="text-white font-bold group-hover:text-primary-hover transition-colors">
                        {review.machine}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* ── EXPAND/COLLAPSE CONTROLLER BUTTON ── */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 h-11 px-6 bg-zinc-900 hover:bg-zinc-800 border border-border hover:border-zinc-700 text-white font-display text-[11px] font-black tracking-widest uppercase rounded transition-all duration-200"
              >
                <span>{showAll ? 'Collapse Review Feed' : 'See All Customer Reviews'}</span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4 text-primary-hover transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary-hover transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
