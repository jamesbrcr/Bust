'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export const SORT_OPTIONS = [
  { value: 'newest',  label: 'Newest first' },
  { value: 'oldest',  label: 'Oldest first' },
  { value: 'az',      label: 'A to Z' },
  { value: 'za',      label: 'Z to A' },
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
    <div className="relative w-10 h-10 flex items-center justify-center" title="Sort recipes">
      <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor" className="text-brand-500 pointer-events-none">
        <path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" />
      </svg>
      <select
        value={value}
        onChange={handleChange}
        aria-label="Sort recipes"
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
