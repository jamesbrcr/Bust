'use client'

import { useState } from 'react'
import { DirectionInput } from '@/types'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

interface DirectionListProps {
  initialDirections?: DirectionInput[]
}

export default function DirectionList({ initialDirections }: DirectionListProps) {
  const [directions, setDirections] = useState<DirectionInput[]>(
    initialDirections && initialDirections.length > 0
      ? initialDirections
      : [{ instruction: '' }]
  )

  function add() {
    setDirections((prev) => [...prev, { instruction: '' }])
  }

  function remove(index: number) {
    setDirections((prev) => prev.filter((_, i) => i !== index))
  }

  function update(index: number, value: string) {
    setDirections((prev) =>
      prev.map((dir, i) => (i === index ? { instruction: value } : dir))
    )
  }

  return (
    <div className="space-y-2">
      {directions.map((dir, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="mt-3 text-xs font-semibold text-gray-900 dark:text-gray-100 shrink-0 w-4 text-right">
            {i + 1}.
          </span>
          <Textarea
            name="direction_instruction"
            placeholder={`Step ${i + 1}`}
            value={dir.instruction}
            onChange={(e) => update(i, e.target.value)}
            rows={2}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={directions.length === 1}
            className="shrink-0 p-1.5 mt-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-30 transition-colors"
            aria-label="Remove step"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
              <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81108 17.7747C4.42056 18.1652 4.42056 18.7984 4.81108 19.1889C5.20161 19.5794 5.83477 19.5794 6.2253 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.1889 6.2253C19.5794 5.83477 19.5794 5.20161 19.1889 4.81108C18.7984 4.42056 18.1652 4.42056 17.7747 4.81108L12 10.5858L6.2253 4.81108Z" />
            </svg>
          </button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add} className="rounded-xl">
        + Add step
      </Button>
    </div>
  )
}
