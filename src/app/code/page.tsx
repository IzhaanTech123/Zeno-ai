// @ts-nocheck
"use client";

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';

export default function CodeWorkstation() {
  const [code, setCode] = useState(
`// Zeno Code AI Sandbox
// Write, generate, and run code directly in the browser.

function calculateFibonacci(n: number): number {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

console.log(calculateFibonacci(10));
`);

  const [input, setInput] = useState('');
  // @ts-ignore
  const { messages, sendMessage, status } = useChat({
    api: '/api/ai/chat',
    body: {
      model: "claude-3-5-sonnet" // Force coding model for Workstation
    }
  });
  
  const isLoading = status === 'in_progress';
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ role: 'user', content: input });
    setInput('');
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-16 md:w-64 bg-surface-dark border-r border-border-brand flex flex-col justify-between">
        <div className="p-4 space-y-6">
          <div className="flex items-center space-x-2 px-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">Z</span>
            </div>
            <span className="text-lg font-bold tracking-wide hidden md:block">ZENO AI</span>
          </div>

          <nav className="space-y-1">
            <a href="/" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors" title="Chat AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span className="hidden md:inline">Chat AI</span>
            </a>
            <a href="/image" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors" title="Image AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="hidden md:inline">Image AI</span>
            </a>
            <a href="/code" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white bg-surface-elevated rounded-lg transition-colors" title="Code AI">
              <svg className="w-5 h-5 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <span className="hidden md:inline">Code AI</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* WORKSTATION CONTENT AREA */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Code Assistant Chat */}
        <div className="w-1/3 min-w-[300px] border-r border-border-brand flex flex-col bg-surface-dark">
          <header className="h-14 border-b border-border-brand flex items-center px-4">
            <span className="font-semibold text-sm">Zeno Coder (Claude 3.5)</span>
          </header>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="bg-surface-elevated p-3 rounded-lg text-sm text-text-secondary">
                <p>I can help you write, debug, and refactor code. What are we building today?</p>
              </div>
            )}
            
            {messages.map(m => (
              <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`text-sm p-3 rounded-lg max-w-[90%] ${m.role === 'user' ? 'bg-ai-blue text-white' : 'bg-surface-elevated text-gray-200'}`}>
                  <div className="whitespace-pre-wrap">{m.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') || (m as any).content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="text-sm p-3 rounded-lg max-w-[90%] bg-surface-elevated text-gray-400 animate-pulse">
                  Coding...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border-brand">
            <form onSubmit={handleSubmit} className="bg-background border border-border-brand rounded-lg flex items-center p-2 focus-within:border-ai-blue transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={handleInputChange}
                placeholder="Instruct Zeno..." 
                className="bg-transparent text-sm w-full outline-none px-2" 
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-ai-blue text-white rounded p-1 disabled:opacity-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Code Editor / Sandbox */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
           <header className="h-14 border-b border-border-brand flex items-center justify-between px-4 bg-background">
            <div className="flex space-x-2">
              <div className="px-3 py-1 bg-surface-elevated rounded-t-md border-t border-x border-ai-blue text-xs text-ai-blue font-mono">
                main.ts
              </div>
            </div>
            <div>
              <button className="btn-primary text-xs py-1 px-3 flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Run Code
              </button>
            </div>
          </header>
          
          {/* Simulated Code Editor Area */}
          <div className="flex-1 p-4 font-mono text-sm overflow-auto text-gray-300">
             <textarea 
               value={code}
               onChange={(e) => setCode(e.target.value)}
               className="w-full h-full bg-transparent outline-none resize-none"
               spellCheck="false"
             />
          </div>
          
          {/* Output Terminal */}
          <div className="h-48 border-t border-border-brand bg-[#0a0a0a] p-4 font-mono text-xs overflow-auto">
             <div className="text-gray-500 mb-1">$ zeno run main.ts</div>
             <div className="text-success">55</div>
             <div className="text-gray-500 mt-2">Process exited with code 0.</div>
          </div>
        </div>

      </main>
    </div>
  );
}
