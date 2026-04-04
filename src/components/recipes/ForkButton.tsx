'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { forkRecipe } from '@/actions/recipes'

interface ForkButtonProps {
  recipeId: string
  existingForkId: string | null
}

export default function ForkButton({ recipeId, existingForkId }: ForkButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [forkId, setForkId] = useState(existingForkId)

  if (forkId) {
    return (
      <button
        onClick={() => router.push(`/recipes/${forkId}`)}
        className="text-sm text-brand-500 hover:underline font-medium"
      >
        View your copy →
      </button>
    )
  }

  async function handleFork() {
    setLoading(true)
    const result = await forkRecipe(recipeId)
    if (result.newId) {
      setForkId(result.newId)
      router.push(`/recipes/${result.newId}`)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleFork}
      disabled={loading}
      className="text-sm border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white font-medium px-4 py-1.5 rounded-full transition-colors disabled:opacity-50"
    >
      {loading ? 'Saving…' : 'Save a copy to my recipes'}
    </button>
  )
}
