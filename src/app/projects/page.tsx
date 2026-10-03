"use client";

import React, { useState } from 'react';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const projects = [
    { id: 1, type: 'chat', title: 'Architecture Brainstorm', date: '2 hours ago', meta: '8 messages', color: 'ai-blue' },
    { id: 2, type: 'image', title: 'Cyberpunk City Concept', date: 'Yesterday', meta: '4 variations', color: 'ai-purple' },
    { id: 3, type: 'code', title: 'React Component Refactor', date: '3 days ago', meta: 'main.ts', color: 'success' },
    { id: 4, type: 'chat', title: 'Marketing Copy Generation', date: 'Last week', meta: '12 messages', color: 'ai-blue' },
    { id: 5, type: 'image', title: 'Logo Design Mockups', date: 'Last week', meta: '8 variations', color: 'ai-purple' },
    { id: 6, type: 'code', title: 'Stripe API Webhook', date: '2 weeks ago', meta: 'webhook.ts', color: 'success' },
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.type === activeTab);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-surface-dark border-r border-border-brand flex flex-col justify-between hidden md:flex">
        <div className="p-4 space-y-6">
          <div className="flex items-center space-x-2 px-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">Z</span>
            </div>
            <span className="text-lg font-bold tracking-wide">ZENO AI</span>
          </div>

          <nav className="space-y-1">
            <a href="/dashboard" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span>Dashboard</span>
            </a>
            <a href="/chat" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span>Chat AI</span>
            </a>
            <a href="/image" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>Image AI</span>
            </a>
            <a href="/code" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <span>Code AI</span>
            </a>
            <a href="/projects" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              <span>Projects</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <header className="h-14 border-b border-border-brand flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex-1">
            <span className="font-semibold text-sm">Project Library</span>
          </div>
          <div className="flex items-center space-x-4">
             <button className="btn-primary text-xs px-4 py-1.5 flex items-center gap-2">
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
               New Project
             </button>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Your Projects</h1>
              <p className="text-text-secondary">Manage and organize all your Zeno AI generated content.</p>
            </div>
            
            <div className="flex items-center space-x-2 bg-surface-dark p-1 rounded-lg border border-border-brand">
              <button onClick={() => setActiveTab('all')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'all' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white'}`}>All</button>
              <button onClick={() => setActiveTab('chat')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'chat' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white'}`}>Chats</button>
              <button onClick={() => setActiveTab('image')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'image' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white'}`}>Images</button>
              <button onClick={() => setActiveTab('code')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'code' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white'}`}>Code</button>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-surface-elevated border border-border-brand hover:border-text-secondary rounded-xl p-5 cursor-pointer transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-${project.color}/10 flex items-center justify-center`}>
                      {project.type === 'chat' && <svg className={`w-5 h-5 text-${project.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                      {project.type === 'image' && <svg className={`w-5 h-5 text-${project.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                      {project.type === 'code' && <svg className={`w-5 h-5 text-${project.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                    </div>
                    <button className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate">{project.title}</h3>
                  <div className="flex justify-between items-center mt-4 text-xs text-text-secondary">
                    <span>{project.meta}</span>
                    <span>{project.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-surface-dark border border-border-brand flex items-center justify-center">
                <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white">No Projects Found</h3>
              <p className="text-text-secondary max-w-sm mx-auto">You don't have any projects in this category yet. Create a new one to get started.</p>
              <button className="btn-primary mt-4">Create New Project</button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
