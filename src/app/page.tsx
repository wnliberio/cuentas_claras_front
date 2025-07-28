'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DollarSign, Brain, TrendingUp, Users } from 'lucide-react'

export default function Home() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Status bar */}
      <div className={`w-full py-2 text-center text-sm ${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        {isOnline ? '🟢 Conectado - IA Disponible' : '🔴 Sin conexión - Modo Offline'}
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-4">
            <DollarSign className="h-12 w-12 text-primary-500 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Financia AI</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Gestión financiera inteligente para parejas con IA
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="btn-primary text-lg px-8 py-3">
              Iniciar Sesión
            </Link>
            <Link href="/login" className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Crear Cuenta
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <Brain className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">IA Inteligente</h3>
            <p className="text-gray-600">
              Categorización automática, predicciones y chat financiero
            </p>
          </div>
          
          <div className="card text-center">
            <TrendingUp className="h-12 w-12 text-success-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Análisis Avanzado</h3>
            <p className="text-gray-600">
              Patrones de gasto, predicciones y recomendaciones personalizadas
            </p>
          </div>
          
          <div className="card text-center">
            <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Para Parejas</h3>
            <p className="text-gray-600">
              División inteligente de gastos y metas financieras compartidas
            </p>
          </div>
        </div>

        {/* Demo */}
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">¿Cómo funciona?</h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">1</div>
              <div>
                <h4 className="font-semibold">Registra tus gastos</h4>
                <p className="text-sm text-gray-600">Con texto natural: "$45 camiseta" o foto del recibo</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <div className="bg-success-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">2</div>
              <div>
                <h4 className="font-semibold">La IA analiza automáticamente</h4>
                <p className="text-sm text-gray-600">Categoriza, predice y sugiere mejoras</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">3</div>
              <div>
                <h4 className="font-semibold">Recibe insights personalizados</h4>
                <p className="text-sm text-gray-600">Chat financiero y recomendaciones inteligentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}