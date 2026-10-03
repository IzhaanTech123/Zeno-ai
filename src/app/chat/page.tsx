// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Sidebar } from '@/components/Sidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatInterface() {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [model, setModel] = useState('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  // @ts-ignore
  const { messages, sendMessage, status } = useChat({
    api: '/api/ai/chat',
    body: {
      model,
      conversationId: "default-convo-id" // Replace with dynamic ID if needed
    }
  });

  const isLoading = status === 'in_progress';
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !files?.length) return;
    
    // Convert FileList to an array of URLs for attachments (in real code we'd upload them or read them as base64)
    const attachments: any[] = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Note: For simplicity in prototype, creating a local object URL or reading as base64
        // The Vercel AI SDK handles attachments.
        const base64Url = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        attachments.push({ url: base64Url, name: file.name, contentType: file.type });
      }
    }

    sendMessage({ 
      role: 'user', 
      content: input, 
      experimental_attachments: attachments 
    });
    
    setInput('');
    setFiles(null);
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="w-64 bg-surface-dark border-r border-border-brand flex flex-col justify-between relative z-10 shadow-2xl animate-in slide-in-from-left-full duration-200">
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-mono">Z</span>
                  </div>
                  <span className="text-lg font-bold tracking-wide">ZENO AI</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-text-secondary hover:text-white p-1">
                  ✕
                </button>
              </div>
              <nav className="space-y-1">
                <a href="/" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white bg-surface-elevated rounded-lg transition-colors" title="Chat AI">
                  <svg className="w-5 h-5 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  <span>Chat AI</span>
                </a>
                <a href="/image" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors" title="Image AI">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>Image AI</span>
                </a>
                <a href="/code" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors" title="Code AI">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  <span>Code AI</span>
                </a>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <header className="h-14 border-b border-border-brand flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex flex-1 items-center overflow-hidden">
            <button 
              className="md:hidden mr-3 text-text-secondary hover:text-white shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <span className="font-semibold text-sm truncate">Zeno Default Model (Vision Enabled)</span>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4 shrink-0">
            <div className="hidden md:flex items-center gap-3">
              {/* Limit Warning (#24) */}
              <div className="text-[11px] font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                You've used 80% of your allowance.
              </div>
              
              {/* Smart Usage Indicator (#23) */}
              <a href="/dashboard" className="text-[11px] font-medium text-text-secondary hover:text-white bg-surface-elevated px-2.5 py-1 rounded-md border border-border-brand transition-colors cursor-pointer">
                80% usage
              </a>
            </div>

            <button className="w-8 h-8 rounded-full bg-surface-elevated border border-border-brand flex items-center justify-center text-sm font-medium">
              U
            </button>
          </div>
        </header>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth pb-40 md:pb-40">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  <span className="text-white text-3xl font-bold font-mono">Z</span>
                </div>
                <h2 className="text-3xl font-bold mb-3">Welcome to Zeno AI</h2>
                <p className="text-text-secondary mb-10 text-lg">What would you like to do?</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  <button onClick={() => setInput("Can you explain quantum computing in simple terms?")} className="bg-surface-elevated hover:bg-surface-elevated/80 border border-border-brand/50 hover:border-ai-blue transition-all p-4 rounded-xl text-left flex flex-col gap-2">
                    <span className="text-ai-blue"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                    <span className="font-medium text-sm">Ask a question</span>
                  </button>
                  <button onClick={() => setInput("Summarize this document: ")} className="bg-surface-elevated hover:bg-surface-elevated/80 border border-border-brand/50 hover:border-ai-purple transition-all p-4 rounded-xl text-left flex flex-col gap-2">
                    <span className="text-ai-purple"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></span>
                    <span className="font-medium text-sm">Analyze a document</span>
                  </button>
                  <button onClick={() => setInput("Write a blog post about the future of AI")} className="bg-surface-elevated hover:bg-surface-elevated/80 border border-border-brand/50 hover:border-success transition-all p-4 rounded-xl text-left flex flex-col gap-2">
                    <span className="text-success"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></span>
                    <span className="font-medium text-sm">Write something</span>
                  </button>
                  <button onClick={() => setInput("Generate an image of a futuristic city")} className="bg-surface-elevated hover:bg-surface-elevated/80 border border-border-brand/50 hover:border-warning transition-all p-4 rounded-xl text-left flex flex-col gap-2">
                    <span className="text-orange-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></span>
                    <span className="font-medium text-sm">Generate an image</span>
                  </button>
                  <button onClick={() => setInput("Search the web for the latest news on SpaceX")} className="bg-surface-elevated hover:bg-surface-elevated/80 border border-border-brand/50 hover:border-cyan-400 transition-all p-4 rounded-xl text-left flex flex-col gap-2">
                    <span className="text-cyan-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg></span>
                    <span className="font-medium text-sm">Search the web</span>
                  </button>
                  <button onClick={() => setInput("Write a Python script to scrape a website")} className="bg-surface-elevated hover:bg-surface-elevated/80 border border-border-brand/50 hover:border-pink-500 transition-all p-4 rounded-xl text-left flex flex-col gap-2">
                    <span className="text-pink-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></span>
                    <span className="font-medium text-sm">Write code</span>
                  </button>
                </div>
              </div>
            )}

            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={m.role === 'user' 
                  ? "bg-surface-elevated px-4 py-2.5 md:px-5 md:py-3 rounded-2xl max-w-[90%] md:max-w-[80%] rounded-tr-sm"
                  : "max-w-[100%] md:max-w-[90%] space-y-4"
                }>
                  {m.role !== 'user' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded bg-ai-blue flex items-center justify-center">
                        <span className="text-white text-xs font-bold font-mono">Z</span>
                      </div>
                      <span className="text-sm font-semibold">Zeno</span>
                    </div>
                  )}
                  
                  {/* Handle Image Display if attachments exist */}
                  {/* @ts-ignore */}
                  {m.experimental_attachments && m.experimental_attachments.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {/* @ts-ignore */}
                      {m.experimental_attachments.map((attachment: any, index: number) => (
                        <img 
                          key={index}
                          src={attachment.url} 
                          alt="Attachment" 
                          className="w-32 md:w-48 h-auto rounded-lg border border-border-brand"
                        />
                      ))}
                    </div>
                  )}

                  <div className={`leading-relaxed ${m.role === 'user' ? 'text-white whitespace-pre-wrap' : 'prose prose-invert max-w-none text-text-secondary'}`}>
                    {m.role === 'user' ? (
                      m.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') || (m as any).content
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') || (m as any).content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {isLoading && (
               <div className="flex justify-start">
                  <div className="max-w-[90%] space-y-4 animate-pulse">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded bg-ai-blue flex items-center justify-center">
                        <span className="text-white text-xs font-bold font-mono">Z</span>
                      </div>
                      <span className="text-sm font-semibold">Zeno</span>
                    </div>
                    <div className="text-text-secondary">Analyzing...</div>
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-16 md:bottom-0 left-0 right-0 p-3 md:p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-3xl mx-auto">
            
            {/* File Preview Thumbnail */}
            {files && files.length > 0 && (
              <div className="mb-2 flex gap-2">
                {Array.from(files).map((file, i) => (
                  <div key={i} className="bg-surface-elevated text-xs px-3 py-1 rounded-full border border-border-brand flex items-center gap-2">
                    <span className="truncate max-w-[100px]">{file.name}</span>
                    <button onClick={() => setFiles(null)} className="text-text-secondary hover:text-white">✕</button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={onSubmit} className="relative flex flex-col w-full bg-surface-dark border border-border-brand rounded-xl focus-within:border-ai-blue focus-within:ring-1 focus-within:ring-ai-blue transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(e.target.files);
                  }
                }}
              />

              <textarea 
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if((input || '').trim() || files?.length) {
                      const form = e.currentTarget.form;
                      if(form) form.requestSubmit();
                    }
                  }
                }}
                className="w-full max-h-48 min-h-[52px] bg-transparent text-white placeholder:text-text-secondary p-3 resize-none outline-none leading-relaxed" 
                placeholder="Ask Zeno anything..."
                rows={1}
              />
              
              {/* Bottom Toolbar */}
              <div className="flex items-center justify-between p-2 pt-0">
                <div className="flex items-center space-x-1 text-text-secondary">
                  <button type="button" className="p-2 hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:text-white hover:bg-surface-elevated rounded-lg transition-colors"
                    title="Upload Image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  </button>
                  <button type="button" className="p-2 hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select 
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="bg-surface-elevated text-text-secondary text-xs font-medium rounded-lg px-2.5 py-1.5 outline-none border border-border-brand/50 appearance-none pr-7 relative focus:text-white transition-colors cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    <option value="auto">Zeno Auto</option>
                    <option value="gpt-4o">Zeno Fast</option>
                    <option value="claude-3-5-sonnet">Zeno Reasoning</option>
                    <option value="gemini-1.5-pro">Zeno Vision</option>
                    <option value="ollama">Zeno Creative</option>
                  </select>
                  
                  <button type="submit" disabled={(!(input || '').trim() && !files?.length) || isLoading} className="p-2 text-white bg-ai-blue hover:bg-ai-blue/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center mt-2">
              <span className="text-[11px] text-text-secondary">Zeno AI Vision is enabled. You can upload screenshots, documents, and images for analysis.</span>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-dark border-t border-border-brand flex justify-around items-center px-2 pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <a href="/chat" className="flex flex-col items-center justify-center p-2 text-ai-blue w-16">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className="text-[10px] mt-1 font-medium">Chat</span>
        </a>
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center justify-center p-2 text-text-secondary hover:text-white transition-colors w-16">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[10px] mt-1 font-medium">History</span>
        </button>
        <a href="/code" className="flex flex-col items-center justify-center p-2 text-text-secondary hover:text-white transition-colors w-16">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          <span className="text-[10px] mt-1 font-medium">Projects</span>
        </a>
        <a href="/settings" className="flex flex-col items-center justify-center p-2 text-text-secondary hover:text-white transition-colors w-16">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-[10px] mt-1 font-medium">Account</span>
        </a>
      </nav>
    </div>
  );
}
