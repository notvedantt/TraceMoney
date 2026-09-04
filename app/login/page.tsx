'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { Wallet, Loader2, Info, EyeOff } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-12 font-sans antialiased bg-[#F8F5F0] relative overflow-hidden">
      {/* Exact grain effect from Stitch */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      ></div>

      <div className="w-full max-w-[448px] bg-[#ffffff] rounded-[16px] shadow-[0_1px_6px_rgba(15,33,55,0.07)] p-8 md:p-10 relative z-10 flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="mb-4">
            <span className="text-[36px] leading-[1.2] tracking-[-0.01em] font-semibold text-[#191b23] flex items-center gap-2">
              <Wallet className="w-8 h-8 text-[#2563eb]" strokeWidth={2.5} />
              TraceMoney
            </span>
          </div>
          <h1 className="text-[36px] leading-[1.2] tracking-[-0.01em] font-semibold text-[#091c32]">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-[15px] leading-[24px] text-[#434655]">
            {isLogin ? 'Log in to manage your finances' : 'Start your journey to financial clarity'}
          </p>
        </div>

        {/* Sliding Toggle (Styled to match Stitch buttons) */}
        <div className="relative flex w-full bg-[#f3f3fe] rounded-lg p-1 border border-[#e1e2ed]">
          <div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#ffffff] rounded-[6px] shadow-[0_1px_3px_rgba(15,33,55,0.1)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border border-[#e1e2ed]"
            style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
          />
          <button 
            type="button"
            onClick={() => { setIsLogin(true); setErrorMessage(''); }}
            className={`relative z-10 w-1/2 py-2 text-[15px] font-medium transition-colors duration-300 ${isLogin ? 'text-[#191b23]' : 'text-[#737686] hover:text-[#191b23]'}`}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => { setIsLogin(false); setErrorMessage(''); }}
            className={`relative z-10 w-1/2 py-2 text-[15px] font-medium transition-colors duration-300 ${!isLogin ? 'text-[#191b23]' : 'text-[#737686] hover:text-[#191b23]'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Social Auth */}
        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-[#e1e2ed] rounded-lg bg-[#ffffff] hover:bg-[#f3f3fe] hover:shadow-[0_4px_12px_rgba(15,33,55,0.12)] transition-all duration-200">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          <span className="text-[15px] font-medium text-[#191b23]">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-[#e1e2ed]"></div>
          <span className="flex-shrink-0 mx-4 text-[12px] leading-[16px] font-semibold tracking-[0.05em] text-[#737686] bg-[#ffffff] px-2 uppercase">
            {isLogin ? 'Or continue with email' : 'Or sign up with email'}
          </span>
          <div className="flex-grow border-t border-[#e1e2ed]"></div>
        </div>

        {/* Form */}
        <form action={handleSubmit} className="flex flex-col gap-5">
          
          <div className={`transition-all duration-300 overflow-hidden ${!isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] leading-[16px] font-semibold tracking-[0.05em] text-[#434655] uppercase" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required={!isLogin}
                className="w-full px-4 py-3 border border-[#c3c6d7] rounded-lg bg-[#ffffff] text-[#191b23] text-[15px] placeholder:text-[#737686] focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] leading-[16px] font-semibold tracking-[0.05em] text-[#434655] uppercase" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-[#c3c6d7] rounded-lg bg-[#ffffff] text-[#191b23] text-[15px] placeholder:text-[#737686] focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[12px] leading-[16px] font-semibold tracking-[0.05em] text-[#434655] uppercase" htmlFor="password">
                Password
              </label>
              {isLogin && (
                <a className="text-[12px] leading-[16px] font-semibold tracking-[0.05em] text-[#2563eb] hover:underline uppercase" href="#">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-[#c3c6d7] rounded-lg bg-[#ffffff] text-[#191b23] text-[15px] placeholder:text-[#737686] focus:border-[#2563eb] focus:ring-[2px] focus:ring-[#2563eb]/15 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <button aria-label="Toggle password visibility" className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737686] hover:text-[#191b23] transition-colors" type="button">
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-lg text-[15px] font-medium border border-[#ba1a1a]/20 flex items-start gap-2">
              <Info className="w-5 h-5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-[#091c32] hover:opacity-90 active:scale-[0.98] text-[#ffffff] rounded-lg text-[15px] font-medium transition-all duration-200 flex items-center justify-center min-h-[48px]"
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

        {/* Footer Link (only for sign up) */}
        {!isLogin && (
          <div className="text-center pt-2">
            <p className="text-[13px] leading-[20px] text-[#434655]">
              By signing up, you agree to our <a className="underline hover:text-[#191b23]" href="#">Terms</a> and <a className="underline hover:text-[#191b23]" href="#">Privacy Policy</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
