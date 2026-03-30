'use server'

import { createClient } from '@/lib/supabase/server'
import { uploadPhoto, deletePhoto } from '@/lib/queries/storage'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function parseIngredients(formData: FormData) {
  const names = formData.getAll('ingredient_name') as string[]
  const measurements = formData.getAll('ingredient_measurement') as string[]
  return names
    .map((name, i) => ({ name: name.trim(), measurement: measurements[i]?.trim() ?? '' }))
    .filter((ing) => ing.name.length > 0)
}

function parseDirections(formData: FormData) {
  const instructions = formData.getAll('direction_instruction') as string[]
  return instructions
    .map((instruction) => instruction.trim())
    .filter((instruction) => instruction.length > 0)
}

export async function createRecipe(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const name = (formData.get('name') as string)?.trim()
  if (!name) return { error: 'Recipe name is required.' }

  const ratingRaw = formData.get('rating') as string
  const rating = ratingRaw ? parseInt(ratingRaw, 10) : null
  if (rating !== null && (rating < 1 || rating > 10)) return { error: 'Rating must be 1–10.' }

  const notes = (formData.get('notes') as string)?.trim() || null

  // Insert recipe row first to get the ID
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .insert({ user_id: user.id, name, rating, notes })
    .select()
    .single()

  if (recipeError || !recipe) return { error: recipeError?.message ?? 'Failed to create recipe.' }

  // Upload photo if provided
  const photoFile = formData.get('photo') as File | null
  if (photoFile && photoFile.size > 0) {
    const result = await uploadPhoto(user.id, recipe.id, photoFile)
    if (result) {
      await supabase
        .from('recipes')
        .update({ photo_path: result.path, photo_url: result.url })
        .eq('id', recipe.id)
    }
  }

  // Insert ingredients
  const ingredients = parseIngredients(formData)
  if (ingredients.length > 0) {
    await supabase.from('ingredients').insert(
      ingredients.map((ing, i) => ({
        recipe_id: recipe.id,
        name: ing.name,
        measurement: ing.measurement || null,
        sort_order: i,
      }))
    )
  }

  // Insert directions
  const directions = parseDirections(formData)
  if (directions.length > 0) {
    await supabase.from('directions').insert(
      directions.map((instruction, i) => ({
        recipe_id: recipe.id,
        step_number: i + 1,
        instruction,
      }))
    )
  }

  revalidatePath('/dashboard')
  redirect(`/recipes/${recipe.id}`)
}

export async function updateRecipe(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const id = formData.get('id') as string
  if (!id) return { error: 'Recipe ID missing.' }

  const name = (formData.get('name') as string)?.trim()
  if (!name) return { error: 'Recipe name is required.' }

  const ratingRaw = formData.get('rating') as string
  const rating = ratingRaw ? parseInt(ratingRaw, 10) : null

  const notes = (formData.get('notes') as string)?.trim() || null

  // Fetch existing to check ownership and get photo_path
  const { data: existing } = await supabase
    .from('recipes')
    .select('user_id, photo_path')
    .eq('id', id)
    .single()

  if (!existing || existing.user_id !== user.id) return { error: 'Not authorized.' }

  let photo_path = existing.photo_path
  let photo_url: string | null = null

  const photoFile = formData.get('photo') as File | null
  if (photoFile && photoFile.size > 0) {
    if (photo_path) await deletePhoto(photo_path)
    const result = await uploadPhoto(user.id, id, photoFile)
    if (result) {
      photo_path = result.path
      photo_url = result.url
    }
  }

  const updatePayload: Record<string, unknown> = { name, rating, notes, photo_path }
  if (photo_url) updatePayload.photo_url = photo_url

  const { error: updateError } = await supabase
    .from('recipes')
    .update(updatePayload)
    .eq('id', id)

  if (updateError) return { error: updateError.message }

  // Delete-and-reinsert ingredients
  await supabase.from('ingredients').delete().eq('recipe_id', id)

  const ingredients = parseIngredients(formData)
  if (ingredients.length > 0) {
    await supabase.from('ingredients').insert(
      ingredients.map((ing, i) => ({
        recipe_id: id,
        name: ing.name,
        measurement: ing.measurement || null,
        sort_order: i,
      }))
    )
  }

  // Delete-and-reinsert directions
  await supabase.from('directions').delete().eq('recipe_id', id)

  const directions = parseDirections(formData)
  if (directions.length > 0) {
    await supabase.from('directions').insert(
      directions.map((instruction, i) => ({
        recipe_id: id,
        step_number: i + 1,
        instruction,
      }))
    )
  }

  revalidatePath('/dashboard')
  revalidatePath(`/recipes/${id}`)
  redirect(`/recipes/${id}`)
}

export async function deleteRecipe(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: recipe } = await supabase
    .from('recipes')
    .select('user_id, photo_path')
    .eq('id', id)
    .single()

  if (!recipe || recipe.user_id !== user.id) return { error: 'Not authorized.' }

  if (recipe.photo_path) await deletePhoto(recipe.photo_path)

  await supabase.from('recipes').delete().eq('id', id)

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
