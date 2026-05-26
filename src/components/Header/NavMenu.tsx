'use client'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface DirectLink {
  type: 'link'
  label: string
  href: string
}
interface DropdownSubLink {
  label: string
  href: string
  highlight?: boolean
}
interface DropdownMenu {
  type: 'dropdown'
  label: string
  links: DropdownSubLink[]
}
type NavigationItem = DirectLink | DropdownMenu

export default function NavMenu(): React.JSX.Element {
  const pathname = usePathname()

  const menuItems: NavigationItem[] = [
    { type: 'link', label: 'Home', href: '/' },
    {
      type: 'dropdown',
      label: 'Shop ATVs',
      links: [
        { label: 'All Inventory', href: '/inventory' },
        { label: 'New ATVs', href: '/inventory/new' },
        { label: 'Used ATVs', href: '/inventory/used' },
        { label: 'Performance Upgrades', href: '/parts/upgrades' },
      ],
    },
    {
      type: 'dropdown',
      label: 'Financing',
      links: [
        { label: 'Apply Now — No Credit Check', href: '/finance/apply', highlight: true },
        { label: 'How Financing Works', href: '/finance/process' },
        { label: 'Payment Calculator', href: '/finance/calculator' },
      ],
    },
    { type: 'link', label: 'About', href: '/about' },
    { type: 'link', label: 'Blog', href: '/blog' },
    { type: 'link', label: 'Reviews', href: '/reviews' },
    { type: 'link', label: 'Contact', href: '/contact' },
  ]

  return (
    <ul className="flex items-center gap-4 xl:gap-5 h-full">
      {menuItems.map((item, index) => {
        if (item.type === 'link') {
          const isActive = pathname === item.href
          return (
            <li key={index} className="relative h-full flex items-center group">
              <Link
                href={item.href}
                className={`font-display text-[12px] font-bold tracking-widest uppercase transition-colors duration-300 relative py-2 ${
                  isActive ? 'text-primary-hover' : 'text-muted-foreground hover:text-primary-hover'
                }`}
              >
                {item.label}
              </Link>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </li>
          )
        }

        // Dropdown Items
        const isChildActive = item.links.some((sub) => pathname === sub.href)

        return (
          <li key={index} className="relative group h-full flex items-center">
            <button
              className={`flex items-center gap-1 font-display text-[12px] font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer py-2 ${
                isChildActive
                  ? 'text-primary-hover'
                  : 'text-muted-foreground group-hover:text-primary-hover'
              }`}
            >
              <span>{item.label}</span>
              <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-subtle group-hover:text-primary-hover" />
            </button>

            {/* Dynamic Hover Underline for Dropdown Trigger */}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                isChildActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />

            {/* Dropdown Card Flyout Panel */}
            <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-64 pt-2 opacity-0 pointer-events-none transform translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:top-full transition-all duration-300 z-50">
              <div className="bg-surface border border-border rounded shadow-xl shadow-background/50 overflow-hidden backdrop-blur-sm">
                <div className="h-0.5 bg-primary-hover w-0 group-hover:w-full transition-all duration-500 ease-out" />
                <div className="flex flex-col gap-0.5 p-2">
                  {item.links.map((subLink, subIdx) => {
                    const isSubActive = pathname === subLink.href
                    return (
                      <Link
                        key={subIdx}
                        href={subLink.href}
                        className={`px-3 py-2.5 font-display text-[11px] font-bold tracking-wider uppercase rounded-sm transition-all duration-200 block ${
                          subLink.highlight
                            ? 'text-primary bg-primary-hover/5 hover:bg-primary-hover hover:text-white shadow-inner'
                            : isSubActive
                              ? 'text-primary-hover bg-background/60 translate-x-1'
                              : 'text-muted-foreground hover:text-primary-hover hover:bg-background/80 hover:translate-x-1'
                        }`}
                      >
                        {subLink.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
