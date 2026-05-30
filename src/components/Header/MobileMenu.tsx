'use client'

import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { ChevronDown, PhoneCall, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

type AccordionKeys = 'shop' | 'finance' | null

interface MobileSubLink {
  label: string
  href: string
  highlight?: boolean
}

const shopLinks: MobileSubLink[] = [
  { label: 'All Inventory', href: '/shop' },
  { label: 'New ATVs', href: '/shop' },
  { label: 'Used ATVs', href: '/shop' },
  { label: 'Performance Upgrades', href: '/shop' },
]

const financeLinks: MobileSubLink[] = [
  { label: 'Apply Now — No Credit Check', href: '/financing/apply', highlight: true },
  { label: 'How Financing Works', href: '/financing' },
  { label: 'Payment Calculator', href: '/financing/apply' },
]

export default function MobileMenu({
  isOpen,
  onClose,
  isLoggedIn,
  setIsLoggedIn,
}: MobileMenuProps): React.JSX.Element | null {
  const [activeAccordion, setActiveAccordion] = useState<AccordionKeys>(null)
  const [mounted, setMounted] = useState(false)

  const companyInfo = useCompanyInfo() as CompanyInfo | null

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (!isOpen) setActiveAccordion(null)
  }, [isOpen])

  const toggleAccordion = (key: AccordionKeys) => {
    setActiveAccordion(activeAccordion === key ? null : key)
  }

  if (!mounted) return null

  const drawer = (
    <div
      className={`fixed inset-0 z-200 flex justify-end lg:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div
        className={`relative w-75 h-full bg-surface border-l border-border flex flex-col p-5 overflow-y-auto shadow-card-hover transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Top: logo + close only ── */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
          <span className="font-display text-lg font-black uppercase tracking-tight text-foreground">
            {companyInfo?.companyName || 'Company'}
            <span className="text-primary-hover">Plug</span>
          </span>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded border border-border bg-background text-muted-foreground hover:text-primary-hover hover:border-primary-hover transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Nav items ── */}
        <nav className="flex flex-col flex-1">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary-hover py-3 border-b border-border/40 transition-colors"
          >
            Home
          </Link>

          {/* Shop Accordion */}
          <div className="border-b border-border/40">
            <button
              onClick={() => toggleAccordion('shop')}
              className="flex w-full items-center justify-between font-display text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary-hover py-3 transition-colors cursor-pointer"
            >
              <span>Shop ATVs</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeAccordion === 'shop' ? 'rotate-180 text-primary-hover' : 'text-subtle'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeAccordion === 'shop' ? 'max-h-48 pb-2' : 'max-h-0'
              }`}
            >
              <div className="flex flex-col border-l-2 border-primary-hover/40 ml-1 pl-3">
                {shopLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="font-display text-[11px] font-semibold tracking-widest uppercase text-muted-foreground hover:text-primary-hover py-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Finance Accordion */}
          <div className="border-b border-border/40">
            <button
              onClick={() => toggleAccordion('finance')}
              className="flex w-full items-center justify-between font-display text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary-hover py-3 transition-colors cursor-pointer"
            >
              <span>Financing</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeAccordion === 'finance' ? 'rotate-180 text-primary-hover' : 'text-subtle'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeAccordion === 'finance' ? 'max-h-48 pb-2' : 'max-h-0'
              }`}
            >
              <div className="flex flex-col border-l-2 border-primary-hover/40 ml-1 pl-3">
                {financeLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className={`font-display text-[11px] font-semibold tracking-widest uppercase py-2 transition-colors ${
                      link.highlight
                        ? 'text-primary-hover/50 bg-accent/10 px-2 rounded-sm hover:text-primary-hover hover:bg-accent/20'
                        : 'text-muted-foreground hover:text-primary-hover'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {['About', 'Blog', 'Reviews', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={onClose}
              className="font-display text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary-hover py-3 border-b border-border/40 transition-colors"
            >
              {item}
            </Link>
          ))}

          {/* ── Actions — below nav items ── */}
          <div className="flex flex-col gap-3 mt-6">
            {/* Apply Now — primary CTA */}
            <Link
              href="/financing/apply"
              onClick={onClose}
              className="flex items-center justify-center w-full bg-primary-hover hover:bg-primary text-white py-2.5 rounded font-display text-xs font-bold tracking-widest uppercase transition-colors active:scale-95"
            >
              Apply Online Now
            </Link>

            {/* Call button */}
            <button
              onClick={() => {
                window.location.href = `tel:${companyInfo?.phone || '(800) 555-RIDE'}`
              }}
              className="flex items-center justify-center gap-2 w-full bg-background border border-border hover:border-primary-hover rounded py-2.5 transition-colors group cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-primary-hover" />
              <span className="font-display text-[11px] font-bold tracking-widest uppercase text-foreground group-hover:text-primary-hover transition-colors">
                Call Now
              </span>
              <span className="font-mono text-[11px] text-muted-foreground group-hover:text-primary-hover transition-colors">
                {companyInfo?.phone || '(800) 555-RIDE'}
              </span>
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/account"
                  onClick={onClose}
                  className="text-center font-display text-[11px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary-hover py-1 transition-colors"
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    onClose()
                  }}
                  className="w-full py-2 border border-status-sold/40 text-status-sold hover:bg-status-sold/10 font-display text-[11px] font-bold tracking-widest uppercase rounded transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsLoggedIn(true)
                  onClose()
                }}
                className="w-full py-2.5 bg-background border border-border hover:border-primary-hover text-muted-foreground hover:text-primary-hover font-display text-[11px] font-bold tracking-widest uppercase rounded transition-colors cursor-pointer"
              >
                Login / Register
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  )

  return createPortal(drawer, document.body)
}
