'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBookmark(recipeId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('bookmarks')
    .insert({ user_id: user.id, recipe_id: recipeId })

  // 23505 = unique violation (already bookmarked) — treat as success
  if (error && error.code !== '23505') return { error: error.message }

  revalidatePath(`/shared/${recipeId}`)
  return {}
}

export async function removeBookmark(recipeId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('recipe_id', recipeId)

  if (error) return { error: error.message }

  revalidatePath(`/shared/${recipeId}`)
  return {}
}
