import { createClient } from '@/lib/supabase/server'
import { getRecipesByUser } from '@/lib/queries/recipes'
import RecipeGrid from '@/components/recipes/RecipeGrid'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const recipes = await getRecipesByUser(user.id)

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
      <RecipeGrid recipes={recipes} />
    </div>
  )
}
