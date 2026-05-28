'use client'

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

export default function FooterView({ brands }: Props) {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter / X', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ]

  const companyInfo = useCompanyInfo() as CompanyInfo | null
  return (
    <footer className="w-full bg-surface border-t border-border mt-auto">
      {/* ── TRUST BAR ── */}
      <div className="border-b border-border bg-surface/50">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Caravan,
                title: 'Nationwide Delivery',
                sub: 'We ship safely across the country.',
              },
              {
                icon: CreditCard,
                title: 'Flexible Payment',
                sub: 'Easy financing options available.',
              },
              {
                icon: ShieldAlert,
                title: 'Quality Inspected',
                sub: 'All units fully checked before sale.',
              },
              {
                icon: MessageSquare,
                title: 'Expert Support',
                sub: 'Talk to real specialists anytime.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-3">
                  <Icon className="w-4 h-4" />
                  <div>
                    <p className="text-xs font-bold uppercase">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* BRAND */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/">
              <span className="text-2xl font-black uppercase">
                {companyInfo?.companyName || 'PowerSports'}{' '}
                <span className="text-primary-hover">Plug</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground">
              {companyInfo?.description || 'Premium off-road vehicles delivered nationwide.'}
            </p>

            {/* CONTACT */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4" />
                {companyInfo?.phone || '+1 (000) 000-0000'}
              </div>

              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4" />
                {companyInfo?.email || 'contact@example.com'}
              </div>

              <div className="flex gap-2 items-center">
                <MapPin className="w-4 h-4" />
                Serving USA
              </div>
            </div>

            {/* SOCIALS */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, label }) => (
                <div key={label} className="p-2 border rounded">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* MENU */}
          <FooterMenu />
        </div>

        {/* BRANDS */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-xs uppercase font-bold mb-4">Brands We Carry</p>

          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <span key={brand.id} className="text-xs border px-3 py-1">
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t py-4 text-center text-xs">
        © {new Date().getFullYear()} {companyInfo?.companyName}
      </div>
    </footer>
  )
}
