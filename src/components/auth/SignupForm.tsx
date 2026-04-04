'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signUp } from '@/actions/auth'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'

export default function SignupForm({ redirectTo }: { redirectTo?: string }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const result = await signUp(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="e.g. master_chef"
          minLength={3}
          maxLength={20}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
          minLength={6}
        />
      </div>
      <div>
        <Label htmlFor="confirm">Confirm password</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>
      )}

      <Button type="submit" className="w-full" loading={loading}>
        Create account
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-brand-500 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </form>
  )
}
