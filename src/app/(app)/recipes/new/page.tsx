import RecipeForm from '@/components/recipes/RecipeForm'
import Link from 'next/link'

export default function NewRecipePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
          ← Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add a recipe</h1>
      </div>
      <RecipeForm />
    </div>
  )
}
