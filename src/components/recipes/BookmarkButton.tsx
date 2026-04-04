'use client'

import { useState } from 'react'
import Link from 'next/link'
import { addBookmark, removeBookmark } from '@/actions/bookmarks'

interface BookmarkButtonProps {
  recipeId: string
  isLoggedIn: boolean
  initialBookmarked: boolean
  sharedUrl: string
}

export default function BookmarkButton({ recipeId, isLoggedIn, initialBookmarked, sharedUrl }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const redirectTo = encodeURIComponent(`${sharedUrl}?autoBookmark=1`)

  async function handleClick() {
    if (!isLoggedIn) {
      setShowModal(true)
      return
    }

    setLoading(true)
    if (bookmarked) {
      await removeBookmark(recipeId)
      setBookmarked(false)
    } else {
      await addBookmark(recipeId)
      setBookmarked(true)
    }
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark recipe'}
        className="shrink-0 mt-1 p-1.5 rounded-full transition-colors text-gray-400 hover:text-brand-500 disabled:opacity-50"
      >
        {bookmarked ? (
          // Filled bookmark (bookmark.svg)
          <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" className="text-brand-500">
            <path d="M5.5 1C4.39543 1 3.5 1.89543 3.5 3V22C3.5 22.3612 3.6948 22.6944 4.00961 22.8715C4.32441 23.0486 4.71028 23.0422 5.01903 22.8548L12 18.6157L18.981 22.8548C19.2897 23.0422 19.6756 23.0486 19.9904 22.8715C20.3052 22.6944 20.5 22.3612 20.5 22V3C20.5 1.89543 19.6046 1 18.5 1H5.5Z" />
          </svg>
        ) : (
          // Outlined bookmark
          <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.5 1C4.39543 1 3.5 1.89543 3.5 3V22C3.5 22.3612 3.6948 22.6944 4.00961 22.8715C4.32441 23.0486 4.71028 23.0422 5.01903 22.8548L12 18.6157L18.981 22.8548C19.2897 23.0422 19.6756 23.0486 19.9904 22.8715C20.3052 22.6944 20.5 22.3612 20.5 22V3C20.5 1.89543 19.6046 1 18.5 1H5.5Z" />
          </svg>
        )}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <p className="text-2xl mb-3">🔖</p>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Save this recipe</h2>
            <p className="text-sm text-gray-500 mb-6">
              Create a free account or log in to bookmark recipes.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={`/signup?redirectTo=${redirectTo}`}
                className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
              >
                Sign up free
              </Link>
              <Link
                href={`/login?redirectTo=${redirectTo}`}
                className="text-sm text-brand-500 hover:underline font-medium py-1"
              >
                Already have an account? Log in
              </Link>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
