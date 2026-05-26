'use client'

import heroBanner from '@/public/images/herobanner.jpg'
import { ArrowRight, Mail, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function CTASection(): React.JSX.Element {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribing email:', email)
  }

  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 text-white py-12 sm:py-16 my-auto">
      {/* ── Background Layer with asset protection overlays ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBanner}
          alt="ATV Off-road Background"
          placeholder="blur"
          fill
          priority
          className="object-cover object-center opacity-25 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90 z-10" />
      </div>

      {/* ── Content Container ── */}
      <div className="relative z-20 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Decorative Badge */}
        <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary-hover/30 bg-primary-hover/10 font-display text-[9px] font-bold tracking-widest uppercase text-primary-hover">
          ⚡ Limited Inventory Deals
        </div>

        {/* Heading */}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white max-w-2xl leading-tight">
          Ready to find your <span className="text-primary-hover">next ATV?</span>
        </h2>

        {/* Subtext Paragraph */}
        <p className="mt-3 max-w-xl font-body text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Join <span className="text-white font-bold font-mono">25,000+</span> riders who get
          exclusive deals, new listings, and off-road tips every week. Or call us right now.
        </p>

        {/* ── Newsletter Form Block ── */}
        <form
          onSubmit={handleSubscribe}
          className="mt-6 w-full max-w-md flex flex-col sm:flex-row gap-2 p-1 bg-surface/40 backdrop-blur-md border border-border/80 rounded shadow-xl focus-within:border-primary-hover transition-all duration-300"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-background/50 text-white placeholder-zinc-500 rounded border border-border/40 text-xs font-medium tracking-wide focus:outline-none focus:border-primary-hover transition-colors duration-200"
            />
          </div>
          <button
            type="submit"
            className="h-10 px-5 bg-primary-hover hover:bg-primary text-white hover:text-secondary font-display text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 group shrink-0"
          >
            <span>Join Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        {/* Divider Node */}
        <div className="mt-6 flex items-center justify-center gap-3 w-full max-w-xs">
          <div className="h-[1px] bg-border/30 flex-1" />
          <span className="font-display text-[9px] font-bold tracking-widest text-zinc-500 uppercase select-none">
            — OR —
          </span>
          <div className="h-[1px] bg-border/30 flex-1" />
        </div>

        {/* ── Direct Hotlink Calling Channel ── */}
        <a
          href="tel:9726889613"
          className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded bg-background border border-border transition-all duration-300 hover:border-primary-hover hover:bg-primary-hover/5 hover:-translate-y-0.5 group"
        >
          <PhoneCall className="w-3.5 h-3.5 text-primary-hover" />
          <span className="font-mono text-sm sm:text-base font-black tracking-tight text-white group-hover:text-primary-hover transition-colors">
            (972) 688-9613
          </span>
          <span className="text-zinc-500 font-sans">|</span>
          <span className="font-display text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            Call or text 7 days a week
          </span>
        </a>
      </div>
    </section>
  )
}
