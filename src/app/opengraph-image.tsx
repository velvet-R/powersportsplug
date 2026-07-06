// src/app/opengraph-image.tsx

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex', // ← root must be flex
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '60px',
        background: 'linear-gradient(135deg, #0f0f12 0%, #1a0e00 60%, #0f0f12 100%)',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Orange glow blob */}
      <div
        style={{
          display: 'flex', // ← single-child divs still need flex in satori
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,87,34,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '50px',
          left: '60px',
          fontSize: '28px',
          fontWeight: '900',
          letterSpacing: '-1px',
          color: '#f4f4f5',
          textTransform: 'uppercase',
        }}
      >
        POWERSPORTS
        <span style={{ color: '#ff5722' }}>PLUG</span>
      </div>

      {/* Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          padding: '6px 14px',
          borderRadius: '4px',
          background: 'rgba(255,87,34,0.15)',
          border: '1px solid rgba(255,87,34,0.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ff5722',
          }}
        />
        <span
          style={{
            color: '#ff5722',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          #1 Rated Powersports Dealer · Est. 2018
        </span>
      </div>

      {/* Headline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '72px',
          fontWeight: '900',
          lineHeight: '0.95',
          color: '#f4f4f5',
          textTransform: 'uppercase',
          letterSpacing: '-2px',
          marginBottom: '20px',
        }}
      >
        <span>AMERICA'S</span>
        <span style={{ color: '#ff5722' }}>PREMIER ATV</span>
        <span>DEALER</span>
      </div>

      {/* Sub */}
      <div
        style={{
          display: 'flex',
          color: '#a1a1aa',
          fontSize: '18px',
          marginBottom: '32px',
        }}
      >
        500+ ATVs, UTVs &amp; Side-by-Sides · No Credit Check · All 50 States
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {(
          [
            ['500+', 'Vehicles'],
            ['100%', 'Approval'],
            ['50', 'States'],
          ] as const
        ).map(([val, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: '900', color: '#ff5722' }}>{val}</span>
            <span
              style={{
                fontSize: '12px',
                color: '#52525b',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    size,
  )
}
