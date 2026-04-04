import { createClient } from '@/lib/supabase/server'

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
