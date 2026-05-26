'use client'

import Link from 'next/link'
import React from 'react'

const shopLinks = [
  { label: 'All Inventory', href: '/inventory' },
  { label: 'New ATVs', href: '/inventory/new' },
  { label: 'Used ATVs', href: '/inventory/used' },
  { label: 'Performance Upgrades', href: '/parts/upgrades' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Customer Reviews', href: '/reviews' },
  { label: 'Contact Us', href: '/contact' },
]

const financeLinks = [
  { label: 'Apply Now', href: '/finance/apply' },
  { label: 'How It Works', href: '/finance/process' },
  { label: 'Payment Calculator', href: '/finance/calculator' },
  { label: 'FAQ', href: '/finance/faq' },
]

export default function FooterMenu(): React.JSX.Element {
  return (
    <>
      {/* Shop ATVs */}
      <div className="flex flex-col gap-4 group/col">
        <div>
          <span className="block w-4 h-0.5 bg-primary-hover mb-3 transition-all duration-300 group-hover/col:w-10" />
          <h3 className="font-display text-xs font-bold tracking-widest uppercase text-foreground">
            Shop ATVs
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {shopLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-[11px] font-semibold tracking-widest uppercase text-muted-foreground hover:text-primary-hover transition-all duration-200 inline-block hover:translate-x-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Financing */}
      <div className="flex flex-col gap-4 group/col">
        <div>
          <span className="block w-4 h-0.5 bg-primary-hover mb-3 transition-all duration-300 group-hover/col:w-10" />
          <h3 className="font-display text-xs font-bold tracking-widest uppercase text-foreground">
            Financing
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {financeLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-[11px] font-semibold tracking-widest uppercase text-muted-foreground hover:text-primary-hover transition-all duration-200 inline-block hover:translate-x-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* CTA inside finance col */}
        <Link
          href="/finance/apply"
          className="mt-2 inline-flex items-center justify-center px-4 py-2.5 bg-primary-hover hover:bg-primary-hover/70 text-white font-display text-[11px] font-bold tracking-widest uppercase rounded transition-all duration-300 hover:scale-[1.03] active:scale-95 text-center shadow-md hover:shadow-primary-hover/20"
        >
          Apply Now — Free
        </Link>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-4 group/col">
        <div>
          <span className="block w-4 h-0.5 bg-primary-hover mb-3 transition-all duration-300 group-hover/col:w-10" />
          <h3 className="font-display text-xs font-bold tracking-widest uppercase text-foreground">
            Company
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {companyLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-[11px] font-semibold tracking-widest uppercase text-muted-foreground hover:text-primary-hover transition-all duration-200 inline-block hover:translate-x-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
