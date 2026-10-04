"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

interface MessagePart {
  type: string;
  text?: string;
}

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

  const [customInput, setCustomInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai/chat',
      body: {
        model: "claude-3-5-sonnet" // Force coding model for Workstation
      }
    })
  });
  
  const isLoading = status === 'submitted' || status === 'streaming';
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const textToSend = customInput;
    setCustomInput('');
    await sendMessage({ text: textToSend });
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
            <Link href="/" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors" title="Chat AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span className="hidden md:inline">Chat AI</span>
            </Link>
            <Link href="/image" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors" title="Image AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="hidden md:inline">Image AI</span>
            </Link>
            <Link href="/code" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white bg-surface-elevated rounded-lg transition-colors" title="Code AI">
              <svg className="w-5 h-5 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <span className="hidden md:inline">Code AI</span>
            </Link>
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
            
            {messages.map(m => {
              const parts = (m as { parts?: MessagePart[] }).parts;
              const textContent = parts?.filter(p => p.type === 'text').map(p => p.text).join('') || (m as { content?: string }).content || '';
              return (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`text-sm p-3 rounded-lg max-w-[90%] ${m.role === 'user' ? 'bg-ai-blue text-white' : 'bg-surface-elevated text-gray-200'}`}>
                    <div className="whitespace-pre-wrap">{textContent}</div>
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <div className="w-2 h-2 rounded-full bg-ai-blue animate-ping"></div>
                <span>Claude is writing code...</span>
              </div>
            )}
          </div>
          
          <form onSubmit={handleFormSubmit} className="p-3 border-t border-border-brand">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={customInput} 
                onChange={(e) => setCustomInput(e.target.value)} 
                placeholder="Ask to refactor, write a function..." 
                className="flex-1 bg-surface-dark border border-border-brand rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-ai-blue"
              />
              <button type="submit" disabled={isLoading} className="btn-primary py-2 px-3 text-sm disabled:opacity-50">
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Interactive Code Sandbox */}
        <div className="flex-1 flex flex-col bg-background">
          <header className="h-14 border-b border-border-brand flex items-center justify-between px-6 bg-surface-dark">
            <div className="flex items-center space-x-3">
              <span className="text-xs bg-surface-elevated px-2.5 py-1 rounded text-text-secondary border border-border-brand">main.ts</span>
              <span className="text-xs text-text-secondary">TypeScript v5.0</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  try {
                    const result = new Function(code)();
                    alert("Executed successfully: " + result);
                  } catch (err: unknown) {
                    const msg = err instanceof Error ? err.message : 'Unknown execution error';
                    alert("Execution Error: " + msg);
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-lg shadow-emerald-900/20"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                <span>Run Code</span>
              </button>
              <button className="btn-secondary py-1.5 px-3 text-xs">Copy</button>
            </div>
          </header>
          
          <div className="flex-1 relative font-mono text-sm">
            <textarea 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              className="w-full h-full bg-[#121214] text-gray-200 p-6 focus:outline-none resize-none font-mono text-sm leading-relaxed"
              spellCheck="false"
            />
          </div>
        </div>

      </main>
    </div>
  );
}
