'use client'
import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { useCartStore } from '@/store/cart-store'; // Import your store
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
  const companyInfo = useCompanyInfo() as CompanyInfo | null

  // Connect to Zustand
  const { items, toggleDrawer } = useCartStore()
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  // Shared Cart Button Logic
  const CartButton = (
    <button
      onClick={toggleDrawer} // Open drawer instead of linking
      className="relative p-2.5 text-muted-foreground hover:text-primary-hover bg-surface border border-border hover:border-primary-hover rounded transition-all duration-300 group"
      aria-label="Open shopping cart"
    >
      <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

      {/* Dynamic Quantity Badge */}
      {totalItems > 0 ? (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-primary-hover text-white text-[9px] font-black rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110">
          {totalItems}
        </span>
      ) : (
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary-hover rounded-full animate-pulse" />
      )}
    </button>
  )

  if (variant === 'mobile-bar') {
    return <div className="flex items-center gap-2">{CartButton}</div>
  }

  return (
    <div className="flex items-center gap-4">
      {CartButton}

      {/* Call Now Action */}
      <a
        href={`tel:${companyInfo?.phone}`}
        className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-hover rounded text-white shadow-md shadow-primary-hover/10 hover:bg-primary hover:text-secondary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
      >
        <PhoneCall className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        <span className="font-display text-[11px] font-bold tracking-widest uppercase">
          Call Now
        </span>
      </a>

      {/* Get Financed Action */}
      <Link
        href="/financing/apply"
        className="inline-flex items-center justify-center px-5 py-2.5 bg-transparent border border-primary-hover text-primary hover:text-white bg-gradient-to-r from-primary-hover/10 to-transparent hover:from-primary-hover hover:to-primary-hover font-display text-[11px] font-bold tracking-widest uppercase rounded shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-primary-hover/10"
      >
        Get Financed
      </Link>
    </div>
  )
}
