'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeftRight,
  FileQuestion,
  Clock,
  Zap,
  Sparkles,
  MessageCircle,
  RefreshCw,
  Shield,
  Lock,
  CheckCircle,
} from 'lucide-react'

const metricCards = [
  { label: 'Total Spent', value: '₹42,318', sub: '↑ 12% vs Apr', subColor: 'text-red-500' },
  { label: 'Income', value: '₹70,000', sub: 'May 1', subColor: 'text-green-600' },
  { label: 'Top Category', value: 'Food', sub: '₹12,450', subColor: 'text-brand' },
  { label: 'Saved', value: '39%', sub: '₹27,682', subColor: 'text-green-600' },
]

const heroTransactions = [
  { name: 'Swiggy', cat: 'Food', amt: '-₹342', color: 'bg-red-100 text-red-600' },
  { name: 'Amazon', cat: 'Shopping', amt: '-₹1,299', color: 'bg-purple-100 text-purple-600' },
  { name: 'Salary', cat: 'Income', amt: '+₹70k', color: 'bg-green-100 text-green-600' },
  { name: 'Uber', cat: 'Transport', amt: '-₹180', color: 'bg-blue-100 text-blue-600' },
]

const showcaseTransactions = [
  { name: 'Swiggy', cat: 'Food', amt: '-₹342', color: 'bg-red-100 text-red-600' },
  { name: 'Amazon', cat: 'Shopping', amt: '-₹1,299', color: 'bg-purple-100 text-purple-600' },
  { name: 'Salary', cat: 'Income', amt: '+₹70,000', color: 'bg-green-100 text-green-600' },
  { name: 'Uber', cat: 'Transport', amt: '-₹180', color: 'bg-blue-100 text-blue-600' },
  { name: 'Netflix', cat: 'Subscription', amt: '-₹649', color: 'bg-orange-100 text-orange-600' },
  { name: 'Zomato', cat: 'Food', amt: '-₹425', color: 'bg-red-100 text-red-600' },
]

const chartLegend = [
  { label: 'Food', color: '#2563EB', pct: '29%' },
  { label: 'Shopping', color: '#E8593C', pct: '23%' },
  { label: 'Transport', color: '#15803D', pct: '15%' },
  { label: 'Other', color: '#D97706', pct: '12%' },
]

