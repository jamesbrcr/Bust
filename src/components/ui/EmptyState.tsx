import Link from 'next/link'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">No Recipes Yet</h2>
      <p className="text-[18px] text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
        Start building your cookbook by adding your first recipe.
      </p>
      <Link
        href="/recipes/new"
        aria-label="Add recipe"
        className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center transition-colors shadow-sm"
      >
        <svg viewBox="0 0 24 24" width={30} height={30} fill="currentColor">
          <path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" />
        </svg>
      </Link>
    </div>
  )
}
