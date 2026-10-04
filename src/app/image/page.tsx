"use client";

import React, { useState } from 'react';

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Using pollinations.ai for free instant image generation prototyping
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;
    
    // Preload image to avoid showing empty box
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
    };
    img.onerror = () => {
      alert("Failed to generate image. Please try again.");
      setIsGenerating(false);
    };
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR (Shared layout - typically abstracted to a layout.tsx component) */}
      <aside className="w-64 bg-surface-dark border-r border-border-brand flex flex-col justify-between hidden md:flex">
        <div className="p-4 space-y-6">
          <div className="flex items-center space-x-2 px-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">Z</span>
            </div>
            <span className="text-lg font-bold tracking-wide">ZENO AI</span>
          </div>

          <nav className="space-y-1">
            <a href="/chat" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span>Chat AI</span>
            </a>
            <a href="/image" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-5 h-5 text-ai-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>Image AI</span>
            </a>
            <a href="/code" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors" title="Code AI">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <span>Code AI</span>
            </a>
          </nav>
        </div>
      </aside>

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
                <a href="/chat" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  <span>Chat AI</span>
                </a>
                <a href="/image" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white bg-surface-elevated rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-ai-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
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
        <header className="h-14 border-b border-border-brand flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex flex-1 items-center overflow-hidden">
            <button 
              className="md:hidden mr-3 text-text-secondary hover:text-white shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <span className="font-semibold text-sm truncate">Zeno Vision Generation</span>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <button className="btn-primary text-sm px-4 py-1.5 hidden md:block">Upgrade to Pro</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth pb-40">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            
            <div className="text-center py-10">
              <h2 className="text-3xl font-bold mb-2">Create anything you can imagine.</h2>
              <p className="text-text-secondary">Powered by Zeno Vision.</p>
            </div>

            {/* Generated Image Display */}
            {generatedImage && (
              <div className="flex justify-center mb-8 animate-in fade-in zoom-in duration-500">
                <div className="relative group rounded-xl overflow-hidden border border-border-brand shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={generatedImage} alt="Generated AI Art" className="w-full max-w-2xl h-auto object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <button className="btn-secondary bg-surface-dark border-border-brand">Download</button>
                     <button className="btn-primary">Generate Variations</button>
                  </div>
                </div>
              </div>
            )}
            
            {isGenerating && (
              <div className="flex justify-center py-20">
                <div className="space-y-4 text-center animate-pulse">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-surface-elevated border border-ai-purple flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-ai-purple border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-text-secondary text-sm">Rendering pixels...</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleGenerate} className="relative flex items-end w-full bg-surface-dark border border-border-brand rounded-xl overflow-hidden focus-within:border-ai-purple focus-within:ring-1 focus-within:ring-ai-purple transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)]">
              
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if(prompt.trim()) {
                      const form = e.currentTarget.form;
                      if(form) form.requestSubmit();
                    }
                  }
                }}
                className="w-full max-h-48 min-h-[60px] bg-transparent text-white placeholder:text-text-secondary p-4 resize-none outline-none leading-relaxed text-lg" 
                placeholder="Describe the image you want to generate..."
                rows={1}
              />
              
              <button type="submit" disabled={!prompt.trim() || isGenerating} className="p-3 m-2 px-6 text-white bg-ai-purple hover:bg-ai-purple/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center font-medium">
                Generate
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
