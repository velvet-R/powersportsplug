'use client'

import { POSTS } from '@/lib/payload/blog'
import { Brand, CompanyInfo } from '@/payload-types'
import Link from 'next/link'
import React, { useState } from 'react'

interface BlogSidebarProps {
  companyInfo: CompanyInfo | null
  brands: Brand[]
}

export default function BlogSidebar({ companyInfo, brands }: BlogSidebarProps): React.JSX.Element {
  const [search, setSearch] = useState('')

  const popular = POSTS.slice(0, 4)

  return (
    <aside className="flex flex-col gap-6">
      {/* Search */}
      <div
        className="p-5 rounded-sm"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      >
        <h3
          className="font-display text-[11px] font-black tracking-widest uppercase mb-3"
          style={{ color: 'var(--color-foreground)' }}
        >
          Search Articles
        </h3>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Polaris, financing..."
            className="w-full px-4 py-2.5 pr-10 font-body text-sm rounded-sm transition-colors duration-150"
            style={{
              background: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
              outline: 'none',
            }}
            onFocus={(e) => {
              ;(e.target as HTMLInputElement).style.borderColor = 'var(--color-primary-hover)'
            }}
            onBlur={(e) => {
              ;(e.target as HTMLInputElement).style.borderColor = 'var(--color-border)'
            }}
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--color-subtle)' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
      </div>

      {/* Popular posts */}
      <div
        className="p-5 rounded-sm"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="block w-6 h-0.5" style={{ background: 'var(--color-primary-hover)' }} />
          <h3
            className="font-display text-[11px] font-black tracking-widest uppercase"
            style={{ color: 'var(--color-foreground)' }}
          >
            Popular Articles
          </h3>
        </div>
        <div className="flex flex-col">
          {popular.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 py-3 transition-colors duration-150"
              style={{
                borderBottom: i < popular.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <span
                className="font-display text-xs font-black shrink-0 w-5 leading-tight"
                style={{ color: 'var(--color-primary-hover)' }}
              >
                0{i + 1}
              </span>
              <div className="flex flex-col gap-1">
                <span
                  className="font-display text-[11px] font-bold tracking-wide uppercase leading-tight group-hover:text-primary-hover transition-colors duration-150"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {post.title.length > 60 ? post.title.slice(0, 60) + '…' : post.title}
                </span>
                <span
                  className="font-display text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: 'var(--color-subtle)' }}
                >
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Finance CTA */}
      <div
        className="relative p-6 rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0e00 0%, var(--color-surface) 100%)',
          border: '1px solid rgba(255,87,34,0.2)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(255,87,34,0.15), transparent 70%)',
          }}
        />
        <div className="relative z-10 flex flex-col gap-3">
          <span className="block w-8 h-0.5" style={{ background: 'var(--color-primary-hover)' }} />
          <h3
            className="font-display font-black uppercase leading-tight"
            style={{ fontSize: '1.3rem', color: 'var(--color-foreground)' }}
          >
            READY TO RIDE?
          </h3>
          <p
            className="font-body text-xs leading-relaxed"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            No credit check required. Get approved in minutes and have your ATV delivered to your
            door.
          </p>
          <Link
            href="/financing/apply"
            className="inline-flex items-center justify-center px-5 py-2.5 font-display text-[11px] font-black tracking-widest uppercase rounded-sm text-white transition-all duration-200 active:scale-95 mt-1"
            style={{ background: 'var(--color-primary-hover)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#FF5722'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'var(--color-primary-hover)'
            }}
          >
            Apply Now — Free
          </Link>
          <a
            href={`tel:${companyInfo?.phone || '+1 (972) 688-9613'}`}
            className="font-display text-[10px] font-bold tracking-widest uppercase text-center transition-colors duration-150"
            style={{ color: 'var(--color-muted-foreground)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = 'var(--color-primary-hover)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.color = 'var(--color-muted-foreground)'
            }}
          >
            Or call {companyInfo?.phone || '+1 (972) 688-9613'}
          </a>
        </div>
      </div>

      {/* Tags cloud */}
      <div
        className="p-5 rounded-sm"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="block w-6 h-0.5" style={{ background: 'var(--color-primary-hover)' }} />
          <h3
            className="font-display text-[11px] font-black tracking-widest uppercase"
            style={{ color: 'var(--color-foreground)' }}
          >
            Popular Tags
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {brands
            .flatMap((brand) => brand.name)
            .filter((v, i, arr) => arr.indexOf(v) === i)
            .map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag.toLowerCase()}`}
                className="px-2.5 py-1 font-display text-[10px] font-bold tracking-widest uppercase rounded-sm transition-all duration-150"
                style={{
                  background: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted-foreground)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--color-primary-hover)'
                  el.style.color = 'var(--color-primary-hover)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--color-border)'
                  el.style.color = 'var(--color-muted-foreground)'
                }}
              >
                {tag}
              </Link>
            ))}
        </div>
      </div>
    </aside>
  )
}
