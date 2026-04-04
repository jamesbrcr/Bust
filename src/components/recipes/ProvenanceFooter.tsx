'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ProvenanceNode, DiffResult } from '@/lib/queries/provenance'

function DiffList({ diff }: { diff: DiffResult }) {
  return (
    <ul className="mt-1.5 ml-3 space-y-0.5 border-l border-gray-200 pl-3">
      {diff.added.map((line, i) => (
        <li key={`a${i}`} className="text-xs text-green-600">+ {line}</li>
      ))}
      {diff.removed.map((line, i) => (
        <li key={`r${i}`} className="text-xs text-red-500">− {line}</li>
      ))}
      {diff.changed.map((line, i) => (
        <li key={`c${i}`} className="text-xs text-amber-600">~ {line}</li>
      ))}
    </ul>
  )
}

export default function ProvenanceFooter({
  nodes,
  currentRecipeId,
}: {
  nodes: ProvenanceNode[]
  currentRecipeId: string
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({})

  if (nodes.length === 0) return null

  const root = nodes[0]
  const forks = nodes.slice(1)

  function toggle(id: string) {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="border-t border-gray-200 dark:border-dark-surface pt-8 mt-4">
      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
        Recipe lineage
      </h2>

      {/* Root */}
      <div className="flex items-center gap-1.5 text-sm mb-4">
        <span className="text-gray-500 dark:text-gray-400">Original recipe by</span>
        <Link
          href={`/shared/${root.recipeId}`}
          className="font-medium text-brand-500 hover:underline"
        >
          @{root.username ?? 'unknown'}
        </Link>
        {root.recipeId === currentRecipeId && (
          <span className="text-xs text-gray-400 dark:text-gray-500">— this recipe</span>
        )}
      </div>

      {/* Fork chain */}
      {forks.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Also made by:</p>
          <div className="space-y-3 ml-2">
            {forks.map((node) => {
              const isCurrent = node.recipeId === currentRecipeId
              const isOpen = !!open[node.recipeId]
              const hasChanges = node.diff && (
                node.diff.added.length > 0 ||
                node.diff.removed.length > 0 ||
                node.diff.changed.length > 0
              )

              return (
                <div key={node.recipeId}>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/shared/${node.recipeId}`}
                      className="text-sm font-medium text-brand-500 hover:underline"
                    >
                      @{node.username ?? 'unknown'}
                    </Link>

                    {isCurrent && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">— this recipe</span>
                    )}

                    {node.diff && hasChanges && (
                      <button
                        onClick={() => toggle(node.recipeId)}
                        className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-0.5"
                        aria-label={isOpen ? 'Hide changes' : 'Show changes'}
                      >
                        {isOpen ? '▴ hide changes' : '▾ show changes'}
                      </button>
                    )}

                    {node.diff && !hasChanges && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">no changes</span>
                    )}
                  </div>

                  {isOpen && node.diff && hasChanges && (
                    <DiffList diff={node.diff} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
