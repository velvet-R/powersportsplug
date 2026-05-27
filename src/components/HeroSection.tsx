'use client'

import { motion } from 'framer-motion'
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    FileText,
    Phone,
    Search,
    ShieldCheck,
    Star,
    Truck,
    Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import heroImg from '../../public/images/herobanner.jpg'
import MarqueeBanner from './MarqueeBanner'

const STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]
const CATEGORIES = ['ATV', 'UTV / Side-by-Side', 'Dirt Bike', 'Go-Kart']
const BRANDS = ['Polaris', 'Can-Am', 'Honda', 'Yamaha', 'Kawasaki', 'Suzuki']
const BUDGETS = ['Under $5k', '$5k - $10k', '$10k - $15k', '$15k+']

const TRUST_BADGES = [
  { label: 'No Credit Check', icon: ShieldCheck },
  { label: 'Free Delivery All 50 States', icon: Truck },
  { label: 'Quality Guaranteed', icon: CheckCircle2 },
  { label: 'Same-Day Approval', icon: Zap },
  { label: '4.9 Star Reviews', icon: Star },
]

const STATS = [
  { value: '500+', label: 'ATVs In Stock' },
  { value: '50', label: 'States Served' },
  { value: '100%', label: 'Financing Approval' },
  { value: '4.9★', label: 'Customer Rating' },
]

// Framer Motion Variants for Staggered Children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 15 },
  },
}

