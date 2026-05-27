'use client'

import { BlogPost } from '@/types'
import Link from 'next/link'
import React from 'react'

interface Props {
  posts: BlogPost[]
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 font-display text-[10px] font-bold tracking-widest uppercase rounded-sm"
      style={{
        background: 'rgba(255,87,34,0.12)',
        border: '1px solid rgba(255,87,34,0.25)',
        color: 'var(--color-primary-hover)',
      }}
    >
      {label}
    </span>
  )
}

export default function FeaturedPosts({ posts }: Props): React.JSX.Element {
  const [primary, secondary] = posts

  if (!primary) return <></>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-sm overflow-hidden">
      {/* Primary featured — large */}
      <Link
        href={`/blog/${primary.slug}`}
        className="group relative flex flex-col justify-end min-h-[420px] p-8 overflow-hidden"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Placeholder image bg */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #1a0e00 0%, #0f0f12 50%, #0d1a0f 100%)',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,15,18,0.97) 40%, rgba(15,15,18,0.4) 100%)',
          }}
        />
        {/* Orange glow accent */}
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(255,87,34,0.15), transparent 70%)',
          }}
        />

        {/* Featured label */}
        <div className="absolute top-6 left-6">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 font-display text-[10px] font-bold tracking-widest uppercase rounded-sm"
            style={{
              background: 'var(--color-primary-hover)',
              color: '#fff',
            }}
          >
            ★ Featured
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          <CategoryBadge label={primary.category} />
          <h2
            className="font-display font-black uppercase leading-tight group-hover:text-primary-hover transition-colors duration-200"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: 'var(--color-foreground)' }}
          >
            {primary.title}
          </h2>
          <p
            className="font-body text-sm leading-relaxed line-clamp-3"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            {primary.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <span
              className="font-display text-[10px] font-bold tracking-widest uppercase"
              style={{ color: 'var(--color-subtle)' }}
            >
              {primary.author}
            </span>
            <span style={{ color: 'var(--color-border-hover)' }}>·</span>
            <span
              className="font-display text-[10px] font-bold tracking-widest uppercase"
              style={{ color: 'var(--color-subtle)' }}
            >
              {primary.date}
            </span>
            <span style={{ color: 'var(--color-border-hover)' }}>·</span>
            <span
              className="font-display text-[10px] font-bold tracking-widest uppercase"
              style={{ color: 'var(--color-primary-hover)' }}
            >
              {primary.readTime}
            </span>
          </div>
          {/* Read more */}
          <div className="flex items-center gap-2 pt-2">
            <span
              className="font-display text-[11px] font-bold tracking-widest uppercase transition-colors duration-150 group-hover:text-primary-hover"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              Read Article
            </span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: 'var(--color-primary-hover)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </Link>

      {/* Secondary featured */}
      {secondary && (
        <Link
          href={`/blog/${secondary.slug}`}
          className="group relative flex flex-col justify-end min-h-[420px] p-8 overflow-hidden"
          style={{ background: 'var(--color-surface)' }}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #0d1520 0%, #0f0f12 50%, #1a1000 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(15,15,18,0.97) 40%, rgba(15,15,18,0.4) 100%)',
            }}
          />
          <div className="absolute top-6 left-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 font-display text-[10px] font-bold tracking-widest uppercase rounded-sm"
              style={{
                background: 'var(--color-primary-hover)',
                color: '#fff',
              }}
            >
              ★ Featured
            </span>
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            <CategoryBadge label={secondary.category} />
            <h2
              className="font-display font-black uppercase leading-tight group-hover:text-primary-hover transition-colors duration-200"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: 'var(--color-foreground)' }}
            >
              {secondary.title}
            </h2>
            <p
              className="font-body text-sm leading-relaxed line-clamp-3"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              {secondary.excerpt}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span
                className="font-display text-[10px] font-bold tracking-widest uppercase"
                style={{ color: 'var(--color-subtle)' }}
              >
                {secondary.author}
              </span>
              <span style={{ color: 'var(--color-border-hover)' }}>·</span>
              <span
                className="font-display text-[10px] font-bold tracking-widest uppercase"
                style={{ color: 'var(--color-subtle)' }}
              >
                {secondary.date}
              </span>
              <span style={{ color: 'var(--color-border-hover)' }}>·</span>
              <span
                className="font-display text-[10px] font-bold tracking-widest uppercase"
                style={{ color: 'var(--color-primary-hover)' }}
              >
                {secondary.readTime}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span
                className="font-display text-[11px] font-bold tracking-widest uppercase transition-colors duration-150 group-hover:text-primary-hover"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Read Article
              </span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: 'var(--color-primary-hover)' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}
