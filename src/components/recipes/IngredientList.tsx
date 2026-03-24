'use client'

import { useState } from 'react'
import { IngredientInput } from '@/types'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface IngredientListProps {
  initialIngredients?: IngredientInput[]
}

export default function IngredientList({ initialIngredients }: IngredientListProps) {
  const [ingredients, setIngredients] = useState<IngredientInput[]>(
    initialIngredients && initialIngredients.length > 0
      ? initialIngredients
      : [{ name: '', measurement: '' }]
  )

  function add() {
    setIngredients((prev) => [...prev, { name: '', measurement: '' }])
  }

  function remove(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index))
  }

  function update(index: number, field: keyof IngredientInput, value: string) {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    )
  }

  return (
    <div className="space-y-2">
      {ingredients.map((ing, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input
            name="ingredient_name"
            placeholder="Ingredient"
            value={ing.name}
            onChange={(e) => update(i, 'name', e.target.value)}
            className="flex-1"
          />
          <Input
            name="ingredient_measurement"
            placeholder="Amount (e.g. 2 cups)"
            value={ing.measurement}
            onChange={(e) => update(i, 'measurement', e.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={ingredients.length === 1}
            className="shrink-0 p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
            aria-label="Remove ingredient"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add}>
        + Add ingredient
      </Button>
    </div>
  )
}
