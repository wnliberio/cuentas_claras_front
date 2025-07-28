import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react'

interface ExpenseStats {
  total_expenses: number
  category_breakdown: Record<string, number>
  monthly_average: number
}

interface StatsCardsProps {
  stats: ExpenseStats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const topCategory = Object.entries(stats.category_breakdown)
    .sort(([,a], [,b]) => b - a)[0]

  const savingsRate = stats.monthly_average > stats.total_expenses ? 
    ((stats.monthly_average - stats.total_expenses) / stats.monthly_average * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Expenses */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Gastos este mes</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.total_expenses.toFixed(2)}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Monthly Average */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Promedio mensual</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.monthly_average.toFixed(2)}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-2">
          <div className={`flex items-center text-xs ${
            stats.total_expenses <= stats.monthly_average ? 'text-green-600' : 'text-red-600'
          }`}>
            {stats.total_expenses <= stats.monthly_average ? (
              <TrendingDown className="h-3 w-3 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1" />
            )}
            {stats.total_expenses <= stats.monthly_average ? 'Por debajo' : 'Por encima'} del promedio
          </div>
        </div>
      </div>

      {/* Top Category */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Categoría principal</p>
            <p className="text-lg font-bold text-gray-900">
              {topCategory ? topCategory[0] : 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              ${topCategory ? topCategory[1].toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <PieChart className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Categories Count */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Categorías activas</p>
            <p className="text-2xl font-bold text-gray-900">
              {Object.keys(stats.category_breakdown).length}
            </p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  )
}