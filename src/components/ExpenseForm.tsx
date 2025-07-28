'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, Tag, Calendar, Brain } from 'lucide-react'
import { api } from '@/lib/api'

interface ExpenseFormProps {
  onSuccess?: () => void
}

export default function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: ''
  })
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState<any>(null)
  const router = useRouter()

  const categories = [
    'Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento',
    'Salud', 'Educación', 'Ropa', 'Tecnología', 'Servicios', 'Otros'
  ]

  const handleAIAnalysis = async () => {
    if (!formData.description || !formData.amount) {
      alert('Ingresa descripción y monto para análisis IA')
      return
    }

    setAiLoading(true)
    try {
      const response = await api.post('/ai/categorize', {
        description: formData.description,
        amount: parseFloat(formData.amount)
      })
      
      setAiSuggestion(response.data)
      setFormData({ ...formData, category: response.data.category })
    } catch (error) {
      console.error('Error AI analysis:', error)
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/expenses/', {
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category || undefined
      })

      setFormData({ amount: '', description: '', category: '' })
      setAiSuggestion(null)
      
      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error creating expense:', error)
      alert('Error al crear el gasto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <DollarSign className="h-6 w-6 mr-2 text-primary-500" />
        Nuevo Gasto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monto
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="input pl-10"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input"
              placeholder="Ej: Almuerzo en restaurante, Gasolina, Camiseta..."
              required
            />
            
            {/* AI Analysis Button */}
            <button
              type="button"
              onClick={handleAIAnalysis}
              disabled={aiLoading || !formData.description || !formData.amount}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <Brain className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {aiSuggestion && (
            <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>IA sugiere:</strong> {aiSuggestion.category} 
                {aiSuggestion.confidence && (
                  <span className="ml-2 text-xs">({Math.round(aiSuggestion.confidence * 100)}% confianza)</span>
                )}
              </p>
              {aiSuggestion.subcategory && (
                <p className="text-xs text-purple-600 mt-1">
                  Subcategoría: {aiSuggestion.subcategory}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input pl-10"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Si no seleccionas, la IA categorizará automáticamente
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Guardando...
            </div>
          ) : (
            'Guardar Gasto'
          )}
        </button>
      </form>
    </div>
  )
}