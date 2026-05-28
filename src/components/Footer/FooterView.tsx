'use client'

import { motion, easeOut } from 'framer-motion'
import Link from 'next/link'

import FooterMenu from './menu'

import { Brand, CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'

import {
  Caravan,
  CreditCard,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldAlert,
  Twitter,
  Youtube,
} from 'lucide-react'

type Props = {
  brands: Brand[]
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: easeOut,
    },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export default function FooterView({ brands }: Props) {
  const companyInfo = useCompanyInfo() as CompanyInfo | null

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter / X', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ]

  const trustItems = [
    {
      icon: Caravan,
      title: 'Nationwide Delivery',
      sub: 'We ship to all 50 states, fully insured, with real-time tracking included.',
    },
    {
      icon: CreditCard,
      title: 'No Credit Check',
      sub: 'Flexible options for everyone with 100% approval rates and zero credit hassle.',
    },
    {
      icon: ShieldAlert,
      title: 'Quality Inspected',
      sub: 'Every single ATV undergoes a comprehensive multi-point mechanical inspection.',
    },
    {
      icon: MessageSquare,
      title: 'Expert Support',
      sub: 'Connect directly with a dedicated off-road specialist ready to help you out.',
    },
  ]

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="w-full bg-surface border-t border-border mt-auto overflow-hidden"
    >
      {/* ───────────────── TRUST BAR ───────────────── */}
      <div className="border-b border-border bg-surface/50">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item, index) => {
              const IconComponent = item.icon

              return (
                <motion.div
                  key={item.title}
                  custom={index}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded border border-border bg-background shrink-0 mt-0.5 transition-all duration-300 group-hover:border-primary-hover group-hover:bg-primary-hover/5 group-hover:scale-110">
                    <IconComponent className="w-4 h-4 text-primary-hover transition-transform duration-300 group-hover:rotate-6" />
                  </span>

                  <div>
                    <p className="font-display text-[11px] font-bold tracking-widest uppercase text-foreground mb-1 transition-colors duration-200 group-hover:text-primary-hover">
                      {item.title}
                    </p>

                    <p className="font-body text-xs text-muted-foreground leading-normal transition-colors duration-200 group-hover:text-foreground/80">
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ───────────────── MAIN FOOTER ───────────────── */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* BRAND COLUMN */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-block group">
              <span className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
                {companyInfo?.companyName || 'PowerSports'}{' '}
                <span className="text-primary-hover inline-block transition-transform duration-300 group-hover:translate-x-1">
                  Plug
                </span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {companyInfo?.description ||
                'Your trusted source for quality used ATVs, UTVs, and dirt bikes, delivered nationwide with expert support.'}
            </p>

            {/* CONTACT */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${companyInfo?.phone || '+1 (972) 688-9613'}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary-hover transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background group-hover:border-primary-hover group-hover:bg-primary-hover/5 transition-all duration-200 shrink-0 group-hover:scale-105">
                  <Phone className="w-3.5 h-3.5 text-primary-hover transition-transform duration-300 group-hover:rotate-12" />
                </span>

                <span className="font-mono font-bold text-foreground group-hover:text-primary-hover transition-colors">
                  {companyInfo?.phone || '+1 (972) 688-9613'}
                </span>
              </a>

              <a
                href={`mailto:${companyInfo?.email || 'info@offroadpowersportshub.com'}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary-hover transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background group-hover:border-primary-hover group-hover:bg-primary-hover/5 transition-all duration-200 shrink-0 group-hover:scale-105">
                  <Mail className="w-3.5 h-3.5 text-primary-hover transition-transform duration-300 group-hover:-translate-y-0.5" />
                </span>

                <span className="text-xs truncate transition-transform duration-200 group-hover:translate-x-0.5">
                  {companyInfo?.email || 'info@offroadpowersportshub.com'}
                </span>
              </a>

              <div className="flex items-center gap-2.5 text-sm text-muted-foreground group">
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background shrink-0 transition-colors duration-200 group-hover:border-primary-hover">
                  <MapPin className="w-3.5 h-3.5 text-primary-hover transition-transform duration-300 group-hover:scale-110" />
                </span>

                <span className="text-xs transition-colors duration-200 group-hover:text-foreground">
                  Serving all 50 states — USA
                </span>
              </div>
            </div>

            {/* SOCIALS */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.div
                  key={label}
                  whileHover={{
                    y: -4,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  <Link
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background text-muted-foreground hover:text-white hover:bg-primary-hover hover:border-primary-hover transition-all duration-300 hover:shadow-lg hover:shadow-primary-hover/20"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* MENU */}
          <FooterMenu />
        </div>

        {/* ───────────────── BRANDS ───────────────── */}
        <div className="mt-12 pt-8 border-t border-border">
          <motion.p
            variants={fadeUp}
            className="font-display text-[10px] font-bold tracking-widest uppercase text-subtle mb-4"
          >
            Brands We Carry
          </motion.p>

          <motion.div variants={staggerContainer} className="flex flex-wrap gap-2">
            {brands.map((brand, index) => (
              <motion.span
                key={brand.id}
                custom={index}
                variants={fadeUp}
                whileHover={{
                  scale: 1.06,
                  y: -2,
                }}
                className="px-3 py-1 bg-background border border-border rounded-sm font-display text-[10px] font-bold tracking-widest uppercase text-muted-foreground transition-all duration-200 hover:border-primary-hover hover:text-foreground cursor-default select-none"
              >
                {brand.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ───────────────── BOTTOM BAR ───────────────── */}
      <div className="border-t border-border bg-background/30">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-5">
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <p className="font-body text-xs text-subtle">
                © {new Date().getFullYear()} {companyInfo?.companyName || 'Offroad Powersports Hub'}
                . All rights reserved.
              </p>

              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />

              <Link
                href="/privacy"
                className="font-display text-[10px] font-bold tracking-widest uppercase text-subtle hover:text-primary-hover transition-colors duration-200 relative group"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-hover transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
