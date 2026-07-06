// src/app/(app)/products/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

const SITE_URL = 'https://www.powersportsplug.com'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // ✅ fetch instead of importing Payload — edge runtime can do fetch, not fs/sharp
  let product: {
    year: number
    brand: string
    title: string
    price?: number
    stockNumber: string
    condition: string
  } | null = null

  try {
    const res = await fetch(`${SITE_URL}/api/og-product/${slug}`, {
      next: { revalidate: 1800 },
    })
    if (res.ok) product = await res.json()
  } catch {
    // fall through to fallback
  }

  // Fallback if product not found
  if (!product) {
    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1200px',
          height: '630px',
          background: '#0f0f12',
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ color: '#f4f4f5', fontSize: '48px', fontWeight: '900' }}>
          POWERSPORTS<span style={{ color: '#ff5722' }}>PLUG</span>
        </span>
      </div>,
      size,
    )
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '1200px',
        height: '630px',
        padding: '60px',
        background: 'linear-gradient(135deg, #0f0f12 0%, #1a0e00 60%, #0f0f12 100%)',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Glow */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,87,34,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '48px',
          left: '60px',
          fontSize: '22px',
          fontWeight: '900',
          color: '#f4f4f5',
          textTransform: 'uppercase',
        }}
      >
        POWERSPORTS<span style={{ color: '#ff5722' }}>PLUG</span>
      </div>

      {/* Condition badge */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '48px',
          right: '60px',
          padding: '6px 14px',
          borderRadius: '4px',
          background:
            product.condition === 'New' ? 'rgba(59,130,246,0.15)' : 'rgba(120,113,108,0.15)',
          border: `1px solid ${product.condition === 'New' ? 'rgba(59,130,246,0.4)' : 'rgba(120,113,108,0.4)'}`,
          color: product.condition === 'New' ? '#3b82f6' : '#a8a29e',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        {product.condition}
      </div>

      {/* Vehicle name */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            color: '#ff5722',
            fontSize: '32px',
            fontWeight: '900',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {product.year} {product.brand}
        </span>
        <span
          style={{
            color: '#f4f4f5',
            fontSize: '64px',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: '0.95',
            letterSpacing: '-2px',
          }}
        >
          {product.title}
        </span>
      </div>

      {/* Price + STK + Financing */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '12px',
              color: '#52525b',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Price
          </span>
          <span style={{ fontSize: '36px', fontWeight: '900', color: '#ff5722' }}>
            {product.price ? `$${product.price.toLocaleString()}` : 'Call for Price'}
          </span>
        </div>
        <div style={{ display: 'flex', width: '1px', height: '48px', background: '#27272a' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '12px',
              color: '#52525b',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Stock #
          </span>
          <span style={{ fontSize: '24px', fontWeight: '700', color: '#a1a1aa' }}>
            {product.stockNumber}
          </span>
        </div>
        <div style={{ display: 'flex', width: '1px', height: '48px', background: '#27272a' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: '12px',
              color: '#52525b',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Financing
          </span>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e' }}>
            No Credit Check
          </span>
        </div>
      </div>
    </div>,
    size,
  )
}
