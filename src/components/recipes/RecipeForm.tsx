'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { RecipeWithIngredients } from '@/types'
import { createRecipe, updateRecipe } from '@/actions/recipes'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Label from '@/components/ui/Label'
import PhotoUpload from './PhotoUpload'
import IngredientList from './IngredientList'
import DirectionList from './DirectionList'

interface RecipeFormProps {
  initialData?: RecipeWithIngredients
}

export default function RecipeForm({ initialData }: RecipeFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [rating, setRating] = useState<number | null>(initialData?.rating ?? null)

  const isEdit = !!initialData

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
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

  const initialDirections = initialData?.directions
    .sort((a, b) => a.step_number - b.step_number)
    .map((dir) => ({ instruction: dir.instruction }))

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
        <input type="hidden" name="rating" value={rating ?? ''} />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(rating === n ? null : n)}
              className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                rating === n
                  ? 'bg-brand-500 text-white'
                  : 'bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-surface text-gray-700 dark:text-gray-200 hover:border-brand-500 hover:text-brand-500'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Ingredients</Label>
        <IngredientList initialIngredients={initialIngredients} />
      </div>

      <div>
        <Label>Directions</Label>
        <DirectionList initialDirections={initialDirections} />
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
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>
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
