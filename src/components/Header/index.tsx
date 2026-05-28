'use client'

import { useCompanyInfo } from '@/providers/CompanyProvider'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import HeaderCTA from './HeaderCTA'
import MobileMenu from './MobileMenu'
import NavMenu from './NavMenu'

export default function Header(): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  // Track page scroll depth to give the bar physical presence when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const { companyName } = useCompanyInfo() || { companyName: 'PowerSports' }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg border-border/80 shadow-md shadow-background/5 h-16 lg:h-18'
          : 'bg-background/95 backdrop-blur-md border-border h-17 lg:h-20'
      }`}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 h-full">
        <div className="flex h-full items-center justify-between gap-4">
          {/* Logo with flipped colors and clean scale-on-hover mechanics */}
          <Link
            href="/"
            className="shrink-0 font-display text-2xl sm:text-3xl font-black uppercase tracking-tight select-none transition-transform duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span className="text-primary-hover uppercase">{companyName}</span>
            <span className="text-foreground not-italic inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              PLUG
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 h-full">
            <NavMenu />
          </nav>

          {/* Desktop CTA cluster */}
          <div className="hidden lg:flex items-center justify-end gap-6 shrink-0">
            <HeaderCTA isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} variant="desktop" />
          </div>

          {/* Mobile right cluster */}
          <div className="flex lg:hidden items-center gap-3">
            <HeaderCTA isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} variant="mobile-bar" />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded border border-border bg-surface text-foreground transition-all duration-300 hover:border-primary-hover hover:text-primary-hover hover:scale-105 active:scale-95 group"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </header>
  )
}
