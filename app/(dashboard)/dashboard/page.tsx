import { createClient } from '@/lib/supabase/server'
import {
  TrendingUp,
  Sparkles,
  Utensils,
  ShoppingBag,
  Banknote,
  Car,
  Smartphone,
  Film,
  Pill,
  Lightbulb,
  ShoppingCart,
  Plane,
  Book,
  Send,
  Package
} from 'lucide-react'

// Helper to map category emoji to Lucide icon
function getCategoryIcon(iconStr: string, className: string = "w-5 h-5") {
  switch (iconStr) {
    case '🍔': return <Utensils className={className} />
    case '🚗': return <Car className={className} />
    case '🛍️': return <ShoppingBag className={className} />
    case '📱': return <Smartphone className={className} />
    case '🎬': return <Film className={className} />
    case '💊': return <Pill className={className} />
    case '💡': return <Lightbulb className={className} />
    case '🛒': return <ShoppingCart className={className} />
    case '✈️': return <Plane className={className} />
    case '📚': return <Book className={className} />
    case '💸': return <Send className={className} />
    default: return <Package className={className} />
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Calculate start of current month
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  // 1. Fetch all transactions for the current month to calculate totals
  const { data: currentMonthTxns } = await supabase
    .from('transactions')
    .select('amount, type, category_id, merchant, date, categories(name, color, icon)')
    .eq('user_id', user.id)
    .gte('date', startOfMonth)

  let totalSpent = 0
  let totalIncome = 0
  const categoryTotals: Record<number, { name: string, color: string, total: number }> = {}

  currentMonthTxns?.forEach(t => {
    if (t.type === 'debit') {
      totalSpent += Number(t.amount)
      
      // Calculate category breakdown
      if (t.categories) {
        if (!categoryTotals[t.category_id]) {
          categoryTotals[t.category_id] = { name: t.categories.name as string, color: t.categories.color as string, total: 0 }
        }
        categoryTotals[t.category_id].total += Number(t.amount)
      }
    } else {
      totalIncome += Number(t.amount)
    }
  })

  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalSpent) / totalIncome) * 100) : 0
  const savingsAmount = totalIncome - totalSpent

  const sortedCategories = Object.values(categoryTotals).sort((a, b) => b.total - a.total)
  const topCategory = sortedCategories.length > 0 ? sortedCategories[0] : null

  // 2. Fetch Recent Transactions
  const { data: recentTransactions } = await supabase
    .from('transactions')
    .select('id, amount, type, merchant, date, categories(name, color, icon)')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(4)

  // 3. Fetch Budgets
  const { data: budgets } = await supabase
    .from('budgets')
    .select('id, amount, category_id, categories(name, color)')
    .eq('user_id', user.id)
    .gte('month', startOfMonth)

  // 4. Fetch Insights
  const { data: insight } = await supabase
    .from('insights')
    .select('content')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const insightText = insight?.content || "You're doing great! Try to keep your food expenses under control this week."

  return (
    <>
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Spent */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Total Spent</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-navy">{formatCurrency(totalSpent)}</h3>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>This month</span>
          </div>
        </div>
        {/* Total Income */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Total Income</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-navy">{formatCurrency(totalIncome)}</h3>
          </div>
          <p className="text-gray-400 text-sm">This month</p>
        </div>
        {/* Top Category */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Top Category</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-xl font-bold text-navy">{topCategory?.name || 'None'}</h3>
          </div>
          <p className="text-brand font-medium">{topCategory ? formatCurrency(topCategory.total) : '₹0'}</p>
        </div>
        {/* Savings Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Savings Rate</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-navy">{savingsRate}%</h3>
          </div>
          <p className={savingsAmount >= 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
            {formatCurrency(savingsAmount)} saved
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (60%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Spending by Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border">
            <h3 className="text-xl font-bold text-navy mb-6">Spending by category</h3>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Donut Chart Data representation */}
              <div className="relative w-48 h-48 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="40" stroke="#F0EDE8" strokeWidth="16"></circle>
                  
                  {sortedCategories.length > 0 && (() => {
                    let currentOffset = 0;
                    const circumference = 2 * Math.PI * 40; // 251.2
                    
                    return sortedCategories.map((cat, idx) => {
                      const percentage = cat.total / totalSpent;
                      const strokeDasharray = `${percentage * circumference} ${circumference}`;
                      const strokeDashoffset = -currentOffset;
                      currentOffset += percentage * circumference;
                      
                      return (
                        <circle 
                          key={idx}
                          className="transition-all hover:stroke-[20px] cursor-pointer" 
                          cx="50" 
                          cy="50" 
                          fill="transparent" 
                          r="40" 
                          stroke={cat.color} 
                          strokeDasharray={strokeDasharray} 
                          strokeDashoffset={strokeDashoffset} 
                          strokeWidth="16"
                        />
                      )
                    })
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-sm text-gray-500 font-medium">Total</span>
                  <span className="text-xl font-bold text-navy">{totalSpent > 1000 ? `₹${(totalSpent/1000).toFixed(1)}k` : `₹${totalSpent}`}</span>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                {sortedCategories.slice(0,6).map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.color}}></div>
                    <span className="text-sm font-medium text-navy truncate" title={cat.name}>{cat.name}</span>
                    <span className="ml-auto font-medium text-sm text-gray-500">
                      {Math.round((cat.total / totalSpent) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-navy">Recent transactions</h3>
              <button className="text-brand text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {recentTransactions?.map(txn => (
                <div key={txn.id} className="flex items-center justify-between p-3 hover:bg-cream rounded-xl transition-colors cursor-pointer border-b border-cream-border last:border-0">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: txn.categories?.color as string || '#E8593C' }}
                    >
                      {getCategoryIcon(txn.categories?.icon as string || '')}
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{txn.merchant}</p>
                      <p className="text-sm text-gray-500">{txn.categories?.name} &bull; {new Date(txn.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-navy'}`}>
                    {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </span>
                </div>
              ))}
              {(!recentTransactions || recentTransactions.length === 0) && (
                <p className="text-gray-500 text-sm text-center py-4">No recent transactions.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* AI Insight Card */}
          <div className="bg-brand rounded-2xl p-6 shadow-lg shadow-brand/20 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="flex items-start gap-4 relative z-10">
              <Sparkles className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">TraceMoney Insight</h3>
                <p className="text-brand-light text-sm leading-relaxed mb-5">
                  {insightText}
                </p>
                <button className="bg-white text-brand px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-cream transition-colors shadow-sm">
                  Review Budget
                </button>
              </div>
            </div>
          </div>
          
          {/* Budget Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border">
            <h3 className="text-xl font-bold text-navy mb-6">Budget progress</h3>
            <div className="space-y-6">
              {budgets?.map(budget => {
                const catSpent = categoryTotals[budget.category_id]?.total || 0;
                const percentage = Math.round((catSpent / budget.amount) * 100);
                const isOver = percentage > 100;
                
                return (
                  <div key={budget.id}>
                    <div className="flex justify-between items-end mb-2">
                      <p className="font-semibold text-navy">{budget.categories?.name}</p>
                      <p className="text-sm text-gray-500">
                        <span className={`font-bold ${isOver ? 'text-red-500' : 'text-brand'}`}>{percentage}%</span> of {formatCurrency(budget.amount)}
                      </p>
                    </div>
                    <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all" 
                        style={{ 
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOver ? '#ef4444' : (budget.categories?.color as string || '#2563eb')
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
              {(!budgets || budgets.length === 0) && (
                <p className="text-gray-500 text-sm text-center py-4">No active budgets for this month.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
