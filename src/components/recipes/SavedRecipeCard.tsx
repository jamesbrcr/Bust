'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { BookmarkedRecipe } from '@/lib/queries/bookmarks'
import { removeBookmark } from '@/actions/bookmarks'
export default function SavedRecipeCard({ recipe }: { recipe: BookmarkedRecipe }) {
  const [removed, setRemoved] = useState(false)

  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault()
    await removeBookmark(recipe.id)
    setRemoved(true)
  }

  if (removed) return null

  return (
    <div className="group bg-white dark:bg-dark-base rounded-2xl shadow-sm border border-gray-100 dark:border-dark-surface overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/shared/${recipe.id}`} className="block relative aspect-video bg-gray-100 dark:bg-dark-surface overflow-hidden">
        {recipe.photo_url ? (
          <Image
            src={recipe.photo_url}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300 dark:text-gray-600">
            🍽️
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/shared/${recipe.id}`}>
            <h3 className="font-semibold text-[18px] text-gray-900 dark:text-gray-100 hover:text-brand-500 dark:hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
              {recipe.name}
            </h3>
          </Link>
          <button
            onClick={handleRemove}
            aria-label="Remove bookmark"
            className="shrink-0 mt-1 text-gray-400 hover:text-brand-500 transition-colors"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
              <path d="M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 0.5H9C8.44772 0.5 8 0.947715 8 1.5Z" />
              <path d="M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z" />
            </svg>
          </button>
        </div>

        {recipe.ownerUsername && (
          <p className="text-xs text-brand-500 font-medium mb-2">@{recipe.ownerUsername}</p>
        )}

        <div className="mt-auto text-xs text-gray-400 dark:text-gray-500">
          {recipe.ingredients.length} ingredient{recipe.ingredients.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
