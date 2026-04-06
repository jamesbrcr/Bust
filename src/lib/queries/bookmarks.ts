import { createClient } from '@/lib/supabase/server'
import { getSignedUrl } from './storage'
import { RecipeWithIngredients } from '@/types'

export async function getIsBookmarked(recipeId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('recipe_id', recipeId)
    .maybeSingle()

  return !!data
}

export type BookmarkedRecipe = RecipeWithIngredients & {
  ownerUsername: string | null
  bookmarkedAt: string
}

export async function getBookmarkedRecipes(): Promise<BookmarkedRecipe[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('bookmarks')
    .select('created_at, recipes(*, ingredients(*), directions(*))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  const results = await Promise.all(
    data.map(async (row) => {
      const recipe = row.recipes as unknown as RecipeWithIngredients
      if (!recipe) return null

      let photo_url = recipe.photo_url
      if (recipe.photo_path) {
        photo_url = await getSignedUrl(recipe.photo_path)
      }

      const { data: username } = await supabase.rpc('get_username_by_user_id', {
        p_user_id: recipe.user_id,
      })

      return {
        ...recipe,
        photo_url,
        ownerUsername: username ?? null,
        bookmarkedAt: row.created_at,
      } as BookmarkedRecipe
    })
  )

  return results.filter(Boolean) as BookmarkedRecipe[]
}
