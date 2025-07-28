'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { getAuthToken } from '@/lib/auth'
import ExpenseForm from '@/components/ExpenseForm'
import ExpenseList from '@/components/ExpenseList'

export default function ExpensesPage() {
  const [showForm, setShowForm] = useState(false)
  const [refreshList, setRefreshList] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      router.push('/login')
    }
  }, [])

  const handleExpenseCreated = () => {
    setShowForm(false)
    setRefreshList(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Gastos</h1>
            </div>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? 'Cancelar' : 'Nuevo Gasto'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            {showForm ? (
              <ExpenseForm onSuccess={handleExpenseCreated} />
            ) : (
              <div className="card text-center">
                <div className="py-12">
                  <Plus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Agrega un nuevo gasto
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Registra tus gastos y deja que la IA los categorice automáticamente
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                  >
                    Comenzar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* List */}
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Tus Gastos</h2>
              <ExpenseList key={refreshList} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}