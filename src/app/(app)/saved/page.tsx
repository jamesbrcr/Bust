import { getBookmarkedRecipes } from '@/lib/queries/bookmarks'
import SavedRecipeCard from '@/components/recipes/SavedRecipeCard'

export default async function SavedPage() {
  const recipes = await getBookmarkedRecipes()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">Saved Recipes</h1>
        <p className="text-[18px] text-gray-500 dark:text-gray-400 mt-0.5">{recipes.length} recipes</p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <svg viewBox="0 0 24 24" width={48} height={48} fill="currentColor" className="text-gray-300 dark:text-gray-600 mx-auto mb-4">
            <path d="M5.5 1C4.39543 1 3.5 1.89543 3.5 3V22C3.5 22.3612 3.6948 22.6944 4.00961 22.8715C4.32441 23.0486 4.71028 23.0422 5.01903 22.8548L12 18.6157L18.981 22.8548C19.2897 23.0422 19.6756 23.0486 19.9904 22.8715C20.3052 22.6944 20.5 22.3612 20.5 22V3C20.5 1.89543 19.6046 1 18.5 1H5.5Z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Recipes you bookmark from shared links will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {recipes.map((recipe) => (
            <SavedRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}
