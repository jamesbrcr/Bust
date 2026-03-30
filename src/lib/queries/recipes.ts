import { createClient } from '@/lib/supabase/server'
import { RecipeWithIngredients } from '@/types'
import { getSignedUrl } from './storage'

export async function getRecipesByUser(userId: string): Promise<RecipeWithIngredients[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('recipes')
    .select('*, ingredients(*), directions(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  // Refresh signed URLs server-side
  const recipes = await Promise.all(
    data.map(async (recipe) => {
      if (recipe.photo_path) {
        const url = await getSignedUrl(recipe.photo_path)
        return { ...recipe, photo_url: url }
      }
      return recipe
    })
  )

  return recipes as RecipeWithIngredients[]
}

export async function getRecipeById(id: string): Promise<RecipeWithIngredients | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('recipes')
    .select('*, ingredients(*), directions(*)')
    .eq('id', id)
    .single()

  if (error || !data) return null

  if (data.photo_path) {
    const url = await getSignedUrl(data.photo_path)
    return { ...data, photo_url: url } as RecipeWithIngredients
  }

  return data as RecipeWithIngredients
}
