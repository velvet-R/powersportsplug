'use client'

import AboutHeroBanner from '@/components/About/AboutHeroBanner'
import AboutStatsMetrics from '@/components/About/AboutStatsMetrics'
import AboutStoryBlocks from '@/components/About/AboutStoryBlocks'
import AboutTimelineTracker from '@/components/About/AboutTimelineTracker'
import AboutValuesGrid from '@/components/About/AboutValuesGrid'
import React from 'react'

// ── NEW MODULAR CODE-SPLIT SECTIONS JOINING THE STREAM ──
import AboutCTA from '@/components/About/AboutCTA'
import AboutServiceShop from '@/components/About/AboutServiceShop'
import AboutTeamGrid from '@/components/About/AboutTeamGrid'
import AboutWhyUs from '@/components/About/AboutWhyUs'

export default function AboutPageMasterLayout(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary-hover selection:text-black">
      {/* SECTION 1: TOP IMAGE BANNER HERO */}
      <AboutHeroBanner />

      {/* SECTION 2: WHO WE ARE TWIN-COLUMN NARRATIVE */}
      <AboutStoryBlocks />

      {/* SECTION 3: BY THE NUMBERS STATIC DATA METRICS */}
      <AboutStatsMetrics />

      {/* SECTION 4: MILESTONE TRACKER CHRONOLOGICAL TIMELINE */}
      <AboutTimelineTracker />

      {/* SECTION 5: SIX-CARD CORE VALUES CONTAINER MATRIX */}
      <AboutValuesGrid />

      {/* SECTION 6: MEET THE TEAM PROFILE DECK */}
      <AboutTeamGrid />

      {/* SECTION 7: SIX REASONS WHY US ADVANTAGES */}
      <AboutWhyUs />

      {/* SECTION 8: SERVICE MECHANICAL TECH FACILITY DETAILED INDEX */}
      <AboutServiceShop />

      {/* SECTION 9: TERMINAL CONVERSION HUB + 3-CORE GUARANTEES */}
      <AboutCTA />
    </div>
  )
}
