'use client'

import { useState } from 'react'
import {
  Sparkles,
  Bot,
  MessageSquare,
  Utensils,
  ShoppingBag,
  AlertTriangle,
  Send
} from 'lucide-react'

export default function AskTraceMoneyPage() {
  const [inputMessage, setInputMessage] = useState('')

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] -mt-8 -mx-4 md:-mx-8 relative overflow-hidden bg-cream/30">
      {/* Top Chat Header */}
      <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-cream-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-navy leading-none">Ask TraceMoney</h2>
            <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">your AI money assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream border border-cream-border">
          <Bot className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Powered by Claude</span>
        </div>
      </header>

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 pb-32">
        {/* Intro / Suggestion Chips */}
        <div className="flex flex-col items-center justify-center mt-4 md:mt-8 mb-4 max-w-2xl mx-auto w-full text-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-cream-border flex items-center justify-center mb-2">
            <MessageSquare className="w-8 h-8 text-brand" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-navy">How can I help you today?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-4 py-2 rounded-full border border-cream-border bg-white hover:border-brand hover:text-brand transition-colors font-medium text-gray-500 text-sm shadow-sm">
              Where did my money go?
            </button>
            <button className="px-4 py-2 rounded-full border border-cream-border bg-white hover:border-brand hover:text-brand transition-colors font-medium text-gray-500 text-sm shadow-sm">
              What are my subscriptions?
            </button>
            <button className="px-4 py-2 rounded-full border border-cream-border bg-white hover:border-brand hover:text-brand transition-colors font-medium text-gray-500 text-sm shadow-sm">
              Can I afford a new laptop?
            </button>
          </div>
        </div>

        {/* Chat Stream */}
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
          
          {/* Interaction 1 */}
          <div className="flex flex-col gap-4 w-full">
            {/* User Bubble */}
            <div className="self-end max-w-[85%] md:max-w-[60%] bg-brand text-white px-5 py-3.5 rounded-2xl rounded-br-sm shadow-md shadow-brand/20">
              <p className="font-medium">Where did my money go?</p>
            </div>
            {/* AI Bubble (Card) */}
            <div className="self-start max-w-[95%] md:max-w-[85%] flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white shadow-sm border border-cream-border rounded-2xl rounded-tl-sm p-5 md:p-6 flex flex-col gap-5 w-full">
                <p className="font-medium text-navy leading-relaxed">
                  You've spent <span className="font-bold">₹42,318</span> so far this month. Here's the breakdown of your top categories:
                </p>
                {/* Bento/List Hybrid */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-cream/50 border border-cream-border hover:bg-cream transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-navy">Food & Dining</p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">14 transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-navy">₹12,450</p>
                      <div className="w-24 h-1.5 bg-cream rounded-full mt-1.5 overflow-hidden border border-cream-border/50">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-cream/50 border border-cream-border hover:bg-cream transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-navy">Shopping</p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">5 transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-navy">₹8,200</p>
                      <div className="w-24 h-1.5 bg-cream rounded-full mt-1.5 overflow-hidden border border-cream-border/50">
                        <div className="h-full bg-brand rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 flex gap-3 items-start">
                  <AlertTriangle className="text-red-500 w-5 h-5 mt-0.5 shrink-0" />
                  <p className="font-medium text-red-700 text-sm">You are tracking 15% higher in Food & Dining compared to this time last month.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction 2 */}
          <div className="flex flex-col gap-4 w-full">
            {/* User Bubble */}
            <div className="self-end max-w-[85%] md:max-w-[60%] bg-brand text-white px-5 py-3.5 rounded-2xl rounded-br-sm shadow-md shadow-brand/20">
              <p className="font-medium">What are my subscriptions?</p>
            </div>
            {/* AI Bubble (Card) */}
            <div className="self-start max-w-[95%] md:max-w-[85%] flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white shadow-sm border border-cream-border rounded-2xl rounded-tl-sm p-5 md:p-6 flex flex-col gap-5 w-full">
                <p className="font-medium text-navy leading-relaxed">
                  I found <span className="font-bold">7 active subscriptions</span> totaling <span className="font-bold text-brand">₹2,391/month</span>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-cream-border bg-cream/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">N</div>
                      <span className="font-bold text-navy text-sm">Netflix</span>
                    </div>
                    <span className="font-bold text-navy text-sm">₹649</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-cream-border bg-cream/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 text-xs font-bold">A</div>
                      <span className="font-bold text-navy text-sm">Airtel</span>
                    </div>
                    <span className="font-bold text-navy text-sm">₹499</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-cream-border bg-cream/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">P</div>
                      <span className="font-bold text-navy text-sm">Prime</span>
                    </div>
                    <span className="font-bold text-navy text-sm">₹299</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-cream-border bg-cream/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">S</div>
                      <span className="font-bold text-navy text-sm">Spotify</span>
                    </div>
                    <span className="font-bold text-navy text-sm">₹119</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction 3 */}
          <div className="flex flex-col gap-4 w-full">
            {/* User Bubble */}
            <div className="self-end max-w-[85%] md:max-w-[60%] bg-brand text-white px-5 py-3.5 rounded-2xl rounded-br-sm shadow-md shadow-brand/20">
              <p className="font-medium">How does this compare to last month?</p>
            </div>
            {/* AI Typing Indicator */}
            <div className="self-start max-w-[95%] md:max-w-[75%] flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white shadow-sm border border-cream-border rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5 h-[52px]">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Sticky Input Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cream via-cream to-transparent pt-16 pb-6 px-4 md:px-8">
        <div className="max-w-3xl mx-auto w-full relative group">
          <input 
            className="w-full bg-white shadow-lg border border-cream-border rounded-2xl pl-6 pr-16 py-4 font-medium text-navy placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all" 
            placeholder="Ask anything about your spending..." 
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand-hover transition-colors shadow-md shadow-brand/20">
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        <p className="text-center text-xs font-bold text-gray-400 mt-4 tracking-wide">AI can make mistakes. Verify important financial info.</p>
      </div>
    </div>
  )
}
