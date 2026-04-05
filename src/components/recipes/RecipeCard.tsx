import Link from 'next/link'
import Image from 'next/image'
import { RecipeWithIngredients } from '@/types'
import { formatDate } from '@/lib/utils'
import DeleteRecipeButton from './DeleteRecipeButton'
import StarRating from './StarRating'

interface RecipeCardProps {
  recipe: RecipeWithIngredients
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group bg-white dark:bg-dark-base rounded-2xl shadow-sm border border-gray-100 dark:border-dark-surface overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/recipes/${recipe.id}`} className="block relative aspect-video bg-gray-100 dark:bg-dark-surface overflow-hidden">
        {recipe.photo_url ? (
          <Image
            src={recipe.photo_url}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 64 64" width={48} height={48} fill="currentColor" className="text-gray-300 dark:text-gray-600">
              <g fillRule="evenodd">
                <path d="M61.821 11.045c.703-1.309-.891-.912-.891-.912s-10.627 10.201-12.104 8.951S59.231 8.057 57.825 6.23c-1.301-1.703-11.74 10.455-12.994 8.97c-1.242-1.482 8.939-12.123 8.939-12.123s.387-1.602-.912-.9C36.851 10.785 34.812 18.81 34.812 18.81s-.551 1.563.645 2.771c.117.105-29.204 29.26-33.129 33.196c-1.91 1.908 5.098 8.801 6.996 6.893c3.926-3.936 33.024-33.303 33.129-33.194c1.207 1.205 2.766.652 2.766.652s8.012-2.045 16.602-18.083" />
                <path d="M32.028 40.507c7.803 7.82 20.958 20.999 20.958 20.999s5.742-1.879 6.551-6.729L38.662 33.861a5104.35 5104.35 0 0 0-6.634 6.646" />
                <path d="M21.76 33.729a5059.26 5059.26 0 0 0 8.387-8.4L7.459 2.598s-.41-.43-1.313.477C4.353 4.862.884 16.248 15.591 30.977c2.331 2.336 4.359 2.66 6.169 2.752" />
              </g>
            </svg>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/recipes/${recipe.id}`}>
            <h3 className="font-semibold text-[18px] text-gray-900 dark:text-gray-100 hover:text-brand-500 dark:hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
              {recipe.name}
            </h3>
          </Link>
          <DeleteRecipeButton recipeId={recipe.id} recipeName={recipe.name} />
        </div>

        {recipe.rating !== null && (
          <div className="mb-2">
            <StarRating value={recipe.rating} size="sm" />
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <span>{recipe.ingredients.length} ingredient{recipe.ingredients.length !== 1 ? 's' : ''}</span>
          <span>{formatDate(recipe.created_at)}</span>
        </div>
      </div>
    </div>
  )
}
