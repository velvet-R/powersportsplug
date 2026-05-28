'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function AboutStoryBlocks(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-background relative border-b border-border/40 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* SECTION HEADER BLOCK */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
            Who We Are
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            OUR STORY
          </h2>
        </motion.div>

        {/* COMPREHENSIVE SPLIT ROW CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT STORY STREAM AND FOUNDER QUOTE ELEMENT */}
          <motion.div
            className="space-y-6 font-body text-zinc-400 text-xs sm:text-sm leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              Every great business starts with a problem that needs solving. For the founders of
              PowerSports Plug, that problem was simple: they couldn't find a dealership that
              actually understood off-road riders. Most places treated ATVs and side-by-sides like
              any other product — something to move off a lot as fast as possible.
            </p>
            <p>
              So they decided to build something different. Starting with a small lot, a handful of
              machines, and a whole lot of passion, PowerSports Plug opened its doors with one
              promise: to serve riders the way they deserved to be served — with honesty, expertise,
              and genuine enthusiasm for the sport.
            </p>

            {/* Direct Highlighting Blockquote Component */}
            <motion.div
              className="relative border-l-2 border-primary-hover bg-zinc-950 p-5 rounded-sm my-8"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 90 }}
            >
              <p className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wide leading-snug italic">
                "We didn't open a dealership to sell vehicles. We opened one to help people find
                their perfect ride — and then support them every mile after that."
              </p>
            </motion.div>

            <p>
              In the early days, the team was lean. The founders wore every hat — salesperson,
              mechanic, delivery driver, and customer service rep. They spent weekends riding local
              trails with customers, learning which machines performed best in which terrain, and
              building a reputation as the most knowledgeable and trustworthy shop in the region.
            </p>
          </motion.div>

          {/* RIGHT STORY STREAM AREA */}
          <motion.div
            className="space-y-6 font-body text-zinc-400 text-xs sm:text-sm leading-relaxed lg:pt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p>
              Word spread fast. Repeat customers brought their friends. Friends brought their
              families. First-time buyers came in nervous and left excited, armed with the knowledge
              and confidence to tackle their first trail. It didn't take long before Power Sports
              Plug outgrew its original location.
            </p>
            <p>
              Today, we carry premium ATVs, UTVs, dirt bikes, side-by-sides, and powersports
              accessories from the world's leading brands. Our service department has grown into a
              full-scale facility staffed by certified technicians who live and breathe these
              machines. Our finance team works with buyers of all credit backgrounds to find a
              payment plan that works.
            </p>
            <p>
              We are proud to be more than just a place to buy a vehicle. We are a meeting point for
              the off-road community. A place where stories are shared, new riders are welcomed, and
              experienced riders find the gear and support to keep pushing further.
            </p>
            <p className="font-display font-bold text-xs uppercase tracking-wider text-white pt-4">
              This is PowerSports Plug. This is who we are, where we came from, and what we stand
              for every single day.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
