"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fillQuickAccount = (accEmail: string) => {
    setEmail(accEmail);
    setPassword('demo123');
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage('Authenticating credentials...');

    try {
      // 1. Sign in using NextAuth without automatic redirect
      const result = await signIn('credentials', {
        redirect: false,
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (!result || result.error) {
        setErrorMessage(result?.error || 'Invalid credentials. Please try again.');
        setIsLoading(false);
        setStatusMessage(null);
        return;
      }

      setStatusMessage('Checking user role & workspace...');

      // 2. Query user profile to determine role (ADMIN vs USER/Customer)
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const user = await res.json();
        
        if (user && user.role === 'ADMIN') {
          setStatusMessage('🛡️ Administrator detected! Redirecting to Admin Console...');
          setTimeout(() => {
            router.push('/admin');
          }, 600);
          return;
        }
      }

      // Default customer flow
      setStatusMessage('✨ Welcome back! Redirecting to Workspace...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 600);

    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
      setIsLoading(false);
      setStatusMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ai-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 px-6">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <span className="text-white text-2xl font-bold font-mono">Z</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Unified Sign In</h1>
          <p className="text-text-secondary text-sm">
            Single secure portal for <span className="text-white font-medium">Customers</span> &amp; <span className="text-ai-blue font-medium">Administrators</span>
          </p>
        </div>

        {/* Quick Demo Selector */}
        <div className="mb-4 bg-surface-elevated/70 border border-border-brand/70 rounded-xl p-3 flex items-center justify-between text-xs">
          <span className="text-text-secondary">Quick Fill:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillQuickAccount('user@zeno.ai')}
              className="px-2.5 py-1 rounded bg-surface-dark border border-border-brand hover:border-text-secondary text-slate-300 hover:text-white transition-colors"
            >
              👤 Customer Demo
            </button>
            <button
              type="button"
              onClick={() => fillQuickAccount('admin@zeno.ai')}
              className="px-2.5 py-1 rounded bg-ai-blue/10 border border-ai-blue/40 hover:bg-ai-blue/20 text-ai-blue font-medium transition-colors"
            >
              🛡️ Admin Demo
            </button>
          </div>
        </div>

        <div className="bg-surface-elevated border border-border-brand rounded-2xl p-8 shadow-2xl">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}

          {statusMessage && (
            <div className="mb-4 p-3 bg-ai-blue/10 border border-ai-blue/30 text-ai-blue text-xs rounded-lg animate-pulse font-medium">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com" 
                className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-3 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition-all"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-text-secondary">Password</label>
                <a href="#" className="text-xs text-ai-blue hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-3 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ai-blue hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:opacity-70 flex justify-center items-center h-12 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <hr className="w-full border-border-brand" />
            <span className="p-2 text-xs text-text-secondary uppercase">Or</span>
            <hr className="w-full border-border-brand" />
          </div>

          <div className="mt-6 space-y-3">
            <button 
              onClick={() => signIn('google')}
              className="w-full bg-surface-dark hover:bg-surface-dark/80 border border-border-brand text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/></svg>
              <span>Continue with Google</span>
            </button>
            <button 
              onClick={() => signIn('github')}
              className="w-full bg-surface-dark hover:bg-surface-dark/80 border border-border-brand text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              <span>Continue with GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-text-secondary">
          Don&apos;t have an account? <Link href="/signup" className="text-white hover:text-ai-blue transition-colors font-medium">Sign up for free</Link>
        </p>

      </div>
    </div>
  );
}
