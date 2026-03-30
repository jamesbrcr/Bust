'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const identifier = (formData.get('email') as string).trim()
  const password = formData.get('password') as string

  let email = identifier

  // If no @ treat as username — look up the associated email via DB function
  if (!identifier.includes('@')) {
    const { data, error } = await supabase.rpc('get_email_by_username', { p_username: identifier })
    if (error || !data) return { error: 'No account found with that username.' }
    email = data
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = (formData.get('email') as string).trim()
  const password = formData.get('password') as string
  const username = (formData.get('username') as string).trim().toLowerCase()

  if (!username) return { error: 'Username is required.' }
  if (!/^[a-z0-9_]{3,20}$/.test(username)) {
    return { error: 'Username must be 3–20 characters: letters, numbers, or underscores only.' }
  }

  // Check uniqueness before creating the auth user
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle()

  if (existing) return { error: 'That username is already taken.' }

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error || !data.user) return { error: error?.message ?? 'Sign up failed.' }

  await supabase.from('profiles').insert({ id: data.user.id, username })

  redirect('/confirm-email')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
