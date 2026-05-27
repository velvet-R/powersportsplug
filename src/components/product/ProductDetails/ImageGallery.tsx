'use client'

import React, { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps): React.JSX.Element {
  const [activeImg, setActiveImg] = useState(
    images[0] ||
      'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&auto=format&fit=crop&q=60',
  )

  return (
    <div className="space-y-4">
      {/* Primary Display Viewport */}
      <div className="relative aspect-video w-full bg-zinc-900 border border-border rounded-lg overflow-hidden group">
        <img
          src={activeImg}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Grid Strip Selection Blocks (Supports multiple images seamlessly) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(img)}
              className={`relative aspect-video rounded-md overflow-hidden bg-zinc-900 border transition-all ${
                activeImg === img
                  ? 'border-primary-hover ring-1 ring-primary-hover'
                  : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${title} split ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
