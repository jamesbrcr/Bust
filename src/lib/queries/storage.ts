import { createClient } from '@/lib/supabase/server'

const BUCKET = 'recipe-photos'

export async function uploadPhoto(
  userId: string,
  recipeId: string,
  file: File
): Promise<{ path: string; url: string } | null> {
  const supabase = await createClient()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${userId}/${recipeId}/${Date.now()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type,
  })

  if (error) {
    console.error('Photo upload error:', error.message)
    return null
  }

  const { data } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600)

  return data ? { path, url: data.signedUrl } : null
}

export async function deletePhoto(path: string) {
  const supabase = await createClient()
  await supabase.storage.from(BUCKET).remove([path])
}

export async function getSignedUrl(path: string): Promise<string | null> {
  const supabase = await createClient()
  const { data } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600)
  return data?.signedUrl ?? null
}
