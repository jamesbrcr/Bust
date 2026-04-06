import { createClient } from '@/lib/supabase/server'
import { Ingredient, Direction } from '@/types'

interface RecipeSnapshot {
  id: string
  user_id: string
  name: string
  notes: string | null
  parent_recipe_id: string | null
  ingredients: Ingredient[]
  directions: Direction[]
}

export interface DiffResult {
  added: string[]
  removed: string[]
  changed: string[]
}

export interface ProvenanceNode {
  recipeId: string
  username: string | null
  diff: DiffResult | null  // null for root
}

function truncate(s: string, max = 60) {
  return s.length > max ? s.slice(0, max) + '…' : s
}

function computeDiff(parent: RecipeSnapshot, child: RecipeSnapshot): DiffResult {
  const added: string[] = []
  const removed: string[] = []
  const changed: string[] = []

  // Name
  if (parent.name !== child.name) {
    changed.push(`Renamed: "${parent.name}" → "${child.name}"`)
  }

  // Notes
  const pNotes = parent.notes?.trim() ?? ''
  const cNotes = child.notes?.trim() ?? ''
  if (pNotes !== cNotes) {
    if (!pNotes && cNotes) added.push('Added notes')
    else if (pNotes && !cNotes) removed.push('Removed notes')
    else changed.push('Updated notes')
  }

  // Ingredients — match by lowercased name
  const parentIngs = new Map(parent.ingredients.map(i => [i.name.toLowerCase(), i]))
  const childIngs = new Map(child.ingredients.map(i => [i.name.toLowerCase(), i]))

  for (const [key, ing] of childIngs) {
    if (!parentIngs.has(key)) {
      added.push(`Added "${ing.name}"${ing.measurement ? ` (${ing.measurement})` : ''}`)
    } else {
      const p = parentIngs.get(key)!
      if ((p.measurement ?? '') !== (ing.measurement ?? '')) {
        changed.push(`"${ing.name}": ${p.measurement || 'no amount'} → ${ing.measurement || 'no amount'}`)
      }
    }
  }
  for (const [key, ing] of parentIngs) {
    if (!childIngs.has(key)) {
      removed.push(`Removed "${ing.name}"`)
    }
  }

  // Directions — compare by content so moved steps don't appear as edits
  const parentInstructions = new Set(parent.directions.map(d => d.instruction))
  const childInstructions = new Set(child.directions.map(d => d.instruction))

  for (const dir of [...child.directions].sort((a, b) => a.step_number - b.step_number)) {
    if (!parentInstructions.has(dir.instruction)) {
      added.push(`Added step ${dir.step_number}: "${truncate(dir.instruction)}"`)
    }
  }
  for (const dir of [...parent.directions].sort((a, b) => a.step_number - b.step_number)) {
    if (!childInstructions.has(dir.instruction)) {
      removed.push(`Removed step ${dir.step_number}: "${truncate(dir.instruction)}"`)
    }
  }

  return { added, removed, changed }
}

export async function getProvenance(recipeId: string): Promise<ProvenanceNode[]> {
  const supabase = await createClient()

  // Walk up the parent chain to collect all ancestor IDs (root first)
  const chainIds: string[] = []
  let currentId: string | null = recipeId

  while (currentId && chainIds.length < 20) {
    if (chainIds.includes(currentId)) break // cycle guard
    chainIds.unshift(currentId)

    const { data: row } = await supabase
      .from('recipes')
      .select('parent_recipe_id')
      .eq('id', currentId)
      .single()

    currentId = (row as { parent_recipe_id: string | null } | null)?.parent_recipe_id ?? null
  }

  if (chainIds.length === 0) return []

  // Batch-fetch all recipes in the chain
  const { data: recipes } = await supabase
    .from('recipes')
    .select('id, user_id, name, notes, parent_recipe_id, ingredients(*), directions(*)')
    .in('id', chainIds)

  if (!recipes || recipes.length === 0) return []

  // Re-order to match chain (query results may be unordered)
  const recipeMap = new Map(recipes.map(r => [r.id, r as RecipeSnapshot]))
  const ordered = chainIds.map(id => recipeMap.get(id)).filter(Boolean) as RecipeSnapshot[]

  // Fetch usernames in parallel
  const usernames = await Promise.all(
    ordered.map(r =>
      supabase
        .rpc('get_username_by_user_id', { p_user_id: r.user_id })
        .then(({ data }) => (data as string | null) ?? null)
    )
  )

  // Build nodes with diffs between consecutive pairs
  return ordered.map((recipe, i) => ({
    recipeId: recipe.id,
    username: usernames[i],
    diff: i === 0 ? null : computeDiff(ordered[i - 1], recipe),
  }))
}
