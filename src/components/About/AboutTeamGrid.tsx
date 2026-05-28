'use client'

import { TEAM_MEMBERS } from '@/lib/payload/team'
import { motion } from 'framer-motion'
import React from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
  },
}

export default function AboutTeamGrid(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-background border-b border-border/40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* HEADER BLOCK */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-ping" />
            <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Meet the Team
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
            THE PEOPLE BEHIND THE BRAND
          </h2>
          <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
            We're not a faceless corporate chain. We're your neighbors, your fellow riders, and your
            biggest advocates on and off the trail. Our team is what makes PowerSports Plug special.
          </p>
        </div>

        {/* PROFILE TEAM MATRIX CONTAINER */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-zinc-950 border border-border rounded-sm overflow-hidden flex flex-col group relative"
              whileHover={{ borderColor: 'rgba(255, 69, 0, 0.4)', y: -4 }}
            >
              {/* IMAGE HOVER FRAME ASSEMBLY */}
              <div className="relative w-full aspect-4/3 bg-zinc-900 overflow-hidden border-b border-border">
                {/* Fallback pattern graphic behind dynamic photo frames */}
                <div className="absolute inset-0 opacity-5 grid-bg" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* CARD DETAILS WRAPPER */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-lg uppercase text-white tracking-wide group-hover:text-primary-hover transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="font-display text-[10px] font-bold uppercase tracking-widest text-primary-hover/90 mt-0.5 mb-4">
                    {member.role}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
