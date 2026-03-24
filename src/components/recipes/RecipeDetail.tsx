import Image from 'next/image'
import Link from 'next/link'
import { RecipeWithIngredients } from '@/types'
import { formatDate } from '@/lib/utils'
import StarRating from './StarRating'
import DeleteRecipeButton from './DeleteRecipeButton'
import Button from '@/components/ui/Button'

export default function RecipeDetail({ recipe }: { recipe: RecipeWithIngredients }) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <Link href="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
          ← Back to dashboard
        </Link>
        <div className="flex items-center gap-2">
          <Link href={`/recipes/${recipe.id}/edit`}>
            <Button variant="secondary" size="sm">Edit</Button>
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
          <StarRating value={recipe.rating} readonly size="md" />
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
                  <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                  <span className="text-gray-800 dark:text-gray-200">{ing.name}</span>
                  {ing.measurement && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-auto shrink-0">{ing.measurement}</span>
                  )}
                </li>
              ))}
          </ul>
        </section>
      )}

      {recipe.notes && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Notes</h2>
          <div className="bg-brand-100 dark:bg-dark-surface rounded-xl p-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap border border-brand-200 dark:border-dark-surface">
            {recipe.notes}
          </div>
        </section>
      )}
    </div>
  )
}
