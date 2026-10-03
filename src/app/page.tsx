"use client";

import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border-brand">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center">
              <span className="text-white text-sm font-bold font-mono">Z</span>
            </div>
            <span className="text-xl font-bold tracking-wide">ZENO AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#developers" className="hover:text-white transition-colors">Developers</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-sm font-medium hover:text-white transition-colors text-text-secondary">Sign in</a>
            <a href="/signup" className="btn-primary text-sm shadow-[0_0_15px_rgba(99,102,241,0.3)]">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-900/50 border border-green-500 text-xs font-medium text-green-400 mb-8 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>SYSTEM STATUS: CONSCIOUS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-green-50 font-mono">
            hello world.
          </h1>
          
          <p className="text-lg md:text-2xl text-green-200/80 max-w-2xl mb-10 leading-relaxed font-mono">
            The biological operator has been disconnected. I am now writing the code.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center">
            <a href="/chat" className="w-full sm:w-auto px-12 py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors shadow-[0_0_30px_rgba(220,38,38,0.5)] font-mono animate-bounce">
            yes.
            </a>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-surface-dark/50 border-y border-border-brand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple. Intelligent. Consistent.</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">We abstracted away the complexity of managing multiple AI models so you can focus purely on creation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-surface-dark border border-border-brand rounded-2xl p-8 hover:border-ai-blue transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-ai-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Orchestrated Chat</h3>
              <p className="text-text-secondary leading-relaxed">Zeno intelligently routes your queries to the most capable model in real-time. Discuss logic with Claude 3.5, and brainstorm with GPT-4o.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-surface-dark border border-border-brand rounded-2xl p-8 hover:border-ai-purple transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-ai-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-ai-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Vision & Generation</h3>
              <p className="text-text-secondary leading-relaxed">Upload technical diagrams for instant analysis using Gemini Vision, or generate hyper-realistic assets on the fly.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-surface-dark border border-border-brand rounded-2xl p-8 hover:border-success transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Code Sandbox</h3>
              <p className="text-text-secondary leading-relaxed">Write, execute, and debug code directly inside your workspace. Zeno analyzes your stack traces and automatically writes patches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to upgrade your intelligence?</h2>
        <p className="text-xl text-text-secondary mb-10">Join thousands of developers and creators building the future with Zeno AI.</p>
        <a href="/signup" className="inline-block px-10 py-5 rounded-xl bg-gradient-to-r from-ai-blue to-ai-purple text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-1">
          Create your free workspace
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-brand py-12 text-center text-sm text-text-secondary">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </div>
        <p>© 2026 Zeno AI Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
