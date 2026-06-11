'use client'

import { useState } from 'react'
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
  Receipt
} from 'lucide-react'

export default function TransactionsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const transactions = [
    { id: 1, date: "Oct 24, 2023", merchant: "Swiggy Instamart", cat: "Groceries", catColor: "bg-brand-light text-brand", source: "HDFC Debit", amount: "-₹845.00", isDebit: true },
    { id: 2, date: "Oct 23, 2023", merchant: "Uber Rides", cat: "Transport", catColor: "bg-navy-muted/20 text-navy", source: "ICICI Credit", amount: "-₹320.50", isDebit: true },
    { id: 3, date: "Oct 22, 2023", merchant: "Salary - TechCorp", cat: "Income", catColor: "bg-green-100 text-green-700", source: "HDFC Salary", amount: "+₹85,000.00", isDebit: false },
    { id: 4, date: "Oct 21, 2023", merchant: "Amazon India", cat: "Shopping", catColor: "bg-purple-100 text-purple-700", source: "SBI Card", amount: "-₹1,299.00", isDebit: true },
    { id: 5, date: "Oct 20, 2023", merchant: "Starbucks Coffee", cat: "Food", catColor: "bg-orange-100 text-orange-700", source: "UPI - PhonePe", amount: "-₹450.00", isDebit: true },
  ];

  // Repeat to simulate more rows
  const allTransactions = [...transactions, ...transactions.map(t => ({...t, id: t.id + 5}))]

  const openDrawer = (t: any) => {
    setSelectedTransaction(t)
    setIsDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-navy">Transactions</h1>
          <p className="text-gray-500 mt-1">Manage and categorize your recent activity.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-cream-border text-navy rounded-lg font-bold hover:bg-cream transition-colors shadow-sm">
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Sticky Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-cream-border sticky top-0 z-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2.5 bg-cream rounded-xl border-transparent focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all placeholder:text-gray-400 text-navy font-medium" 
              placeholder="Search merchants, categories..." 
              type="text"
            />
          </div>
          {/* Dropdowns */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-border rounded-xl text-navy hover:border-brand transition-colors font-medium">
              Category <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-border rounded-xl text-navy hover:border-brand transition-colors font-medium">
              Type <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-border rounded-xl text-navy hover:border-brand transition-colors font-medium">
              Source <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-border rounded-xl text-navy hover:border-brand transition-colors font-medium">
              Date <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Active Chips */}
        <div className="flex items-center gap-2 pt-3 border-t border-cream-border">
          <span className="text-[13px] text-gray-500 mr-2 font-medium">Active Filters:</span>
          <div className="flex items-center gap-1 px-3 py-1 bg-brand-light text-brand rounded-full text-xs font-bold">
            Food <button className="ml-1 hover:text-red-500"><X className="w-3 h-3" /></button>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-brand-light text-brand rounded-full text-xs font-bold">
            Debit <button className="ml-1 hover:text-red-500"><X className="w-3 h-3" /></button>
          </div>
          <button className="text-[13px] text-brand hover:underline ml-2 font-medium">Clear all</button>
        </div>
      </div>

      {/* Transaction Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-cream-border overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cream-border bg-cream/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Merchant</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Source</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map(t => {
                const amountClass = t.isDebit ? 'text-navy' : 'text-green-600'
                return (
                  <tr 
                    key={t.id} 
                    className="border-b border-cream-border hover:bg-cream transition-colors cursor-pointer group"
                    onClick={() => openDrawer(t)}
                  >
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap text-sm">{t.date}</td>
                    <td className="py-4 px-6 font-semibold text-navy group-hover:text-brand transition-colors">{t.merchant}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${t.catColor}`}>
                        {t.cat}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">{t.source}</td>
                    <td className={`py-4 px-6 text-right font-bold ${amountClass}`}>{t.amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="p-4 border-t border-cream-border flex items-center justify-between bg-white rounded-b-2xl">
          <span className="text-gray-500 text-sm font-medium">Showing 1 to 10 of 145 entries</span>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-cream text-gray-400 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
            <button className="w-8 h-8 rounded-lg bg-brand text-white font-bold text-sm shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-cream text-navy font-bold text-sm">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-cream text-navy font-bold text-sm">3</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-cream text-navy font-bold text-sm">8</button>
            <button className="p-1 rounded hover:bg-cream text-navy"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer (Details) */}
      <div 
        className={`fixed inset-0 bg-navy/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsDrawerOpen(false)}
      ></div>
      <aside 
        className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-cream-border ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-cream-border flex justify-between items-start bg-cream/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${selectedTransaction?.catColor || 'bg-brand-light text-brand'}`}>
                {selectedTransaction?.cat || 'Food'}
              </span>
              <span className="text-gray-500 text-[13px] font-medium">{selectedTransaction?.date || 'Oct 24, 2023'} • 14:32</span>
            </div>
            <h2 className="text-2xl font-bold text-navy leading-none mt-2">{selectedTransaction?.merchant || 'Swiggy Instamart'}</h2>
            <div className={`text-3xl font-bold mt-4 ${selectedTransaction?.isDebit === false ? 'text-green-600' : 'text-navy'}`}>
              {selectedTransaction?.amount || '-₹845.00'}
            </div>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-cream text-gray-400 hover:text-navy transition-colors" 
            onClick={() => setIsDrawerOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Drawer Body */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {/* Raw Details */}
          <div className="bg-cream/50 rounded-xl p-5 border border-cream-border">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Transaction Details</div>
            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between border-b border-cream-border pb-3">
                <span className="text-gray-500 font-medium">Source</span>
                <span className="font-bold text-navy">{selectedTransaction?.source || 'HDFC Debit Card ending 4412'}</span>
              </div>
              <div className="flex justify-between border-b border-cream-border pb-3">
                <span className="text-gray-500 font-medium">Reference</span>
                <span className="font-medium text-navy">UPI/329481928347/SWIGGY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Status</span>
                <span className="font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Settled
                </span>
              </div>
            </div>
          </div>
          {/* Editable Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Category</label>
              <select className="w-full px-4 py-3 bg-white border border-cream-border rounded-xl text-navy focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all font-medium">
                <option>Food & Dining</option>
                <option selected>Groceries</option>
                <option>Shopping</option>
                <option>Transport</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="flex items-center gap-1 px-3 py-1.5 bg-cream text-navy font-medium rounded-full text-[13px]">
                  Home Needs <button className="hover:text-red-500 ml-1"><X className="w-3 h-3" /></button>
                </span>
                <button className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-300 text-gray-500 hover:border-brand hover:text-brand transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Notes</label>
              <textarea 
                className="w-full px-4 py-3 bg-white border border-cream-border rounded-xl text-navy focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all resize-none font-medium placeholder:text-gray-400 placeholder:font-normal" 
                placeholder="Add a note to remember this transaction..." 
                rows={3}
              ></textarea>
            </div>
          </div>
          {/* Receipt Attachment */}
          <div className="mt-2 border-2 border-dashed border-cream-border rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-cream hover:border-brand/50 transition-colors">
            <Receipt className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-bold text-navy">Upload Receipt</span>
            <span className="text-xs text-gray-400 mt-1 font-medium">PNG, JPG or PDF</span>
          </div>
        </div>
        {/* Drawer Footer */}
        <div className="p-6 border-t border-cream-border bg-white">
          <button className="w-full bg-brand text-white py-3.5 rounded-xl font-bold hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20">
            Save Changes
          </button>
        </div>
      </aside>
    </div>
  )
}