export default function HeroSection(): React.JSX.Element {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    state: '',
    category: '',
    brand: '',
    budget: '',
    financing: '',
    notes: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
      <section className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center overflow-hidden bg-background">
        {/* ── Cinematic Motion Background ── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.1, x: 0, y: 0 }}
            animate={{
              scale: [1.1, 1.22, 1.1],
              x: [0, -15, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Image
              src={heroImg}
              alt="Offroad ATV Background"
              fill
              priority
              className="object-cover object-center opacity-40"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/20 z-10" />
          <div className="absolute inset-0 bg-grid-dark opacity-20 z-10 pointer-events-none" />
        </div>

        <div className="relative z-20 mx-auto max-w-screen-2xl w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* ── LEFT COLUMN: Core Content & CTA Suite ── */}
            <motion.div
              className="lg:col-span-7 flex flex-col justify-center text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Top Eyebrow Badging */}
              <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-display text-[10px] text-primary-hover sm:text-xs font-bold tracking-widest uppercase">
                    #1 Rated Powersports Dealer · Nationwide · Est. 2018
                  </span>
                </span>
              </motion.div>

              {/* Typography Heading Block */}
              <motion.h1
                className="font-display font-black text-6xl sm:text-7xl lg:text-6xl xl:text-8xl text-white leading-[0.9] tracking-normal uppercase mb-6"
                variants={itemVariants}
              >
                AMERICA'S <br />
                <span className="text-primary-hover drop-shadow-[0_0_20px_rgba(255,69,0,0.25)]">
                  PREMIER
                </span>{' '}
                <br />
                ATV DEALER
              </motion.h1>

              {/* Supporting Text Paragraph */}
              <motion.p
                className="max-w-xl font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-6"
                variants={itemVariants}
              >
                Shop · Finance · Ride · Delivered to Your Door
                <br />
                We carry{' '}
                <span className="text-white font-bold underline decoration-primary decoration-2">
                  500+ premium
                </span>{' '}
                new and used machines with 100% guaranteed financing approval terms. Whether you're
                on the farm or hitting trails, we get you riding faster with fully-insured
                nationwide delivery directly to your driveway.
              </motion.p>

              {/* Added CTA Buttons Suite */}
              <motion.div
                className="flex flex-wrap items-center gap-3 mb-8"
                variants={itemVariants}
              >
                <Link
                  href="/inventory"
                  className="inline-flex items-center gap-2 px-6 h-12 bg-primary-hover hover:bg-primary-hover/60 text-white font-display text-xs font-black tracking-widest uppercase rounded shadow-glow-orange transition-all duration-200 active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  Browse Full Inventory
                </Link>

                <Link
                  href="/finance"
                  className="inline-flex items-center gap-2 px-6 h-12 bg-surface hover:bg-zinc-800 text-white font-display text-xs font-black tracking-widest uppercase rounded border border-border transition-all duration-200 active:scale-95"
                >
                  <FileText className="w-4 h-4 text-primary-hover" />
                  Apply For Financing
                </Link>

                <a
                  href="tel:+19726889613"
                  className="inline-flex items-center gap-2 px-6 h-12 bg-zinc-900/50 hover:bg-zinc-900 text-muted-foreground hover:text-white font-display text-xs font-bold tracking-widest uppercase rounded border border-border transition-all duration-200"
                >
                  <Phone className="w-4 h-4 text-zinc-400" />
                  Call Now
                </a>
              </motion.div>

              {/* Brand/Trust Pills (Positioned cleanly right before stats) */}
              {/* Brand/Trust Pills (Enhanced with Layout Animations & Custom Config Glows) */}
              <motion.div className="flex flex-wrap gap-2.5 mb-8" variants={itemVariants}>
                {TRUST_BADGES.map((badge, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 bg-surface/60 backdrop-blur-md border border-border rounded-full text-foreground cursor-default select-none shadow-sm"
                    // Framer Motion Hover & Tap State Styling
                    whileHover={{
                      scale: 1.04,
                      borderColor: '#3F3F46', // Maps to your config token: border-hover
                      color: '#FFFFFF',
                      boxShadow: '0 0 20px rgba(255, 69, 0, 0.25)', // Matches your custom glow-orange spec
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {/* Icon Wrapper applying your config's pulse keyframe on a slight delay loop */}
                    <div className="flex items-center justify-center text-primary-hover animate-pulse">
                      <badge.icon className="w-4 h-4 filter drop-shadow-[0_0_4px_rgba(255,69,0,0.4)]" />
                    </div>

                    <span className="font-display text-[10px] font-bold tracking-widest uppercase transition-colors duration-200">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Performance Layout Metric Matrix */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-8 mt-2"
                variants={itemVariants}
              >
                {STATS.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display text-3xl sm:text-4xl font-black text-primary-hover leading-none mb-1">
                      {stat.value}
                    </span>
                    <span className="font-display text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN: High-Conversion Form Engine ── */}
            <div className="lg:col-span-5 w-full">
              <motion.div
                className="relative bg-surface/90 backdrop-blur-xl border border-border rounded-xl p-5 sm:p-8 shadow-card overflow-hidden"
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.3 }}
                whileHover={{ boxShadow: '0 12px 50px rgba(0,0,0,0.7)' }}
              >
                {/* Decorative Accent Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] pointer-events-none" />

                <div className="relative z-10 mb-6">
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                    Get A <span className="text-primary-hover">Free Quote</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-relaxed">
                    Fill in your details and one of our specialists will contact you within update{' '}
                    <strong className="text-white">1 hour</strong> with pricing, financing options,
                    and vehicle availability.
                  </p>
                </div>

                {/* Form Input Blocks */}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 relative z-10">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
                  />

                  {/* Dropdowns fixed strictly to clear dark backgrounds */}
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-muted-foreground focus:outline-none focus:border-primary-hover focus:text-white cursor-pointer transition-colors"
                  >
                    <option value="" disabled className="bg-background text-subtle">
                      Select Your State
                    </option>
                    {STATES.map((state) => (
                      <option key={state} value={state} className="bg-background text-white">
                        {state}
                      </option>
                    ))}
                  </select>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-muted-foreground focus:outline-none focus:border-primary-hover focus:text-white cursor-pointer transition-colors"
                  >
                    <option value="" disabled className="bg-background text-subtle">
                      I'm Looking For...
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-background text-white">
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-muted-foreground focus:outline-none focus:border-primary-hover focus:text-white cursor-pointer transition-colors"
                  >
                    <option value="" disabled className="bg-background text-subtle">
                      Preferred Brand
                    </option>
                    {BRANDS.map((brand) => (
                      <option key={brand} value={brand} className="bg-background text-white">
                        {brand}
                      </option>
                    ))}
                  </select>

                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="col-span-1 h-11 bg-background border border-border rounded px-4 text-xs text-muted-foreground focus:outline-none focus:border-primary-hover focus:text-white cursor-pointer transition-colors"
                  >
                    <option value="" disabled className="bg-background text-subtle">
                      Budget Range
                    </option>
                    {BUDGETS.map((budget) => (
                      <option key={budget} value={budget} className="bg-background text-white">
                        {budget}
                      </option>
                    ))}
                  </select>

                  <select
                    name="financing"
                    value={formData.financing}
                    onChange={handleChange}
                    required
                    className="col-span-2 h-11 bg-background border border-border rounded px-4 text-xs text-muted-foreground focus:outline-none focus:border-primary-hover focus:text-white cursor-pointer transition-colors"
                  >
                    <option value="" disabled className="bg-background text-subtle">
                      Financing Needed?
                    </option>
                    <option value="yes" className="bg-background text-white">
                      Yes, I need No Credit Check Financing
                    </option>
                    <option value="external" className="bg-background text-white">
                      I have my own pre-approved financing
                    </option>
                    <option value="no" className="bg-background text-white">
                      No, paying cash balance up front
                    </option>
                  </select>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us anything else - specific model, color, year preference or any question..."
                    className="col-span-2 h-20 bg-background border border-border rounded p-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors resize-none pt-3"
                  />

                  <motion.button
                    type="submit"
                    className="col-span-2 h-12 mt-2 bg-primary-hover hover:bg-primary-hover text-white font-display text-[11px] font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 group border-none outline-none cursor-pointer"
                    whileHover={{ scale: 1.01, boxShadow: '0 0 25px rgba(255, 69, 0, 0.45)' }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span>Send My Free Quote Request</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  {/* Secure Form Disclaimers */}
                  <div className="col-span-2 text-center mt-4 space-y-1.5 border-t border-border pt-4">
                    <div className="flex items-center justify-center gap-4 text-[9px] font-bold tracking-widest uppercase text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-status-available" /> 100% Free
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-status-available" /> 1-Hour Response
                      </span>
                    </div>
                    <p className="text-[10px] text-white/60 italic">
                      Your info is secure, encrypted, and never shared with third parties.
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Subtle edge blend mask into your layout flow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
      </section>
      <MarqueeBanner />
      {/* ── BRANDS WE CARRY SECTION ── */}
      <section className="w-full bg-surface py-12 border-t border-b border-border/50 overflow-hidden">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 text-center">
          {/* Section Sub-header */}
          <h2 className="font-display font-black text-xs tracking-[0.2em] text-white/60 uppercase mb-8">
            BRANDS WE CARRY
          </h2>

          {/* Staggered Grid Wrapper */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {[
              'Polaris',
              'Can-Am',
              'Honda',
              'Yamaha',
              'Kawasaki',
              'Suzuki',
              'KTM',
              'Arctic Cat',
              'CF Moto',
            ].map((brand) => (
              <motion.span
                key={brand}
                className="font-bold text-white hover:text-primary-hover uppercase tracking-wider transition-colors duration-200 select-none"
                // Entrance animation variant rules
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 100, damping: 15 },
                  },
                }}
                // Micro-interactions on interaction
                whileHover={{
                  scale: 1.1,
                  color: 'var(--color-primary-hover, #FF4500)', // Smooth transition to your orange primary accent
                  textShadow: '0 0 12px rgba(255, 69, 0, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
