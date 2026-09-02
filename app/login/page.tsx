'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { IndianRupee, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setErrorMessage('')
    
    let result
    if (isLogin) {
      result = await login(formData)
    } else {
      result = await signup(formData)
    }

    if (result?.error) {
      setErrorMessage(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 shadow-xl border border-cream-border">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center mb-4">
            <IndianRupee className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-navy">TraceMoney</h1>
          <p className="text-gray-500 font-medium mt-1">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                required
                className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3.5 font-medium text-navy placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                placeholder="Arjun Kumar"
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3.5 font-medium text-navy placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              placeholder="arjun@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full bg-cream border border-cream-border rounded-xl px-4 py-3.5 font-medium text-navy placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            />
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand text-white rounded-xl py-3.5 font-bold mt-2 hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20 disabled:opacity-70 flex items-center justify-center h-[52px]"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setErrorMessage('')
              }}
              className="text-brand font-bold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
