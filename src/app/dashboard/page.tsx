'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, MessageCircle, TrendingUp, DollarSign, CreditCard, Target } from 'lucide-react'
import { api } from '@/lib/api'
import { getAuthToken } from '@/lib/auth'
import StatsCards from '@/components/StatsCards'
import ExpenseList from '@/components/ExpenseList'

interface User {
  id: number
  email: string
  full_name: string
  subscription_tier: string
}

interface ExpenseStats {
  total_expenses: number
  category_breakdown: Record<string, number>
  monthly_average: number
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<ExpenseStats | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      router.push('/login')
      return
    }

    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [userResponse, statsResponse] = await Promise.all([
        api.get('/auth/me'),
        api.get('/expenses/stats')
      ])

      setUser(userResponse.data)
      setStats(statsResponse.data)
    } catch (error) {
      console.error('Error loading dashboard:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Bienvenido, {user?.full_name || user?.email}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Link
                href="/expenses"
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Gasto
              </Link>
              
              <Link
                href="/chat"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat AI
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && <StatsCards stats={stats} />}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/expenses" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Gestionar Gastos</h3>
                <p className="text-sm text-gray-600">Agregar y ver gastos</p>
              </div>
            </div>
          </Link>

          <Link href="/chat" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Chat Financiero</h3>
                <p className="text-sm text-gray-600">Pregunta a la IA</p>
              </div>
            </div>
          </Link>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Metas</h3>
                <p className="text-sm text-gray-600">Próximamente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Gastos Recientes</h2>
            <Link 
              href="/expenses"
              className="text-primary-500 hover:text-primary-600"
            >
              Ver todos
            </Link>
          </div>
          <ExpenseList limit={5} />
        </div>
      </main>
    </div>
  )
}