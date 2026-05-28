'use client'

import { EXTENDED_REVIEWS } from '@/lib/payload/reviews'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, MessageSquare, ShieldCheck, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

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

export default function ReviewsSection(): React.JSX.Element {
  return (
    <section className="w-full bg-background py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden border-t border-border/40">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-border/5 pointer-events-none hidden lg:block" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
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
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="xl:col-span-4 lg:sticky lg:top-28"
          >
            <div className="bg-zinc-950 border border-border/80 rounded-xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary-hover/5 rounded-full blur-xl" />

              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-primary-hover" />
                <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                  Verified Scoreboard
                </h3>
              </div>

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

              {/* DISTRIBUTION */}
              <div className="space-y-3">
                {REVIEW_METRICS.distribution.map((item, index) => (
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
                        transition={{
                          duration: 0.8,
                          delay: index * 0.08,
                          ease: 'easeOut',
                        }}
                      />
                    </div>

                    <span className="w-8 text-muted-foreground text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-8 pt-6 border-t border-border/40 flex items-center gap-3 bg-zinc-900/40 -mx-6 -mb-6 p-4 border-b rounded-b-xl">
                <ShieldCheck className="w-5 h-5 text-status-available shrink-0" />

                <p className="font-body text-[11px] text-zinc-400 leading-tight">
                  All metrics pull directly from finalized cross-border carrier bills of lading and
                  lease terms.
                </p>
              </div>
            </div>
          </motion.div>

          {/* REVIEWS */}
          <div className="xl:col-span-8 flex flex-col gap-4 sm:gap-6">
            {EXTENDED_REVIEWS.slice(0, 3).map((review, i) => (
              <motion.div
                key={review.name + i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                }}
                whileHover={{
                  y: -4,
                }}
                className="group relative bg-surface/20 backdrop-blur-md border border-border/50 rounded-xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between transition-colors duration-300"
              >
                {/* TOP */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      className="w-10 h-10 rounded-full bg-zinc-900 border border-border flex items-center justify-center font-display text-xs font-black text-primary-hover uppercase"
                    >
                      {review.name.charAt(0)}
                    </motion.div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-black text-sm text-white uppercase tracking-wide">
                          {review.name}
                        </span>

                        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs bg-status-available/10 border border-status-available/20 text-status-available text-[9px] font-display font-bold tracking-wider uppercase">
                          <CheckCircle className="w-2.5 h-2.5 fill-current" />
                          Verified Pilot
                        </div>
                      </div>

                      <p className="font-body text-[11px] text-muted-foreground">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-primary-hover">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* REVIEW */}
                <p className="font-body text-xs sm:text-sm text-white/90 leading-relaxed mb-6">
                  "{review.text}"
                </p>

                {/* FOOTER */}
                <div className="pt-4 border-t border-border/30 flex items-center justify-between text-[10px] font-display text-muted-foreground uppercase tracking-widest">
                  <span>Unit Verified:</span>

                  <span className="text-white font-bold group-hover:text-primary-hover transition-colors">
                    {review.machine}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* CTA BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex justify-center"
            >
              <Link
                href="/reviews"
                className="group inline-flex items-center gap-3 h-12 px-7 bg-primary-hover hover:bg-primary-hover/90 text-white font-display text-[11px] font-black tracking-[0.18em] uppercase rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,69,0,0.25)]"
              >
                <span>See All Customer Reviews</span>

                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
