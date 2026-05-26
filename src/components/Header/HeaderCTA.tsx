'use client'
import { PhoneCall, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface HeaderCTAProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  variant?: 'desktop' | 'mobile-bar'
}

export default function HeaderCTA({
  isLoggedIn,
  setIsLoggedIn,
  variant = 'desktop',
}: HeaderCTAProps): React.JSX.Element {
  if (variant === 'mobile-bar') {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/cart"
          className="relative p-2.5 text-muted-foreground hover:text-primary-hover bg-surface border border-border hover:border-primary-hover rounded transition-all duration-300 group"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full transition-transform duration-300 group-hover:scale-150 animate-pulse" />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {/* Shopping Cart Button */}
      <Link
        href="/cart"
        className="relative p-2.5 text-muted-foreground hover:text-primary-hover bg-surface border border-border hover:border-primary-hover rounded transition-all duration-300 group"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full transition-all duration-300 group-hover:scale-125 group-hover:bg-primary-hover" />
      </Link>

      {/* Call Now Action */}
      <a
        href="tel:8005557433"
        className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-hover rounded text-white shadow-md shadow-primary-hover/10 hover:bg-primary hover:text-secondary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
      >
        <PhoneCall className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        <span className="font-display text-[11px] font-bold tracking-widest uppercase">
          Call Now
        </span>
      </a>

      {/* Get Financed Action */}
      <Link
        href="/finance/apply"
        className="inline-flex items-center justify-center px-5 py-2.5 bg-transparent border border-primary-hover text-primary hover:text-white bg-gradient-to-r from-primary-hover/10 to-transparent hover:from-primary-hover hover:to-primary-hover font-display text-[11px] font-bold tracking-widest uppercase rounded shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-primary-hover/10"
      >
        Get Financed
      </Link>
    </div>
  )
}
