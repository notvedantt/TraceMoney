import {
  TrendingUp,
  Restaurant,
  ShoppingBag,
  Payments,
  Sparkles
} from 'lucide-react'

// Map material symbols to Lucide roughly:
// restaurant -> Utensils
// shopping_bag -> ShoppingBag
// payments -> IndianRupee or Banknote
// spark -> Sparkles

import { Utensils, Banknote } from 'lucide-react'

export default function DashboardPage() {
  return (
    <>
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Spent */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Total Spent</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-navy">₹42,318</h3>
          </div>
          <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>12% from last month</span>
          </div>
        </div>
        {/* Total Income */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Total Income</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-navy">₹70,000</h3>
          </div>
          <p className="text-gray-400 text-sm">Received May 1</p>
        </div>
        {/* Top Category */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Top Category</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-xl font-bold text-navy">Food & Dining</h3>
          </div>
          <p className="text-brand font-medium">₹12,450</p>
        </div>
        {/* Savings Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-border hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Savings Rate</p>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-navy">39%</h3>
          </div>
          <p className="text-green-600 font-medium">₹27,682 saved</p>
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
              {/* Donut Chart Placeholder */}
              <div className="relative w-48 h-48 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="40" stroke="#F0EDE8" strokeWidth="16"></circle>
                  {/* Food & Dining 29% */}
                  <circle className="transition-all hover:stroke-[20px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="#2563eb" strokeDasharray="72.8 251.2" strokeDashoffset="0" strokeWidth="16"></circle>
                  {/* Shopping 23% */}
                  <circle className="transition-all hover:stroke-[20px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="#E8593C" strokeDasharray="57.8 251.2" strokeDashoffset="-72.8" strokeWidth="16"></circle>
                  {/* Transport 15% */}
                  <circle className="transition-all hover:stroke-[20px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="#15803D" strokeDasharray="37.6 251.2" strokeDashoffset="-130.6" strokeWidth="16"></circle>
                  {/* Bills 33% */}
                  <circle className="transition-all hover:stroke-[20px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="#D97706" strokeDasharray="83 251.2" strokeDashoffset="-168.2" strokeWidth="16"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-sm text-gray-500 font-medium">Total</span>
                  <span className="text-xl font-bold text-navy">₹42.3k</span>
                </div>
              </div>
              {/* Legend */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand"></div>
                  <span className="text-sm font-medium text-navy">Food & Dining</span>
                  <span className="ml-auto font-medium text-sm text-gray-500">29%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#E8593C'}}></div>
                  <span className="text-sm font-medium text-navy">Shopping</span>
                  <span className="ml-auto font-medium text-sm text-gray-500">23%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#15803D'}}></div>
                  <span className="text-sm font-medium text-navy">Transport</span>
                  <span className="ml-auto font-medium text-sm text-gray-500">15%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#D97706'}}></div>
                  <span className="text-sm font-medium text-navy">Bills & Utils</span>
                  <span className="ml-auto font-medium text-sm text-gray-500">33%</span>
                </div>
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
              {/* Transaction Rows */}
              <div className="flex items-center justify-between p-3 hover:bg-cream rounded-xl transition-colors cursor-pointer border-b border-cream-border last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Swiggy</p>
                    <p className="text-sm text-gray-500">Food & Dining • Today</p>
                  </div>
                </div>
                <span className="font-bold text-navy">-₹850</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-cream rounded-xl transition-colors cursor-pointer border-b border-cream-border last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Amazon</p>
                    <p className="text-sm text-gray-500">Shopping • Yesterday</p>
                  </div>
                </div>
                <span className="font-bold text-navy">-₹2,499</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-cream rounded-xl transition-colors cursor-pointer border-b border-cream-border last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Salary</p>
                    <p className="text-sm text-gray-500">Income • May 1</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">+₹70,000</span>
              </div>
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
                <h3 className="text-lg font-bold mb-2">Spendr Insight</h3>
                <p className="text-brand-light text-sm leading-relaxed mb-5">
                  You've spent 40% more on Food & Dining this month compared to your usual average. Consider reviewing your active subscriptions to offset this, as you have 2 unused services this month.
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
              <div>
                <div className="flex justify-between items-end mb-2">
                  <p className="font-semibold text-navy">Food & Dining</p>
                  <p className="text-sm text-gray-500"><span className="text-brand font-bold">83%</span> of ₹15,000</p>
                </div>
                <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <p className="font-semibold text-navy">Shopping</p>
                  <p className="text-sm text-gray-500"><span className="text-red-500 font-bold">105%</span> of ₹8,000</p>
                </div>
                <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <p className="font-semibold text-navy">Transport</p>
                  <p className="text-sm text-gray-500"><span className="text-green-600 font-bold">84%</span> of ₹5,000</p>
                </div>
                <div className="w-full h-2.5 bg-cream rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
