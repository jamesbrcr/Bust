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
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">My Recipes</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {recipes.length} {recipes.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <div className="flex items-center gap-3">
          {recipes.length > 0 && (
            <Suspense>
              <SortSelect value={validSort} />
            </Suspense>
          )}
          <Link
            href="/recipes/new"
            aria-label="Add recipe"
            className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <svg viewBox="0 0 24 24" width={30} height={30} fill="currentColor">
              <path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" />
            </svg>
          </Link>
        </div>
      </div>

      <RecipeGrid recipes={sorted} />
    </div>
  )
}
