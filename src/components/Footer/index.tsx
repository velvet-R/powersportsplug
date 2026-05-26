'use client'

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
import Link from 'next/link'
import React from 'react'
import FooterMenu from './menu'

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

const brands = [
  'Polaris',
  'Can-Am',
  'Honda',
  'Yamaha',
  'Kawasaki',
  'Suzuki',
  'CFMoto',
  'Arctic Cat',
]

export default function Footer(): React.JSX.Element {
  return (
    <footer className="w-full bg-surface border-t border-border mt-auto animate-fade-in duration-500">
      {/* ── Top trust bar ── */}
      <div className="border-b border-border bg-surface/50">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
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
            ].map((item, idx) => {
              const IconComponent = item.icon
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 group transition-transform duration-300 hover:-translate-y-1"
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
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column — spans 2 on large */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-block group">
              <span className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
                POWERSPORTS
                <span className="text-primary-hover inline-block transition-transform duration-300 group-hover:translate-x-1">
                  HUB
                </span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your premier destination for quality ATVs and off-road vehicles. Serving customers
              across all 50 states with no credit check financing and nationwide delivery.
            </p>

            {/* Contact block */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+19726889613"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary-hover transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background group-hover:border-primary-hover group-hover:bg-primary-hover/5 transition-all duration-200 shrink-0 group-hover:scale-105">
                  <Phone className="w-3.5 h-3.5 text-primary-hover transition-transform duration-300 group-hover:rotate-12" />
                </span>
                <span className="font-mono font-bold text-foreground group-hover:text-primary-hover transition-colors">
                  +1 (972) 688-9613
                </span>
              </a>

              <a
                href="mailto:info@offroadpowersportshub.com"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary-hover transition-colors group"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background group-hover:border-primary-hover group-hover:bg-primary-hover/5 transition-all duration-200 shrink-0 group-hover:scale-105">
                  <Mail className="w-3.5 h-3.5 text-primary-hover transition-transform duration-300 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-xs truncate transition-transform duration-200 group-hover:translate-x-0.5">
                  info@offroadpowersportshub.com
                </span>
              </a>

              <div className="flex items-center gap-2.5 text-sm text-muted-foreground group">
                <span className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background shrink-0 transition-colors duration-200 group-hover:border-primary-hover">
                  <MapPin className="w-3.5 h-3.5 text-primary-hover transition-transform duration-300 group-hover:bounce" />
                </span>
                <span className="text-xs transition-colors duration-200 group-hover:text-foreground">
                  Serving all 50 states — USA
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background text-muted-foreground hover:text-white hover:bg-primary-hover hover:border-primary-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-hover/20"
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Render Menus Split Chunk Here */}
          <FooterMenu />
        </div>

        {/* ── Brands strip ── */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="font-display text-[10px] font-bold tracking-widest uppercase text-subtle mb-4">
            Brands We Carry
          </p>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <span
                key={brand}
                className="px-3 py-1 bg-background border border-border rounded-sm font-display text-[10px] font-bold tracking-widest uppercase text-muted-foreground transition-all duration-200 hover:border-primary-hover hover:text-foreground cursor-default hover:scale-105 select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border bg-background/30">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-subtle text-center sm:text-left">
              © {new Date().getFullYear()} PowersportsHub. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-[10px] font-bold tracking-widest uppercase text-subtle hover:text-primary-hover transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary-hover transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
