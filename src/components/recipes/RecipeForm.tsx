'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { RecipeWithIngredients } from '@/types'
import { createRecipe, updateRecipe } from '@/actions/recipes'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Label from '@/components/ui/Label'
import StarRating from './StarRating'
import PhotoUpload from './PhotoUpload'
import IngredientList from './IngredientList'

interface RecipeFormProps {
  initialData?: RecipeWithIngredients
}

export default function RecipeForm({ initialData }: RecipeFormProps) {
  const router = useRouter()
  const [rating, setRating] = useState<number | null>(initialData?.rating ?? null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const isEdit = !!initialData

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    if (rating !== null) formData.set('rating', String(rating))
    if (isEdit) formData.set('id', initialData.id)

    startTransition(async () => {
      const action = isEdit ? updateRecipe : createRecipe
      const result = await action(formData)
      if (result?.error) setError(result.error)
    })
  }

  const initialIngredients = initialData?.ingredients.map((ing) => ({
    name: ing.name,
    measurement: ing.measurement ?? '',
  }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <Label htmlFor="name">Recipe name *</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="e.g. Pasta al Pomodoro"
          defaultValue={initialData?.name ?? ''}
        />
      </div>

      <div>
        <Label>Photo</Label>
        <PhotoUpload existingUrl={initialData?.photo_url} />
      </div>

      <div>
        <Label>Rating</Label>
        <StarRating value={rating} onChange={setRating} />
        <p className="text-xs text-gray-400 mt-1">Click a star to rate 1–10</p>
      </div>

      <div>
        <Label>Ingredients</Label>
        <IngredientList initialIngredients={initialIngredients} />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="How did it turn out? Any tweaks you'd make next time?"
          defaultValue={initialData?.notes ?? ''}
          rows={4}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isPending}>
          {isEdit ? 'Save changes' : 'Add recipe'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
