import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getPublicRecipeById } from '@/lib/queries/recipes'
import { getIsBookmarked } from '@/lib/queries/bookmarks'
import { addBookmark } from '@/actions/bookmarks'
import StarRating from '@/components/recipes/StarRating'
import BookmarkButton from '@/components/recipes/BookmarkButton'

export default async function SharedRecipePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ autoBookmark?: string }>
}) {
  const { id } = await params
  const { autoBookmark } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Auto-bookmark after login/signup redirect, then clean the URL
  if (user && autoBookmark === '1') {
    await addBookmark(id)
    redirect(`/shared/${id}`)
  }

  const recipe = await getPublicRecipeById(id)

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-5xl mb-4">🍽️</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Recipe not found</h1>
        <p className="text-gray-500 mb-6 text-sm">This link may be invalid or the recipe may have been removed.</p>
        <Link href="/" className="text-brand-500 hover:underline text-sm">← Back to Bust</Link>
      </div>
    )
  }

  const bookmarked = await getIsBookmarked(id)
  const sharedUrl = `/shared/${id}`

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header className="bg-[#FFD3A5] border-b border-[#FFD3A5] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-brand-500 hover:text-gray-900 transition-colors leading-none" style={{ fontFamily: 'var(--font-brand)', fontSize: '52px' }}>
            Bust
          </Link>
          {!user && (
            <Link href="/signup" className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
              Sign up free
            </Link>
          )}
        </div>
      </header>

      {/* Recipe */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">

        {/* Owner + title + bookmark */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            {recipe.ownerUsername && (
              <p className="text-lg font-semibold text-brand-500 mb-1">{recipe.ownerUsername}&apos;s</p>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
          </div>
          <BookmarkButton
            recipeId={id}
            isLoggedIn={!!user}
            initialBookmarked={bookmarked}
            sharedUrl={sharedUrl}
          />
        </div>

        {/* Photo */}
        {recipe.photo_url && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100">
            <Image
              src={recipe.photo_url}
              alt={recipe.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}

        {/* Rating */}
        {recipe.rating !== null && (
          <div className="mb-6">
            <StarRating value={recipe.rating} size="md" />
          </div>
        )}

        {/* Ingredients */}
        {recipe.ingredients.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((ing) => (
                  <li key={ing.id} className="flex items-baseline gap-3">
                    <span className="w-2 h-2 rounded-full bg-gray-900 shrink-0 mt-1.5" />
                    <span className="text-gray-800 text-sm">{ing.name}</span>
                    {ing.measurement && (
                      <span className="text-gray-500 text-sm ml-auto shrink-0">{ing.measurement}</span>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* Directions */}
        {recipe.directions.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Directions</h2>
            <ol className="space-y-3">
              {recipe.directions
                .sort((a, b) => a.step_number - b.step_number)
                .map((dir) => (
                  <li key={dir.id} className="flex gap-3 items-start">
                    <span className="text-gray-900 font-semibold shrink-0 w-4 text-right text-xs mt-0.5">{dir.step_number}.</span>
                    <span className="text-gray-800 text-sm leading-relaxed">{dir.instruction}</span>
                  </li>
                ))}
            </ol>
          </section>
        )}

        {/* Notes */}
        {recipe.notes && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Notes</h2>
            <div className="bg-white rounded-xl p-4 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap border border-gray-200">
              {recipe.notes}
            </div>
          </section>
        )}

        {/* CTA — only shown to unauthenticated users */}
        {!user && (
          <div className="border-t border-gray-200 pt-10 text-center">
            <p className="text-xl font-bold text-gray-900 mb-2">Want to save your own recipes?</p>
            <p className="text-sm text-gray-500 mb-6">Join Bust for free and start building your personal recipe collection.</p>
            <Link href="/signup" className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-8 py-3 rounded-full transition-colors inline-block">
              Join Bust for free
            </Link>
          </div>
        )}

      </main>
    </div>
  )
}
