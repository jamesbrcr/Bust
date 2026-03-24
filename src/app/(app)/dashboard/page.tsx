import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getRecipesByUser } from '@/lib/queries/recipes'
import RecipeGrid from '@/components/recipes/RecipeGrid'
import SortSelect from '@/components/recipes/SortSelect'
import { RecipeWithIngredients } from '@/types'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Recipes</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {recipes.length} {recipes.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <Link
          href="/recipes/new"
          aria-label="Add recipe"
          className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center text-2xl font-bold leading-none transition-colors shadow-sm"
        >
          +
        </Link>
      </div>

      {recipes.length > 0 && (
        <div className="flex justify-end mb-4">
          <Suspense>
            <SortSelect value={validSort} />
          </Suspense>
        </div>
      )}

      <RecipeGrid recipes={sorted} />
    </div>
  )
}
