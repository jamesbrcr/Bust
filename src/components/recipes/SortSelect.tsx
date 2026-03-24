'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az',     label: 'A to Z' },
  { value: 'za',     label: 'Z to A' },
  { value: 'highest', label: 'Highest rated' },
  { value: 'lowest',  label: 'Lowest rated' },
]

export default function SortSelect({ value }: { value: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', e.target.value)
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg border border-gray-300 dark:border-dark-surface bg-white dark:bg-dark-surface px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
