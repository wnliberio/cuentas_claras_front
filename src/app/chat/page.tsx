'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { getAuthToken } from '@/lib/auth'
import AIChat from '@/components/AIChat'

export default function ChatPage() {
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      router.push('/login')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center">
                <MessageCircle className="h-6 w-6 text-purple-500 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">Chat Financiero IA</h1>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Asistente inteligente
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full bg-white shadow-sm">
        <AIChat />
      </div>
    </div>
  )
}