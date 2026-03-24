import Link from 'next/link'
import Button from './Button'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4">🍳</div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No recipes yet</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
        Start building your cookbook by adding your first recipe.
      </p>
      <Link href="/recipes/new">
        <Button>Add your first recipe</Button>
      </Link>
    </div>
  )
}
