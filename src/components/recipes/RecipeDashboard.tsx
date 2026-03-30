'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { RecipeWithIngredients } from '@/types'
import RecipeCard from './RecipeCard'
import EmptyState from '@/components/ui/EmptyState'
import SortSelect from './SortSelect'

export default function RecipeDashboard({
  recipes,
  validSort,
  total,
}: {
  recipes: RecipeWithIngredients[]
  validSort: string
  total: number
}) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? recipes.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
    : recipes

  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="shrink-0">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">My Recipes</h1>
          <p className="text-[18px] text-gray-500 dark:text-gray-400 mt-0.5">
            {total} saved
          </p>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          {total > 0 && (
            <>
              <div className="relative flex-1" style={{ transform: 'translateY(-2px)' }}>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-brand-500" style={{ marginTop: '3px' }}>
                  <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full rounded-2xl border border-gray-300 dark:border-dark-surface bg-white dark:bg-dark-surface pl-12 pr-10 py-2.5 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81108 17.7747C4.42056 18.1652 4.42056 18.7984 4.81108 19.1889C5.20161 19.5794 5.83477 19.5794 6.2253 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.1889 6.2253C19.5794 5.83477 19.5794 5.20161 19.1889 4.81108C18.7984 4.42056 18.1652 4.42056 17.7747 4.81108L12 10.5858L6.2253 4.81108Z" />
                    </svg>
                  </button>
                )}
              </div>
              <Suspense>
                <SortSelect value={validSort} />
              </Suspense>
            </>
          )}
          <Link
            href="/recipes/new"
            aria-label="Add recipe"
            className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
          >
            <svg viewBox="0 0 24 24" width={30} height={30} fill="currentColor">
              <path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" />
            </svg>
          </Link>
        </div>
      </div>

      {filtered.length === 0 && query.trim() ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-sm">
          No recipes found for &ldquo;{query}&rdquo;
        </p>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  )
}
