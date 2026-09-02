'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IndianRupee,
  Plus,
  LayoutDashboard,
  ReceiptText,
  BarChart2,
  Wallet,
  MessageCircle,
  User,
  Bell,
  LogOut
} from 'lucide-react'
import { signout } from '@/app/login/actions'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/transactions', label: 'Transactions', icon: ReceiptText },
    { href: '/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/budgets', label: 'Budgets', icon: Wallet },
    { href: '/ask', label: 'Ask TraceMoney', icon: MessageCircle },
  ]
  return (
    <div className="font-body-main text-body-main text-on-surface antialiased flex h-screen overflow-hidden bg-cream">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col h-full py-8 px-4 bg-navy text-primary fixed left-0 top-0 w-[280px] z-20">
        <div className="flex items-center gap-3 mb-10 px-4">
          <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
            <IndianRupee className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white text-xl">TraceMoney</h1>
            <p className="text-xs text-navy-muted uppercase tracking-widest mt-1">AI Finance Tracker</p>
          </div>
        </div>
        
        <button className="mb-8 mx-4 bg-brand text-white py-3 rounded-lg font-bold hover:bg-brand-hover transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand/20">
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>

        <div className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname.startsWith(link.href)
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 ${
                  isActive 
                    ? 'bg-white text-navy shadow-sm' 
                    : 'text-navy-muted hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-navy-muted hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 active:scale-95">
            <User className="w-5 h-5" />
            Profile Settings
          </button>
          <form action={signout}>
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 active:scale-95">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-[280px] h-full overflow-y-auto">
        {/* TopNavBar */}
        <header className="bg-cream/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center w-full h-16 px-8 border-b border-cream-border">
          <div className="flex items-center gap-6">
            <h2 className="font-bold text-navy text-xl">Dashboard</h2>
            <nav className="hidden md:flex gap-6 mt-1">
              <Link href="#" className="text-brand font-bold border-b-2 border-brand pb-1 text-[15px]">
                Current Month
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-navy transition-colors duration-200 active:scale-95">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-light text-brand flex items-center justify-center font-bold text-sm">
              AK
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
