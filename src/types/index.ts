export interface Ingredient {
  id: string
  recipe_id: string
  name: string
  measurement: string | null
  sort_order: number
}

export interface Recipe {
  id: string
  user_id: string
  name: string
  photo_url: string | null
  photo_path: string | null
  rating: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Direction {
  id: string
  recipe_id: string
  step_number: number
  instruction: string
}

export interface RecipeWithIngredients extends Recipe {
  ingredients: Ingredient[]
  directions: Direction[]
}

export interface IngredientInput {
  name: string
  measurement: string
}

export interface DirectionInput {
  instruction: string
}
