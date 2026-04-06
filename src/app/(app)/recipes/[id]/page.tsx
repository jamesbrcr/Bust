import { notFound } from 'next/navigation'
import { getRecipeById } from '@/lib/queries/recipes'
import { getProvenance } from '@/lib/queries/provenance'
import RecipeDetail from '@/components/recipes/RecipeDetail'
import ProvenanceFooter from '@/components/recipes/ProvenanceFooter'

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [recipe, provenance] = await Promise.all([
    getRecipeById(id),
    getProvenance(id),
  ])

  if (!recipe) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <RecipeDetail recipe={recipe} />
      <ProvenanceFooter nodes={provenance} currentRecipeId={id} />
    </div>
  )
}
