'use client'

import { useState } from 'react'
import { DirectionInput } from '@/types'
import Textarea from '@/components/ui/Textarea'

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

  function moveUp(index: number) {
    if (index === 0) return
    setDirections((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  function moveDown(index: number) {
    if (index === directions.length - 1) return
    setDirections((prev) => {
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
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
            className="min-h-0"
          />

          <div className="shrink-0 flex flex-col items-center mt-1">
            <button
              type="button"
              onClick={() => moveUp(i)}
              disabled={i === 0}
              className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-20 transition-colors"
              aria-label="Move step up"
            >
              <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.29297 16.9142C3.68349 17.3047 4.31666 17.3047 4.70718 16.9142L12.0001 9.62132L19.293 16.9142C19.6835 17.3047 20.3167 17.3047 20.7072 16.9142L21.4143 16.2071C21.8048 15.8166 21.8048 15.1834 21.4143 14.7929L13.0607 6.43934C12.4749 5.85355 11.5252 5.85355 10.9394 6.43934L2.58586 14.7929C2.19534 15.1834 2.19534 15.8166 2.58586 16.2071L3.29297 16.9142Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => remove(i)}
              disabled={directions.length === 1}
              className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-20 transition-colors"
              aria-label="Remove step"
            >
              <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                <path d="M4.70718 2.58574C4.31666 2.19522 3.68349 2.19522 3.29297 2.58574L2.58586 3.29285C2.19534 3.68337 2.19534 4.31654 2.58586 4.70706L9.87877 12L2.5859 19.2928C2.19537 19.6834 2.19537 20.3165 2.5859 20.7071L3.293 21.4142C3.68353 21.8047 4.31669 21.8047 4.70722 21.4142L12.0001 14.1213L19.293 21.4142C19.6835 21.8047 20.3167 21.8047 20.7072 21.4142L21.4143 20.7071C21.8048 20.3165 21.8048 19.6834 21.4143 19.2928L14.1214 12L21.4143 4.70706C21.8048 4.31654 21.8048 3.68337 21.4143 3.29285L20.7072 2.58574C20.3167 2.19522 19.6835 2.19522 19.293 2.58574L12.0001 9.87865L4.70718 2.58574Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => moveDown(i)}
              disabled={i === directions.length - 1}
              className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-20 transition-colors"
              aria-label="Move step down"
            >
              <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.29297 6.70711C3.68349 6.31658 4.31666 6.31658 4.70718 6.70711L12.0001 14L19.293 6.70711C19.6835 6.31658 20.3167 6.31658 20.7072 6.70711L21.4143 7.41421C21.8048 7.80474 21.8048 8.4379 21.4143 8.82843L13.0607 17.182C12.4749 17.7678 11.5252 17.7678 10.9394 17.182L2.58586 8.82843C2.19534 8.4379 2.19534 7.80474 2.58586 7.41422L3.29297 6.70711Z" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="text-sm bg-gray-100 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-dark-base text-gray-700 dark:text-gray-300 font-medium px-4 py-1.5 rounded-xl transition-colors"
      >
        + Add step
      </button>
    </div>
  )
}
