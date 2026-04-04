import { getBookmarkedRecipes } from '@/lib/queries/bookmarks'
import SavedRecipeCard from '@/components/recipes/SavedRecipeCard'

export default async function SavedPage() {
  const recipes = await getBookmarkedRecipes()

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Saved Recipes</h1>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔖</p>
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
