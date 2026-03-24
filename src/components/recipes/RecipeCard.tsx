import Link from 'next/link'
import Image from 'next/image'
import { RecipeWithIngredients } from '@/types'
import { formatDate } from '@/lib/utils'
import DeleteRecipeButton from './DeleteRecipeButton'

interface RecipeCardProps {
  recipe: RecipeWithIngredients
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/recipes/${recipe.id}`} className="block relative aspect-video bg-gray-100 overflow-hidden">
        {recipe.photo_url ? (
          <Image
            src={recipe.photo_url}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">
            🍽️
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/recipes/${recipe.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
              {recipe.name}
            </h3>
          </Link>
          <DeleteRecipeButton recipeId={recipe.id} recipeName={recipe.name} />
        </div>

        {recipe.rating !== null && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-orange-400">{'★'.repeat(Math.round((recipe.rating / 10) * 5))}</span>
            <span className="text-gray-300">{'★'.repeat(5 - Math.round((recipe.rating / 10) * 5))}</span>
            <span className="text-xs text-gray-500 ml-1">{recipe.rating}/10</span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
          <span>{recipe.ingredients.length} ingredient{recipe.ingredients.length !== 1 ? 's' : ''}</span>
          <span>{formatDate(recipe.created_at)}</span>
        </div>
      </div>
    </div>
  )
}
