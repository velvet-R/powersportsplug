'use client'

import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  Clock,
  CornerDownRight,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import React, { useState } from 'react'

export default function ContactPage(): React.JSX.Element {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cityState: '',
    interest: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle secure off-platform agent routing here
    console.log('Routing lead details to agent pipeline:', formData)
  }

  const companyInfo: CompanyInfo | null = useCompanyInfo()

  return (
    <main className="w-full bg-background min-h-screen pt-24 pb-20 overflow-hidden relative">
      {/* ── BACKGROUND RACING GRID / LIGHTING ── */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-border/5 pointer-events-none hidden lg:block" />
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary-hover/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-zinc-900/40 rounded-full blur-[120px] pointer-events-none" />

      {/* ── SECTION 01: HERO HEADER (FULL WIDTH) ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 mx-auto max-w-screen-2xl border-b border-border/40 pb-16 mb-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-pulse" />
            <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Direct Communication Pipeline
            </span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none mb-6">
            GET IN TOUCH.{' '}
            <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
              LET'S CONNECT.
            </span>
          </h1>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Ready to find your next machine? Have questions about financing or inventory? Our team
            is standing by—no runaround, just straight answers from dedicated agents.
          </p>
        </div>
      </section>

      {/* ── SECTION 02: TRI-METRIC QUICK CONTACT CARDS (FULL WIDTH) ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 mx-auto max-w-screen-2xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Call Directly */}
          <motion.div
            whileHover={{ y: -4, borderColor: '#4B5563' }}
            className="bg-zinc-950 border border-border/80 rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border/40 flex items-center justify-center text-primary-hover group-hover:bg-primary-hover group-hover:text-white transition-colors duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-[10px] font-black tracking-widest text-muted-foreground uppercase block mb-0.5">
                  Voice Dispatch
                </span>
                <a
                  href={`tel:${companyInfo?.phone || '18005550199'}`}
                  className="font-display font-black text-lg sm:text-xl text-white tracking-wide hover:text-primary-hover transition-colors"
                >
                  {companyInfo?.phone || '1 (800) 555-0199'}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Email Hub */}
          <motion.div
            whileHover={{ y: -4, borderColor: '#4B5563' }}
            className="bg-zinc-950 border border-border/80 rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border/40 flex shrink-0 items-center justify-center text-primary-hover group-hover:bg-primary-hover group-hover:text-white transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-[10px] font-black tracking-widest text-muted-foreground uppercase block mb-0.5">
                  Secure Digital Inbox
                </span>
                <a
                  href={`mailto:${companyInfo?.email || 'agents@showroom.com'}`}
                  className="font-display font-black text-lg sm:text-xl text-white tracking-wide hover:text-primary-hover transition-colors"
                >
                  {companyInfo?.email || 'agents@showroom.com'}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Logistics Profile */}
          <motion.div
            whileHover={{ y: -4, borderColor: '#4B5563' }}
            className="bg-zinc-950 border border-border/80 rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border/40 flex items-center justify-center text-primary-hover group-hover:bg-primary-hover group-hover:text-white transition-colors duration-300">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-[10px] font-black tracking-widest text-muted-foreground uppercase block mb-0.5">
                  Logistics Network
                </span>
                <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-wide uppercase">
                  Nationwide Delivery{' '}
                  <span className="text-zinc-500 font-medium text-sm block sm:inline sm:ml-1">
                    (All 50 States)
                  </span>
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 03: SPLIT DEEP MATRIX HUB (LEFT FORM, RIGHT SPEC INFO) ── */}
      <section className="w-full px-4 sm:px-8 lg:px-16 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── LEFT COLUMN: SECURE BRIEFING FORM (7 COLS) ── */}
          <div className="lg:col-span-7 bg-surface/10 backdrop-blur-md border border-border/50 rounded-xl p-6 sm:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <CornerDownRight className="w-4 h-4 text-primary-hover" />
                <span className="font-display font-black text-xs text-white uppercase tracking-wider">
                  SEND A MESSAGE
                </span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                How Can We Help?
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full h-11 bg-zinc-950 border border-border/60 rounded px-4 text-xs font-body text-white focus:outline-none focus:border-zinc-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block font-display text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full h-11 bg-zinc-950 border border-border/60 rounded px-4 text-xs font-body text-white focus:outline-none focus:border-zinc-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 bg-zinc-950 border border-border/60 rounded px-4 text-xs font-body text-white focus:outline-none focus:border-zinc-500 transition-colors"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div>
                  <label className="block font-display text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 bg-zinc-950 border border-border/60 rounded px-4 text-xs font-body text-white focus:outline-none focus:border-zinc-500 transition-colors"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block font-display text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                  City, State
                </label>
                <input
                  type="text"
                  required
                  value={formData.cityState}
                  onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                  className="w-full h-11 bg-zinc-950 border border-border/60 rounded px-4 text-xs font-body text-white focus:outline-none focus:border-zinc-500 transition-colors"
                  placeholder="Dallas, TX"
                />
              </div>

              <div>
                <label className="block font-display text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                  I'm Interested In
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full h-11 bg-zinc-950 border border-border/60 rounded px-4 text-xs font-display font-bold text-white tracking-wide focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-zinc-600">
                      Select Allocation Type
                    </option>
                    <option value="atv-financing" className="bg-zinc-950">
                      ATV / Utility Vehicle Financing
                    </option>
                    <option value="side-by-side" className="bg-zinc-950">
                      Side-by-Side Inventory Selection
                    </option>
                    <option value="delivery-logistics" className="bg-zinc-950">
                      Cross-State Shipping & Logistics
                    </option>
                    <option value="general-inquiry" className="bg-zinc-950">
                      General Mechanical/Terms Query
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted-foreground text-xs font-bold">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-display text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-border/60 rounded p-4 text-xs font-body text-white focus:outline-none focus:border-zinc-500 transition-colors resize-none leading-relaxed"
                  placeholder="Outline the details of the machine or terms you want to evaluate..."
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-primary-hover hover:bg-primary-hover/90 text-white font-display text-xs font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,69,0,0.15)] transition-all duration-200"
              >
                <span>Submit Form to Dedicated Agent</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* ── RIGHT COLUMN: INFO STACK TRIO (5 COLS) ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Sub-Card 1: Premium Unified Contact Info Directory */}
            <div className="bg-zinc-950 border border-border/60 rounded-xl p-6 relative overflow-hidden">
              <div className="mb-4 pb-3 border-b border-border/40">
                <h3 className="font-display font-black text-xs text-white uppercase tracking-wider">
                  Contact Info
                </h3>
              </div>

              <div className="space-y-4">
                {/* Voice Line Item */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary-hover shrink-0" />
                  <div className="font-body text-xs">
                    <span className="text-zinc-500 uppercase font-display text-[9px] font-bold tracking-wider block">
                      Voice Dispatch:
                    </span>
                    <a
                      href={`tel:${companyInfo.phone || '1 607 456 5677'}`}
                      className="text-zinc-200 hover:text-primary-hover font-display font-black transition-colors"
                    >
                      {companyInfo.phone || '1 607 456 5677'}
                    </a>
                  </div>
                </div>

                {/* Email Inbox Item */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary-hover shrink-0" />
                  <div className="font-body text-xs">
                    <span className="text-zinc-500 uppercase font-display text-[9px] font-bold tracking-wider block">
                      Secure Inbox:
                    </span>
                    <a
                      href={`mailto:${companyInfo.email || 'test@mail.com'}`}
                      className="text-zinc-200 hover:text-primary-hover font-display font-black transition-colors"
                    >
                      {companyInfo.email || 'test@mail.com'}
                    </a>
                  </div>
                </div>

                {/* Logistics Reach Item */}
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-primary-hover shrink-0" />
                  <div className="font-body text-xs">
                    <span className="text-zinc-500 uppercase font-display text-[9px] font-bold tracking-wider block">
                      Fulfillment Logistics:
                    </span>
                    <p className="text-zinc-200 font-display font-black uppercase text-[11px] tracking-wide">
                      Nationwide Shipping{' '}
                      <span className="text-zinc-500 font-medium font-body text-xs lowercase">
                        (all 50 states)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Card 2: Operational Clock Business Hours */}
            <div className="bg-zinc-950 border border-border/60 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <Clock className="w-4 h-4 text-primary-hover mt-1 shrink-0" />
                <div className="w-full">
                  <h3 className="font-display font-black text-xs text-white uppercase tracking-wider mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-2 border-b border-border/40 pb-4 mb-4">
                    <div className="flex justify-between text-xs font-body">
                      <span className="text-zinc-400">Monday – Friday</span>
                      <span className="font-display font-black text-white text-[11px]">
                        08:00 AM – 07:00 PM EST
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-body">
                      <span className="text-zinc-400">Saturday</span>
                      <span className="font-display font-black text-white text-[11px]">
                        09:00 AM – 04:00 PM EST
                      </span>
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 rounded p-3 text-[11px] font-body text-muted-foreground leading-relaxed">
                    <span className="text-amber-500 font-bold font-display uppercase tracking-wider text-[9px] block mb-0.5">
                      Note:
                    </span>
                    Digital lead queues remain active 24/7. Inbound application reviews resume
                    immediately at market open.
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Card 3: Why Choose Us Value Injection */}
            <div className="bg-zinc-950 border border-border/60 rounded-xl p-6 relative overflow-hidden">
              <div className="mb-4 pb-3 border-b border-border/40">
                <h3 className="font-display font-black text-xs text-white uppercase tracking-wider">
                  Why Choose Us
                </h3>
              </div>

              <div className="space-y-4">
                {/* Financing Point */}
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary-hover mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">
                      No Credit Check Financing
                    </h4>
                    <p className="font-body text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                      Bypass traditional bank constraints with simple, asset-backed verification
                      pipelines.
                    </p>
                  </div>
                </div>

                {/* Inspection Point */}
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary-hover mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">
                      Every ATV Inspected
                    </h4>
                    <p className="font-body text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                      Rigorous technical diagnostics and deep detailing completed before loading
                      onto the carrier.
                    </p>
                  </div>
                </div>

                {/* Logistics Point */}
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-primary-hover mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">
                      All 50 States Delivery
                    </h4>
                    <p className="font-body text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                      Fully insured, enclosed cross-border logistics delivering directly to your
                      coordinate location.
                    </p>
                  </div>
                </div>

                {/* Payments Point */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary-hover mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wide">
                      Flexible Payment Plans
                    </h4>
                    <p className="font-body text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                      Coordinate directly with your dedicated field agent to structure terms
                      tailored to your schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
