"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden py-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ai-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 px-6">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-gradient-to-br from-ai-purple to-ai-blue flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <span className="text-white text-2xl font-bold font-mono">Z</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create your account</h1>
          <p className="text-text-secondary">Join Zeno AI and upgrade your intelligence.</p>
        </div>

        <div className="bg-surface-elevated border border-border-brand rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">First name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-3 focus:outline-none focus:border-ai-purple focus:ring-1 focus:ring-ai-purple transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Last name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-3 focus:outline-none focus:border-ai-purple focus:ring-1 focus:ring-ai-purple transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email address</label>
              <input 
                type="email" 
                required
                placeholder="you@company.com" 
                className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-3 focus:outline-none focus:border-ai-purple focus:ring-1 focus:ring-ai-purple transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-3 focus:outline-none focus:border-ai-purple focus:ring-1 focus:ring-ai-purple transition-all"
              />
              <p className="text-xs text-text-secondary mt-2">Must be at least 8 characters long.</p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ai-purple hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-70 flex justify-center items-center h-12 mt-4"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-xs text-text-secondary text-center mt-6">
            By signing up, you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>.
          </p>
        </div>

        <p className="text-center mt-8 text-sm text-text-secondary">
          Already have an account? <Link href="/login" className="text-white hover:text-ai-purple transition-colors font-medium">Sign in</Link>
        </p>

      </div>
    </div>
  );
}
