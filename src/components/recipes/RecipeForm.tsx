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

interface RecipeFormProps {
  initialData?: RecipeWithIngredients
}

export default function RecipeForm({ initialData }: RecipeFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

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
        <Label htmlFor="rating">Rating</Label>
        <select
          id="rating"
          name="rating"
          defaultValue={initialData?.rating ?? ''}
          className="rounded-lg border border-gray-300 dark:border-dark-surface bg-white dark:bg-dark-surface px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="">No rating</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} / 10</option>
          ))}
        </select>
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
