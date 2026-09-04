'use client'

import { useState, useMemo, useTransition } from 'react'
import {
  Download,
  Search,
  ChevronDown,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Plus,
  Receipt,
  Loader2,
  Utensils,
  Car,
  ShoppingBag,
  Home,
  MonitorPlay,
  HeartPulse,
  Zap,
  Coffee,
  Wallet,
  PiggyBank,
  TrendingUp,
  CircleDollarSign
} from 'lucide-react'
import { updateTransaction } from '@/app/actions/transactions'

// Helper to map category icon strings to actual Lucide components
function getCategoryIcon(iconStr: string, className: string = "w-4 h-4") {
  switch (iconStr) {
    case 'burger': return <Utensils className={className} />
    case 'car': return <Car className={className} />
    case 'shopping-bag': return <ShoppingBag className={className} />
    case 'home': return <Home className={className} />
    case 'tv': return <MonitorPlay className={className} />
    case 'heart-pulse': return <HeartPulse className={className} />
    case 'zap': return <Zap className={className} />
    case 'coffee': return <Coffee className={className} />
    case 'wallet': return <Wallet className={className} />
    case 'piggy-bank': return <PiggyBank className={className} />
    case 'trending-up': return <TrendingUp className={className} />
    case 'dollar-sign': return <CircleDollarSign className={className} />
    default: return <CircleDollarSign className={className} />
  }
}

