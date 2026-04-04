import Image from 'next/image'
import Link from 'next/link'
import { RecipeWithIngredients } from '@/types'
import { formatDate } from '@/lib/utils'
import StarRating from './StarRating'
import DeleteRecipeButton from './DeleteRecipeButton'
import ShareButton from './ShareButton'

export default function RecipeDetail({ recipe }: { recipe: RecipeWithIngredients }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
          ← Back to dashboard
        </Link>
        <div className="flex items-center gap-2">
          <ShareButton recipeId={recipe.id} />
          <Link href={`/recipes/${recipe.id}/edit`} aria-label="Edit recipe" className="p-1 text-gray-400 hover:text-brand-500 transition-colors">
            <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor">
              <path d="M17.0671 2.27157C17.5 2.09228 17.9639 2 18.4324 2C18.9009 2 19.3648 2.09228 19.7977 2.27157C20.2305 2.45086 20.6238 2.71365 20.9551 3.04493C21.2864 3.37621 21.5492 3.7695 21.7285 4.20235C21.9077 4.63519 22 5.09911 22 5.56761C22 6.03611 21.9077 6.50003 21.7285 6.93288C21.5492 7.36572 21.2864 7.75901 20.9551 8.09029L20.4369 8.60845L15.3916 3.56308L15.9097 3.04493C16.241 2.71365 16.6343 2.45086 17.0671 2.27157Z" />
              <path d="M13.9774 4.9773L3.6546 15.3001C3.53154 15.4231 3.44273 15.5762 3.39694 15.7441L2.03526 20.7369C1.94084 21.0831 2.03917 21.4534 2.29292 21.7071C2.54667 21.9609 2.91693 22.0592 3.26314 21.9648L8.25597 20.6031C8.42387 20.5573 8.57691 20.4685 8.69996 20.3454L19.0227 10.0227L13.9774 4.9773Z" />
            </svg>
          </Link>
          <DeleteRecipeButton recipeId={recipe.id} recipeName={recipe.name} />
        </div>
      </div>

      {recipe.photo_url && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-dark-surface">
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

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{recipe.name}</h1>

      {recipe.rating !== null && (
        <div className="mb-4">
          <StarRating value={recipe.rating} size="md" />
        </div>
      )}

      <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Added {formatDate(recipe.created_at)}</p>

      {recipe.ingredients.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((ing) => (
                <li key={ing.id} className="flex items-baseline gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-gray-100 shrink-0 mt-1.5" />
                  <span className="text-gray-800 dark:text-gray-200 text-sm">{ing.name}</span>
                  {ing.measurement && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-auto shrink-0">{ing.measurement}</span>
                  )}
                </li>
              ))}
          </ul>
        </section>
      )}

      {recipe.directions.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Directions</h2>
          <ol className="space-y-3">
            {recipe.directions
              .sort((a, b) => a.step_number - b.step_number)
              .map((dir) => (
                <li key={dir.id} className="flex gap-3 items-start">
                  <span className="text-gray-900 dark:text-gray-100 font-semibold shrink-0 w-4 text-right text-xs mt-0.5">{dir.step_number}.</span>
                  <span className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{dir.instruction}</span>
                </li>
              ))}
          </ol>
        </section>
      )}

      {recipe.notes && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Notes</h2>
          <div className="bg-white dark:bg-dark-surface rounded-xl p-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap border border-gray-300 dark:border-dark-surface">
            {recipe.notes}
          </div>
        </section>
      )}
    </div>
  )
}
