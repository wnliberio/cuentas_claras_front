'use client'

import { useEffect, useState } from 'react'
import { Calendar, Tag, Trash2 } from 'lucide-react'
import { api } from '@/lib/api'
import { DollarSign } from 'lucide-react';


interface Expense {
  id: number
  amount: number
  description: string
  category: string
  ai_categorized: boolean
  date: string
  created_at: string
}

interface ExpenseListProps {
  limit?: number
}

export default function ExpenseList({ limit }: ExpenseListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    try {
      const response = await api.get(`/expenses/?limit=${limit || 100}`)
      setExpenses(response.data)
    } catch (error) {
      console.error('Error loading expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteExpense = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este gasto?')) return

    try {
      await api.delete(`/expenses/${id}`)
      setExpenses(expenses.filter(exp => exp.id !== id))
    } catch (error) {
      console.error('Error deleting expense:', error)
      alert('Error al eliminar el gasto')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Alimentación': 'bg-green-100 text-green-800',
      'Transporte': 'bg-blue-100 text-blue-800',
      'Vivienda': 'bg-purple-100 text-purple-800',
      'Entretenimiento': 'bg-pink-100 text-pink-800',
      'Salud': 'bg-red-100 text-red-800',
      'Educación': 'bg-indigo-100 text-indigo-800',
      'Ropa': 'bg-yellow-100 text-yellow-800',
      'Tecnología': 'bg-gray-100 text-gray-800',
      'Servicios': 'bg-orange-100 text-orange-800',
      'Otros': 'bg-gray-100 text-gray-600'
    }
    return colors[category] || colors['Otros']
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No hay gastos registrados</p>
        <p className="text-sm">¡Agrega tu primer gasto!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-gray-900">{expense.description}</h3>
                {expense.ai_categorized && (
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    IA
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                    {expense.category || 'Sin categoría'}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(expense.date)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-900">
                ${expense.amount.toFixed(2)}
              </span>
              
              <button
                onClick={() => deleteExpense(expense.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Eliminar gasto"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}