function DonutChart({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const isLarge = size === 'lg'
  return (
    <div className={`flex ${isLarge ? 'flex-col items-center gap-3' : 'items-center justify-center'}`}>
      <div className={`relative ${isLarge ? 'w-24 h-24' : 'w-16 h-16'}`}>
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#F0EDE8" strokeWidth="4" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="29 71" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#E8593C" strokeWidth="4" strokeDasharray="23 77" strokeDashoffset="-29" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#15803D" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-52" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="#D97706" strokeWidth="4" strokeDasharray="12 88" strokeDashoffset="-67" />
        </svg>
      </div>
      {isLarge && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full">
          {chartLegend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] text-gray-500">{item.label}</span>
              <span className="text-[10px] font-semibold text-navy ml-auto">{item.pct}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DashboardMockup({ variant = 'hero' }: { variant?: 'hero' | 'showcase' }) {
  const isShowcase = variant === 'showcase'
  const sidebarItems = isShowcase
    ? ['Dashboard', 'Transactions', 'Analytics', 'Budgets', 'Subscriptions']
    : ['Dashboard', 'Transactions', 'Analytics', 'Budgets']
  const transactions = isShowcase ? showcaseTransactions : heroTransactions

  const content = (
    <>
      <div className="bg-cream px-4 py-2 border-b border-cream-border flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-xs text-gray-400 ml-2">spendr.app/dashboard</span>
      </div>

      <div className="flex">
        <div className={`${isShowcase ? 'w-36' : 'w-28'} bg-navy p-3 flex flex-col gap-1`}>
          <div className="text-white text-xs font-bold mb-3 px-1">Spendr</div>
          {sidebarItems.map((item, i) => (
            <div
              key={item}
              className={`text-xs px-2 py-1.5 rounded-md cursor-pointer ${
                i === 0 ? 'bg-white/20 text-white' : 'text-navy-muted hover:text-white'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className={`flex-1 ${isShowcase ? 'p-5' : 'p-4'} bg-cream`}>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {metricCards.map((card) => (
              <div key={card.label} className="bg-white rounded-lg p-2.5 border border-cream-border">
                <div className="text-gray-400 text-[9px] font-medium uppercase tracking-wide">{card.label}</div>
                <div className="text-navy font-bold text-sm mt-0.5">{card.value}</div>
                <div className={`text-[9px] font-medium mt-0.5 ${card.subColor}`}>{card.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-2 bg-white rounded-lg p-3 border border-cream-border flex items-center justify-center">
              <DonutChart size={isShowcase ? 'lg' : 'sm'} />
            </div>
            <div className="col-span-3 bg-white rounded-lg border border-cream-border overflow-hidden">
              <div className="text-[9px] font-semibold text-gray-400 px-3 py-2 border-b border-cream-border uppercase tracking-wide">
                Recent
              </div>
              {transactions.map((tx) => (
                <div
                  key={tx.name}
                  className="flex items-center justify-between px-3 py-1.5 border-b border-cream-border last:border-0"
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${tx.color}`}>{tx.cat}</span>
                    <span className="text-[10px] font-medium text-navy">{tx.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${tx.amt.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.amt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 bg-white rounded-lg border-l-2 border-brand border border-cream-border p-2.5">
            <div className="flex items-start gap-1.5">
              <span className="text-brand text-xs">✦</span>
              <p className="text-[9px] text-gray-500 leading-relaxed">
                You spent <strong className="text-navy">₹4,200 more</strong> on food this month. Your 5 subscriptions total{' '}
                <strong className="text-navy">₹2,391/mo</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  if (isShowcase) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl border border-cream-border overflow-hidden max-w-4xl mx-auto w-full">
        {content}
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-3xl scale-95" />
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg">
        {content}
      </div>
    </div>
  )
}

const problems = [
  {
    icon: <ArrowLeftRight className="w-5 h-5 text-brand" />,
    title: 'Scattered across 6 apps',
    desc: 'GPay, PhonePe, Paytm, HDFC, Amazon Pay, Paytm — every app has a piece of your spending story, but none has the full picture.',
  },
  {
    icon: <FileQuestion className="w-5 h-5 text-brand" />,
    title: 'No plain language',
    desc: "Raw codes like UPI/SWIGGY*388389 and POS/MCDONALDS*7834 tell you nothing. You can't track what you can't read.",
  },
  {
    icon: <Clock className="w-5 h-5 text-brand" />,
    title: 'You check too late',
    desc: "By the time you open your bank app at month end, the damage is done. Budgeting after spending isn't budgeting.",
  },
]

const features = [
  {
    icon: <Zap className="w-5 h-5 text-brand" />,
    title: 'Unified view',
    desc: 'Every transaction from every source — GPay, PhonePe, HDFC, Paytm — in a single clean feed.',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-brand" />,
    title: 'AI categorisation',
    desc: "Raw codes like UPI/SWIGGY*388389 become 'Food delivery · Swiggy · ₹342' automatically.",
  },
  {
    icon: <MessageCircle className="w-5 h-5 text-brand" />,
    title: 'Ask anything',
    desc: "Type 'how much did I spend on food this month?' — get a plain rupee answer in seconds.",
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-brand" />,
    title: 'Subscription tracker',
    desc: 'See every recurring charge, total monthly burn, and next charge date — all in one place.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Connect your accounts',
    desc: "Securely link via RBI's Account Aggregator framework. Takes 30 seconds. No bank password needed.",
  },
  {
    number: '2',
    title: 'We categorise everything',
    desc: 'AI reads every transaction and labels it in plain English. Swiggy, Zomato, Amazon — all sorted automatically.',
  },
  {
    number: '3',
    title: 'Ask anything',
    desc: 'Beautiful dashboard, plain language answers, and WhatsApp access. Your money, finally clear.',
  },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      <nav
        className={`sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-cream-border transition-shadow duration-150 ease-in-out ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-md flex items-center justify-center text-white text-sm font-bold">₹</div>
            <span className="text-navy font-bold text-lg tracking-tight">Spendr</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-cream transition-colors duration-150 ease-in-out">
              Sign in
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors duration-150 ease-in-out">
              Try Demo
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-navy grain min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand uppercase mb-4">AI-POWERED FINANCE TRACKER</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                Every rupee,
                <br />
                finally explained.
              </h1>
              <p className="text-lg text-navy-muted leading-relaxed max-w-md mt-6">
                Spendr connects all your UPI apps, cards and wallets — and shows you exactly where your money went, in plain language.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-hover transition-colors duration-150 ease-in-out">
                  Try the demo →
                </button>
                <button className="border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-150 ease-in-out">
                  See how it works
                </button>
              </div>
              <p className="text-sm text-navy-muted flex items-center gap-2 mt-6">
                <Shield className="w-4 h-4 text-brand flex-shrink-0" />
                No bank credentials · RBI AA Framework · Free to try
              </p>
            </div>
            <div className="flex justify-center md:justify-end scale-[0.85] md:scale-100 origin-center">
              <DashboardMockup variant="hero" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream grain py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase text-center mb-4">THE PROBLEM</p>
          <h2 className="text-4xl font-bold text-navy text-center tracking-tight mb-4">Sound familiar?</h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-14">
            Managing money across multiple apps is chaotic. No single view. No plain language. You only find out at month end.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="bg-white rounded-2xl p-7 border border-cream-border shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out"
              >
                <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center mb-5">{problem.icon}</div>
                <h3 className="text-navy font-semibold text-lg mb-2">{problem.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream grain py-24 border-t border-cream-border">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase text-center mb-4">THE PRODUCT</p>
          <h2 className="text-4xl font-bold text-navy text-center tracking-tight mb-4">One dashboard for all your money</h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-14">
            Everything in one place, labelled in plain English. No more guessing where it went.
          </p>
          <DashboardMockup variant="showcase" />
        </div>
      </section>

      <section className="bg-navy grain py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase text-center mb-4">FEATURES</p>
          <h2 className="text-4xl font-bold text-white text-center tracking-tight mb-4">Built for how Indians actually spend</h2>
          <p className="text-navy-muted text-center max-w-xl mx-auto mb-14">
            From UPI to credit cards — we understand the Indian payment landscape.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-navy-light rounded-2xl p-7 border border-white/10 hover:border-brand/50 transition-colors duration-150 ease-in-out"
              >
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center mb-5 border border-brand/20">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-navy-muted text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream grain py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-brand uppercase text-center mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl font-bold text-navy text-center tracking-tight mb-4">Three steps, then you&apos;re done</h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-16">Get set up in under 2 minutes. No bank passwords, ever.</p>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px border-t-2 border-dashed border-cream-border z-0" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center relative z-10">
                  <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-navy font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-cream-border py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:divide-x divide-cream-border">
            {[
              { icon: <Shield className="w-4 h-4 text-brand" />, label: 'RBI AA Framework', desc: 'Compliant & secure' },
              { icon: <Lock className="w-4 h-4 text-brand" />, label: 'No bank credentials', desc: 'We never store passwords' },
              { icon: <CheckCircle className="w-4 h-4 text-brand" />, label: 'Consent-based access', desc: 'You control your data' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-0 md:px-10 py-2">
                <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-navy font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy grain py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Ready to see where your money goes?</h2>
          <p className="text-navy-muted text-lg mb-10">Join thousands of Indians who finally understand their spending.</p>
          <button className="px-8 py-4 bg-brand text-white font-semibold text-lg rounded-xl hover:bg-brand-hover transition-colors duration-150 ease-in-out shadow-lg shadow-brand/30">
            Try the demo →
          </button>
          <p className="text-navy-muted text-sm mt-4">Takes 30 seconds · No credit card required</p>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand rounded-md flex items-center justify-center text-white text-xs font-bold">₹</div>
            <span className="text-white font-semibold text-sm">Spendr</span>
          </div>
          <p className="text-navy-muted text-xs">© 2026 Spendr Technologies</p>
          <div className="flex gap-6 text-navy-muted text-xs">
            <a href="#" className="hover:text-white transition-colors duration-150 ease-in-out">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-150 ease-in-out">
              Terms of Service
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
