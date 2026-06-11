'use client'

import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Filter,
  Utensils,
  RefreshCw,
  Dumbbell
} from 'lucide-react'

export default function AnalyticsPage() {
  const [heatmapData, setHeatmapData] = useState<number[][]>([])
  const weeks = 13
  const days = 7
  
  useEffect(() => {
    const data: number[][] = []
    for (let w = 0; w < weeks; w++) {
      const col = []
      for (let d = 0; d < days; d++) {
        let intensity = 0
        const random = Math.random()
        if (d === 5 || d === 6) { // Weekend
          intensity = random > 0.3 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2)
        } else { // Weekday
          intensity = random > 0.6 ? Math.floor(Math.random() * 3) + 1 : (random > 0.3 ? 1 : 0)
        }
        col.push(intensity)
      }
      data.push(col)
    }
    setHeatmapData(data)
  }, [])

  const getColorClass = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-cream opacity-50'
      case 1: return 'bg-brand-light'
      case 2: return 'bg-brand/50'
      case 3: return 'bg-brand'
      case 4: return 'bg-navy'
      default: return 'bg-cream opacity-50'
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy">Insights</h1>
          <p className="text-gray-500 mt-2 max-w-2xl font-medium">
            Deep dive into your spending patterns. Highlighting anomalies and identifying opportunities to optimize your cash flow.
          </p>
        </div>
        {/* Quick Actions / Filters */}
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-white border border-cream-border text-navy font-bold hover:bg-cream transition-colors flex items-center gap-2 shadow-sm">
            <CalendarDays className="w-5 h-5" />
            Last 90 Days
          </button>
          <button className="px-4 py-2 rounded-xl bg-white border border-cream-border text-navy font-bold hover:bg-cream transition-colors flex items-center gap-2 shadow-sm">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Month-over-month chart card (Spans 8 cols) */}
        <div className="col-span-1 md:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-cream-border flex flex-col h-[420px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-navy">Category Trends</h3>
              <p className="text-gray-500 font-medium mt-1">Month-over-month comparison</p>
            </div>
            {/* Toggle Pills */}
            <div className="flex bg-cream p-1 rounded-lg">
              <button className="px-3 py-1.5 rounded-md bg-white text-navy font-bold text-xs uppercase tracking-widest shadow-sm">By category</button>
              <button className="px-3 py-1.5 rounded-md text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-navy transition-colors">By source</button>
            </div>
          </div>
          
          {/* Chart Area Placeholder */}
          <div className="flex-1 relative flex items-end justify-between pb-6 pt-4">
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs font-bold text-gray-400 z-10 w-12 border-r border-cream-border pr-2 text-right">
              <span>50k</span><span>40k</span><span>30k</span><span>20k</span><span>10k</span><span>0</span>
            </div>
            
            <div className="absolute left-12 right-0 top-0 bottom-6 flex flex-col justify-between z-0 pointer-events-none">
              {[1,2,3,4,5,6].map(i => <div key={i} className="w-full h-px bg-cream"></div>)}
            </div>
            
            <div className="pl-16 w-full h-full flex justify-between items-end relative z-10 space-x-2">
              {/* Group 1: Housing */}
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-end space-x-1 w-full justify-center h-full">
                  <div className="w-1/3 bg-brand/50 rounded-t-sm h-[80%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                  <div className="w-1/3 bg-brand rounded-t-sm h-[82%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                  <div className="w-1/3 bg-navy rounded-t-sm h-[85%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-3 block w-full text-center truncate">Housing</span>
              </div>
              {/* Group 2: Food */}
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-end space-x-1 w-full justify-center h-full">
                  <div className="w-1/3 bg-brand/50 rounded-t-sm h-[40%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                  <div className="w-1/3 bg-brand rounded-t-sm h-[45%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                  <div className="w-1/3 bg-navy rounded-t-sm h-[35%] hover:opacity-80 transition-opacity cursor-pointer"></div>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-3 block w-full text-center truncate">Food</span>
              </div>
              {/* Add more groups similar to above */}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-2 pt-4 border-t border-cream-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-brand/50"></div>
              <span className="text-xs font-bold text-gray-500 uppercase">March</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-brand"></div>
              <span className="text-xs font-bold text-gray-500 uppercase">April</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-navy"></div>
              <span className="text-xs font-bold text-gray-500 uppercase">May</span>
            </div>
          </div>
        </div>
        
        {/* Spending Heatmap Card (Spans 4 cols) */}
        <div className="col-span-1 md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-cream-border flex flex-col h-[420px]">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-navy">Spending Intensity</h3>
            <p className="text-gray-500 font-medium mt-1">Daily volume - last 90 days</p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center w-full overflow-hidden">
            <div className="w-full overflow-x-auto pb-2">
              <div className="inline-flex gap-1">
                <div className="flex flex-col gap-1 pr-2 text-[10px] text-gray-400 font-bold justify-around py-1">
                  <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
                </div>
                <div className="flex gap-1">
                  {heatmapData.map((col, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1">
                      {col.map((intensity, dIndex) => (
                        <div 
                          key={`${wIndex}-${dIndex}`} 
                          className={`w-3 h-3 rounded-sm ${getColorClass(intensity)} hover:ring-2 hover:ring-brand cursor-pointer transition-all`}
                          title={`₹${(intensity * 1250).toLocaleString()}`}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest border-t border-cream-border">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-cream"></div>
              <div className="w-3 h-3 rounded-sm bg-brand-light"></div>
              <div className="w-3 h-3 rounded-sm bg-brand/50"></div>
              <div className="w-3 h-3 rounded-sm bg-brand"></div>
              <div className="w-3 h-3 rounded-sm bg-navy"></div>
            </div>
            <span>More</span>
          </div>
        </div>

      </div>

      {/* ROW 2: Subscription Tracker & Category Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
        {/* Category Deep Dive (Spans 7 cols) */}
        <div className="col-span-1 md:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-cream-border">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="text-brand w-6 h-6" />
                <h3 className="text-xl font-bold text-navy">Food & Dining</h3>
              </div>
              <p className="text-gray-500 font-medium">Top merchants & 12-week trend</p>
            </div>
            <button className="text-brand font-bold text-xs uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          {/* Top 5 Merchants Bar Chart */}
          <div className="mb-8 space-y-5">
            <div className="flex items-center gap-4 group">
              <div className="w-32 font-semibold text-sm text-navy truncate">Swiggy</div>
              <div className="flex-1 h-5 bg-cream rounded-full overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full bg-brand rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="w-20 text-right font-bold text-navy">₹8,450</div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-32 font-semibold text-sm text-navy truncate">Zomato</div>
              <div className="flex-1 h-5 bg-cream rounded-full overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full bg-brand rounded-full opacity-80" style={{ width: '65%' }}></div>
              </div>
              <div className="w-20 text-right font-bold text-navy">₹6,120</div>
            </div>
          </div>
        </div>

        {/* Subscription Tracker (Spans 5 cols) */}
        <div className="col-span-1 md:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-cream-border flex flex-col">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-navy">Active Subscriptions</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold text-red-500">₹2,391</span>
                <span className="text-gray-500 font-medium">/mo burn rate</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <RefreshCw className="text-red-600 w-6 h-6" />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-cream-border text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <th className="pb-4 w-1/2">Merchant</th>
                  <th className="pb-4 text-right">Amount</th>
                  <th className="pb-4 text-right">Next</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-cream-border hover:bg-cream transition-colors group cursor-pointer">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#191b23] text-white flex items-center justify-center font-bold">N</div>
                    <div>
                      <div className="text-navy font-bold group-hover:text-brand transition-colors">Netflix</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Monthly</div>
                    </div>
                  </td>
                  <td className="py-4 text-right font-bold text-navy">₹649</td>
                  <td className="py-4 text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[11px] font-bold">In 2 days</span>
                  </td>
                </tr>
                <tr className="border-b border-cream-border hover:bg-cream transition-colors group cursor-pointer">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1db954] text-white flex items-center justify-center font-bold">S</div>
                    <div>
                      <div className="text-navy font-bold group-hover:text-brand transition-colors">Spotify</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Monthly</div>
                    </div>
                  </td>
                  <td className="py-4 text-right font-bold text-navy">₹119</td>
                  <td className="py-4 text-right text-xs text-gray-500 font-bold">12 Jun</td>
                </tr>
                <tr className="hover:bg-cream transition-colors group cursor-pointer">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-navy font-bold group-hover:text-brand transition-colors">Cult.fit</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Monthly</div>
                    </div>
                  </td>
                  <td className="py-4 text-right font-bold text-navy">₹1,250</td>
                  <td className="py-4 text-right text-xs text-gray-500 font-bold">01 Jul</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="mt-4 w-full py-3.5 rounded-xl border-2 border-cream-border text-navy font-bold hover:bg-cream transition-colors">
            Manage Subscriptions
          </button>
        </div>
      </div>
    </div>
  )
}
