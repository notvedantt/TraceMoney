'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  Plus,
  Utensils,
  Pencil,
  Calendar,
  ShoppingBag,
  Car,
  ShoppingCart,
  MonitorPlay,
  Zap,
  X,
  ChevronDown
} from 'lucide-react'

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-navy mb-2">May 2026 Budgets</h1>
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider">₹42,318 OF ₹39,000 BUDGETED</span>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-navy border border-cream-border hover:border-brand hover:text-brand transition-colors px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Budget
        </button>
      </div>

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Card 1: Food */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border border-cream-border hover:border-brand/30">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-tight">Food & Dining</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Monthly allocation</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-brand transition-colors opacity-0 group-hover:opacity-100 p-1">
              <Pencil className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-navy">₹12,450</span>
              <span className="text-sm text-gray-500 font-bold">/ ₹15,000</span>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">83%</span>
          </div>
          <div className="w-full bg-cream rounded-full h-1.5 mb-3 overflow-hidden">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '83%' }}></div>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-500">
            <span>₹2,550 left</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 7 days left</span>
          </div>
        </div>

        {/* Card 2: Shopping (Over Budget) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border border-red-200 overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl tracking-wider">OVER BUDGET</div>
          <div className="flex justify-between items-start mb-6 mt-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-tight">Shopping</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Monthly allocation</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-brand transition-colors opacity-0 group-hover:opacity-100 p-1">
              <Pencil className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-red-500">₹9,760</span>
              <span className="text-sm text-gray-500 font-bold">/ ₹8,000</span>
            </div>
            <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">122%</span>
          </div>
          <div className="w-full bg-cream rounded-full h-1.5 mb-3 overflow-hidden">
            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <div className="flex justify-between text-sm font-bold text-red-500">
            <span>₹1,760 over</span>
            <span className="flex items-center gap-1 text-gray-500"><Calendar className="w-4 h-4" /> 7 days left</span>
          </div>
        </div>

        {/* Card 3: Transport */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border border-cream-border hover:border-brand/30">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-tight">Transport</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Monthly allocation</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-brand transition-colors opacity-0 group-hover:opacity-100 p-1">
              <Pencil className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-navy">₹4,200</span>
              <span className="text-sm text-gray-500 font-bold">/ ₹5,000</span>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">84%</span>
          </div>
          <div className="w-full bg-cream rounded-full h-1.5 mb-3 overflow-hidden">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-500">
            <span>₹800 left</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 7 days left</span>
          </div>
        </div>

        {/* Card 4: Groceries */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border border-cream-border hover:border-brand/30">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-tight">Groceries</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Monthly allocation</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-brand transition-colors opacity-0 group-hover:opacity-100 p-1">
              <Pencil className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-navy">₹8,500</span>
              <span className="text-sm text-gray-500 font-bold">/ ₹10,000</span>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">85%</span>
          </div>
          <div className="w-full bg-cream rounded-full h-1.5 mb-3 overflow-hidden">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-500">
            <span>₹1,500 left</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 7 days left</span>
          </div>
        </div>

        {/* Card 5: Subscriptions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border border-cream-border hover:border-brand/30">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center">
                <MonitorPlay className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-tight">Subscriptions</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Monthly allocation</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-brand transition-colors opacity-0 group-hover:opacity-100 p-1">
              <Pencil className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-navy">₹1,600</span>
              <span className="text-sm text-gray-500 font-bold">/ ₹2,000</span>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">80%</span>
          </div>
          <div className="w-full bg-cream rounded-full h-1.5 mb-3 overflow-hidden">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-500">
            <span>₹400 left</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 7 days left</span>
          </div>
        </div>

        {/* Card 6: Utilities */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group cursor-pointer border border-cream-border hover:border-brand/30">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-tight">Utilities</h3>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Monthly allocation</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-brand transition-colors opacity-0 group-hover:opacity-100 p-1">
              <Pencil className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-navy">₹2,650</span>
              <span className="text-sm text-gray-500 font-bold">/ ₹5,000</span>
            </div>
            <span className="text-xs font-bold text-brand bg-brand-light px-2 py-0.5 rounded-full">53%</span>
          </div>
          <div className="w-full bg-cream rounded-full h-1.5 mb-3 overflow-hidden">
            <div className="bg-brand h-1.5 rounded-full" style={{ width: '53%' }}></div>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-500">
            <span>₹2,350 left</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 7 days left</span>
          </div>
        </div>

        {/* Add Budget Card */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-cream-border rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] text-gray-400 hover:border-brand hover:text-brand hover:bg-cream/50 transition-all duration-300 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-4 group-hover:bg-brand-light group-hover:text-brand transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <p className="text-lg font-bold text-navy group-hover:text-brand">Create New Budget</p>
        </div>

      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-navy">Set monthly budget</h3>
              <button 
                className="text-gray-400 hover:text-navy transition-colors p-1" 
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Category</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-cream border border-transparent rounded-xl px-4 py-3 pr-10 text-navy font-bold focus:outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 transition-all">
                    <option>Select a category</option>
                    <option>Housing</option>
                    <option>Entertainment</option>
                    <option>Healthcare</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                  <input 
                    className="w-full bg-cream border border-transparent rounded-xl pl-8 pr-4 py-3 text-navy font-bold text-lg focus:outline-none focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 transition-all" 
                    placeholder="0.00" 
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Month</label>
                <input 
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-3 text-gray-500 font-bold cursor-not-allowed" 
                  readOnly 
                  type="text" 
                  value="May 2026"
                />
              </div>
              <div className="flex gap-3 pt-6 border-t border-cream-border mt-6">
                <button 
                  className="flex-1 px-4 py-3 bg-white border border-cream-border text-navy rounded-xl font-bold hover:bg-cream transition-colors" 
                  onClick={() => setIsModalOpen(false)} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 px-4 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20" 
                  type="button"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
