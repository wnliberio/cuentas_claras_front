export interface User {
  id: number
  email: string
  full_name: string
  is_active: boolean
  subscription_tier: string
  created_at: string
}

export interface Expense {
  id: number
  user_id: number
  amount: number
  description: string
  category: string
  ai_categorized: boolean
  date: string
  created_at: string
}

export interface ExpenseStats {
  total_expenses: number
  category_breakdown: Record<string, number>
  monthly_average: number
}