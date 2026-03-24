import { notFound } from 'next/navigation'
import { getRecipeById } from '@/lib/queries/recipes'
import RecipeForm from '@/components/recipes/RecipeForm'
import Link from 'next/link'

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recipe = await getRecipeById(id)
  if (!recipe) notFound()

  return (
    <div>
      <div className="mb-6">
        <Link href={`/recipes/${id}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          ← Back to recipe
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit recipe</h1>
      </div>
      <RecipeForm initialData={recipe} />
    </div>
  )
}
