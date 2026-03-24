import { RecipeWithIngredients } from '@/types'
import RecipeCard from './RecipeCard'
import EmptyState from '@/components/ui/EmptyState'

export default function RecipeGrid({ recipes }: { recipes: RecipeWithIngredients[] }) {
  if (recipes.length === 0) return <EmptyState />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