export default function TransactionDataTable({ transactions, categories }: { transactions: any[], categories: any[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [editCategoryId, setEditCategoryId] = useState<number | null>(null)
  const [editNote, setEditNote] = useState('')
  const [isPending, startTransition] = useTransition()
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Type Filter
      if (filterType && t.type !== filterType) return false
      
      // Category Filter
      if (filterCategory && t.category_id !== Number(filterCategory)) return false
      
      // Search Filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const merchantMatch = t.merchant?.toLowerCase().includes(searchLower)
        const categoryMatch = t.categories?.name?.toLowerCase().includes(searchLower)
        if (!merchantMatch && !categoryMatch) return false
      }
      
      return true
    })
  }, [transactions, searchQuery, filterCategory, filterType])

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const openDrawer = (t: any) => {
    setSelectedTransaction(t)
    setEditCategoryId(t.category_id)
    setEditNote(t.note || '')
    setSaveSuccess(false)
    setIsDrawerOpen(true)
  }

  const handleSave = () => {
    if (!selectedTransaction) return
    startTransition(async () => {
      const result = await updateTransaction(selectedTransaction.id, editCategoryId, editNote)
      if (result.success) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 2000)
        // Update local state optimistically
        const updatedCategory = categories.find(c => c.id === editCategoryId)
        setSelectedTransaction((prev: any) => ({
          ...prev,
          category_id: editCategoryId,
          note: editNote,
          categories: updatedCategory
        }))
      }
    })
  }

  return (
    <>
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#091c32]">Transactions</h1>
          <p className="text-[#434655] mt-1 text-[15px]">Manage and categorize your recent activity.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#c3c6d7] text-[#091c32] rounded-lg font-medium hover:bg-[#f3f3fe] transition-colors shadow-sm text-[14px]">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Sticky Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-[0_1px_6px_rgba(15,33,55,0.07)] border border-[#e1e2ed] flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-[#F8F5F0] rounded-lg border border-transparent focus:bg-white focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 outline-none transition-all placeholder:text-[#737686] text-[#091c32] font-medium text-[15px]" 
              placeholder="Search merchants, categories..." 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          {/* Dropdowns */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                className="appearance-none pl-3 pr-8 py-2 bg-white border border-[#c3c6d7] rounded-lg text-[#091c32] hover:bg-[#f3f3fe] focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 outline-none transition-colors font-medium text-[14px] cursor-pointer"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#737686] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select 
                className="appearance-none pl-3 pr-8 py-2 bg-white border border-[#c3c6d7] rounded-lg text-[#091c32] hover:bg-[#f3f3fe] focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 outline-none transition-colors font-medium text-[14px] cursor-pointer"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="">All Types</option>
                <option value="debit">Expense</option>
                <option value="credit">Income</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#737686] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Table Card */}
      <div className="bg-white rounded-xl shadow-[0_1px_6px_rgba(15,33,55,0.07)] border border-[#e1e2ed] overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e1e2ed] bg-[#f8f9fa]">
                <th className="py-3.5 px-6 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.05em]">Date</th>
                <th className="py-3.5 px-6 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.05em]">Merchant</th>
                <th className="py-3.5 px-6 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.05em]">Category</th>
                <th className="py-3.5 px-6 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.05em]">Source</th>
                <th className="py-3.5 px-6 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.05em] text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#737686] text-[15px]">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map(t => {
                  const amountClass = t.type === 'debit' ? 'text-[#091c32]' : 'text-green-600'
                  const displayAmount = t.type === 'debit' ? `-₹${t.amount.toFixed(2)}` : `+₹${t.amount.toFixed(2)}`
                  const dateStr = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  
                  return (
                    <tr 
                      key={t.id} 
                      className="border-b border-[#e1e2ed] hover:bg-[#f3f3fe]/40 transition-colors cursor-pointer group"
                      onClick={() => openDrawer(t)}
                    >
                      <td className="py-4 px-6 text-[#737686] whitespace-nowrap text-[14px]">{dateStr}</td>
                      <td className="py-4 px-6 font-semibold text-[#091c32] group-hover:text-[#2563eb] transition-colors text-[15px]">{t.merchant}</td>
                      <td className="py-4 px-6">
                        <span 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-medium"
                          style={{ backgroundColor: `${t.categories?.color}15`, color: t.categories?.color || '#091c32' }}
                        >
                          {t.categories?.icon && getCategoryIcon(t.categories.icon)}
                          {t.categories?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[#434655] text-[14px]">{t.payment_sources?.name || 'Unknown'}</td>
                      <td className={`py-4 px-6 text-right font-bold text-[15px] ${amountClass}`}>{displayAmount}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#e1e2ed] flex flex-col sm:flex-row items-center justify-between bg-white rounded-b-xl gap-4">
            <span className="text-[#737686] text-[14px] font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} entries
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-1 rounded hover:bg-[#F8F5F0] text-[#434655] disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {(() => {
                let pages: number[] = [];
                if (totalPages <= 5) {
                  pages = Array.from({ length: totalPages }, (_, i) => i + 1);
                } else if (currentPage <= 3) {
                  pages = [1, 2, 3, 4, 5];
                } else if (currentPage >= totalPages - 2) {
                  pages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                  pages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
                }
                
                return pages.map(pageNum => (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg font-medium text-[14px] transition-colors ${
                      currentPage === pageNum 
                        ? 'bg-[#2563eb] text-white shadow-sm' 
                        : 'hover:bg-[#F8F5F0] text-[#091c32]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))
              })()}

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1 rounded hover:bg-[#F8F5F0] text-[#434655] disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Drawer (Details) */}
      <div 
        className={`fixed inset-0 bg-[#091c32]/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsDrawerOpen(false)}
      ></div>
      <aside 
        className={`fixed right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col border-l border-[#e1e2ed] ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#e1e2ed] flex justify-between items-start bg-[#F8F5F0]/50 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-medium"
                style={{ backgroundColor: `${selectedTransaction?.categories?.color}15`, color: selectedTransaction?.categories?.color || '#091c32' }}
              >
                {selectedTransaction?.categories?.icon && getCategoryIcon(selectedTransaction.categories.icon)}
                {selectedTransaction?.categories?.name || 'Uncategorized'}
              </span>
              <span className="text-[#737686] text-[13px] font-medium">
                {selectedTransaction ? new Date(selectedTransaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
              </span>
            </div>
            <h2 className="text-[24px] font-bold text-[#091c32] leading-tight mt-1">{selectedTransaction?.merchant}</h2>
            <div className={`text-[32px] font-bold mt-2 ${selectedTransaction?.type === 'credit' ? 'text-green-600' : 'text-[#091c32]'}`}>
              {selectedTransaction?.type === 'credit' ? '+' : '-'}₹{selectedTransaction?.amount?.toFixed(2)}
            </div>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-[#e1e2ed] text-[#737686] hover:text-[#091c32] transition-colors" 
            onClick={() => setIsDrawerOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Drawer Body */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {/* Raw Details */}
          <div className="bg-[#f8f9fa] rounded-xl p-5 border border-[#e1e2ed]">
            <div className="text-[12px] font-semibold text-[#737686] uppercase tracking-[0.05em] mb-4">Transaction Details</div>
            <div className="space-y-3.5 text-[14px]">
              <div className="flex justify-between border-b border-[#e1e2ed] pb-3.5">
                <span className="text-[#434655] font-medium">Source</span>
                <span className="font-semibold text-[#091c32]">{selectedTransaction?.payment_sources?.name || 'Unknown'}</span>
              </div>
              <div className="flex justify-between border-b border-[#e1e2ed] pb-3.5">
                <span className="text-[#434655] font-medium">Raw Info</span>
                <span className="font-medium text-[#737686] max-w-[180px] text-right truncate" title={selectedTransaction?.raw_description}>
                  {selectedTransaction?.raw_description || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#434655] font-medium">Status</span>
                <span className="font-bold text-green-600 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Settled
                </span>
              </div>
            </div>
          </div>
          
          {/* Editable Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-[#434655] uppercase tracking-[0.05em] mb-2">Category</label>
              <select 
                className="w-full px-4 py-3 bg-white border border-[#c3c6d7] rounded-lg text-[#091c32] focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 outline-none transition-all font-medium text-[15px]"
                value={editCategoryId || ''}
                onChange={(e) => setEditCategoryId(Number(e.target.value))}
              >
                <option value="">Uncategorized</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold text-[#434655] uppercase tracking-[0.05em] mb-2">Notes</label>
              <textarea 
                className="w-full px-4 py-3 bg-white border border-[#c3c6d7] rounded-lg text-[#091c32] focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 outline-none transition-all resize-none font-medium text-[15px] placeholder:text-[#737686]" 
                placeholder="Add a note to remember this transaction..." 
                rows={3}
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
              ></textarea>
            </div>
          </div>
          
          {/* Receipt Attachment (Visual only) */}
          <div className="mt-2 border-2 border-dashed border-[#c3c6d7] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#f3f3fe] hover:border-[#2563eb]/50 transition-colors">
            <Receipt className="w-8 h-8 text-[#737686] mb-2" />
            <span className="text-[14px] font-bold text-[#091c32]">Upload Receipt</span>
            <span className="text-[12px] text-[#737686] mt-1 font-medium">PNG, JPG or PDF</span>
          </div>
        </div>
        
        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#e1e2ed] bg-white">
          <button 
            onClick={handleSave}
            disabled={isPending}
            className="w-full bg-[#091c32] text-white py-3.5 rounded-lg text-[15px] font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : saveSuccess ? (
              <>
                <CheckCircle className="w-5 h-5" /> Saved!
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
