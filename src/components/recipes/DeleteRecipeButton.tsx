'use client'

import { useState, useTransition } from 'react'
import { deleteRecipe } from '@/actions/recipes'
import Modal from '@/components/ui/Modal'

interface DeleteRecipeButtonProps {
  recipeId: string
  recipeName: string
}

export default function DeleteRecipeButton({ recipeId, recipeName }: DeleteRecipeButtonProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      await deleteRecipe(recipeId)
    })
  }

  return (
    <>
      <button
        onClick={(e) => { e.preventDefault(); setOpen(true) }}
        className="shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
        aria-label="Delete recipe"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>

      <Modal
        open={open}
        title="Delete recipe"
        description={`Are you sure you want to delete "${recipeName}"? This cannot be undone.`}
        confirmLabel="Delete"
        confirmVariant="danger"
        loading={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
