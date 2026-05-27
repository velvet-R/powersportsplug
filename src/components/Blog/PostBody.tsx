'use client'

import React, { useEffect, useRef } from 'react'

interface Props {
  content: string
  tags: string[]
}

export default function PostBody({ content, tags }: Props): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  // Add styling hooks to raw HTML after mount
  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Style all h2s
    el.querySelectorAll('h2').forEach((h) => {
      h.style.fontFamily = 'var(--font-display)'
      h.style.fontSize = 'clamp(1.3rem, 2.5vw, 1.8rem)'
      h.style.fontWeight = '800'
      h.style.textTransform = 'uppercase'
      h.style.color = 'var(--color-foreground)'
      h.style.marginTop = '2.5rem'
      h.style.marginBottom = '1rem'
      h.style.paddingBottom = '0.5rem'
      h.style.borderBottom = '1px solid var(--color-border)'
    })

    el.querySelectorAll('h3').forEach((h) => {
      h.style.fontFamily = 'var(--font-display)'
      h.style.fontSize = 'clamp(1.1rem, 2vw, 1.4rem)'
      h.style.fontWeight = '700'
      h.style.textTransform = 'uppercase'
      h.style.color = 'var(--color-foreground)'
      h.style.marginTop = '2rem'
      h.style.marginBottom = '0.75rem'
    })

    el.querySelectorAll('p').forEach((p) => {
      p.style.color = 'var(--color-muted-foreground)'
      p.style.lineHeight = '1.8'
      p.style.marginBottom = '1.25rem'
      p.style.fontSize = '1rem'
    })

    el.querySelectorAll('strong').forEach((s) => {
      s.style.color = 'var(--color-foreground)'
      s.style.fontWeight = '600'
    })

    el.querySelectorAll('ul').forEach((u) => {
      u.style.marginBottom = '1.25rem'
      u.style.paddingLeft = '0'
      u.style.listStyle = 'none'
      u.style.display = 'flex'
      u.style.flexDirection = 'column'
      u.style.gap = '0.5rem'
    })

    el.querySelectorAll('ul li').forEach((li) => {
      const el = li as HTMLElement
      el.style.color = 'var(--color-muted-foreground)'
      el.style.fontSize = '0.95rem'
      el.style.lineHeight = '1.7'
      el.style.paddingLeft = '1.25rem'
      el.style.position = 'relative'
      // Custom bullet
      el.style.setProperty('--li-before', '"→"')
      // inject pseudo via inline style trick — use a wrapper span instead
      const original = el.innerHTML
      el.innerHTML = `<span style="position:absolute;left:0;color:var(--color-primary-hover);font-weight:700;font-size:0.75rem;top:0.25rem;">→</span>${original}`
    })

    el.querySelectorAll('blockquote').forEach((bq) => {
      const el = bq as HTMLElement
      el.style.borderLeft = '3px solid var(--color-primary-hover)'
      el.style.paddingLeft = '1.5rem'
      el.style.margin = '2rem 0'
      el.style.background = 'color-mix(in srgb, var(--color-primary-hover) 5%, transparent)'
      el.style.padding = '1.25rem 1.5rem'
      el.style.borderRadius = '0 4px 4px 0'
      el.querySelectorAll('p').forEach((p) => {
        ;(p as HTMLElement).style.color = 'var(--color-foreground)'
        ;(p as HTMLElement).style.fontStyle = 'italic'
        ;(p as HTMLElement).style.fontSize = '1.05rem'
        ;(p as HTMLElement).style.marginBottom = '0'
      })
    })

    el.querySelectorAll('a').forEach((a) => {
      const el = a as HTMLElement
      el.style.color = 'var(--color-primary-hover)'
      el.style.textDecoration = 'underline'
    })
  }, [content])

  return (
    <article>
      {/* Prose content */}
      <div ref={ref} dangerouslySetInnerHTML={{ __html: content }} />

      {/* Tags */}
      <div
        className="flex flex-wrap items-center gap-2 mt-10 pt-6"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <span
          className="font-display text-[10px] font-bold tracking-widest uppercase mr-1"
          style={{ color: 'var(--color-subtle)' }}
        >
          Tags:
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 font-display text-[10px] font-bold tracking-widest uppercase rounded-sm"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted-foreground)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Share row */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <span
          className="font-display text-[11px] font-black tracking-widest uppercase"
          style={{ color: 'var(--color-foreground)' }}
        >
          Share this article
        </span>
        <div className="flex items-center gap-2">
          {[
            {
              label: 'Twitter',
              icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
            },
            {
              label: 'Facebook',
              icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
            },
            {
              label: 'Link',
              icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
            },
          ].map(({ label, icon }) => (
            <button
              key={label}
              aria-label={`Share on ${label}`}
              className="flex h-8 w-8 items-center justify-center rounded-sm transition-all duration-150 cursor-pointer"
              style={{
                background: 'var(--color-surface)',
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
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}
