'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  value: number | null
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({ value, onChange, readonly, size = 'md' }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' }
  const display = hovered ?? value ?? 0

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(null)}
          className={cn(
            sizes[size],
            'leading-none transition-transform',
            !readonly && 'cursor-pointer hover:scale-110',
            readonly && 'cursor-default'
          )}
          aria-label={`${star} out of 10`}
        >
          {star <= display ? '★' : '☆'}
        </button>
      ))}
      {value !== null && value !== undefined && (
        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">{value}/10</span>
      )}
    </div>
  )
}
