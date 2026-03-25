import { createClient } from '@/lib/supabase/server'
import { getRecipesByUser } from '@/lib/queries/recipes'
import RecipeDashboard from '@/components/recipes/RecipeDashboard'
import { RecipeWithIngredients } from '@/types'
import { redirect } from 'next/navigation'

type SortKey = 'newest' | 'oldest' | 'az' | 'za' | 'highest' | 'lowest'

function sortRecipes(recipes: RecipeWithIngredients[], sort: SortKey): RecipeWithIngredients[] {
  const sorted = [...recipes]
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'highest':
      return sorted.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1))
    case 'lowest':
      return sorted.sort((a, b) => (a.rating ?? 11) - (b.rating ?? 11))
    default:
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { sort = 'newest' } = await searchParams
  const validSort = ['newest', 'oldest', 'az', 'za', 'highest', 'lowest'].includes(sort)
    ? (sort as SortKey)
    : 'newest'

  const recipes = await getRecipesByUser(user.id)
  const sorted = sortRecipes(recipes, validSort)

  return (
    <div>
      <RecipeDashboard recipes={sorted} validSort={validSort} total={recipes.length} />
    </div>
  )
}
