"use client";

import React, { useState, useEffect } from 'react';

export function Sidebar() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeOffers, setActiveOffers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && !data.error) setUserProfile(data);
      })
      .catch(console.error);

    fetch('/api/offers')
      .then(res => res.ok ? res.json() : [])
      .then(data => setActiveOffers(data))
      .catch(console.error);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExploreOpen(false);
        setIsAccountMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-surface-dark border-r border-border-brand flex flex-col justify-between hidden md:flex shrink-0`}>
      <div className="p-4 space-y-6 flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Brand Logo & Collapse Toggle */}
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} px-2`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center">
                <span className="text-white text-xs font-bold font-mono">Z</span>
              </div>
              <span className="text-lg font-bold tracking-wide">ZENO AI</span>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1 text-text-secondary hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
          </button>
        </div>

        {/* New Chat Button */}
        <button 
          onClick={() => window.location.href = '/chat'} 
          className={`w-full flex items-center justify-center bg-ai-blue hover:bg-ai-blue/90 text-white py-2.5 rounded-lg transition-colors font-medium text-sm ${isSidebarCollapsed ? 'px-0' : 'space-x-2'}`}
        >
          {isSidebarCollapsed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          ) : (
            <>
              <span>+ New Chat</span>
              <span className="text-[10px] opacity-70 ml-2 hidden lg:inline">Ctrl+Shift+O</span>
            </>
          )}
        </button>

        {/* Navigation */}
        <nav className="space-y-1">
          <a href="/chat" className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3 px-3'} py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            {!isSidebarCollapsed && <span>Chat</span>}
          </a>
          <a href="/pricing" className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-3'} py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors`}>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              {!isSidebarCollapsed && <span>Free Offer</span>}
            </div>
            {!isSidebarCollapsed && activeOffers.length > 0 && <span className="text-[9px] bg-ai-purple text-white px-1.5 py-0.5 rounded font-bold">NEW</span>}
          </a>
          
          {/* Explore (Optional Navigation Items) */}
          {!isSidebarCollapsed && (
            <div className="pt-2">
              <button 
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  <span>Explore</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              {isExploreOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <a href="/models" className="block px-3 py-1.5 text-sm text-text-secondary hover:text-white rounded-md hover:bg-surface-elevated">AI Models</a>
                  <a href="/image" className="block px-3 py-1.5 text-sm text-text-secondary hover:text-white rounded-md hover:bg-surface-elevated">Image Generation</a>
                  <a href="/search" className="block px-3 py-1.5 text-sm text-text-secondary hover:text-white rounded-md hover:bg-surface-elevated">Web Search</a>
                  <a href="/vision" className="block px-3 py-1.5 text-sm text-text-secondary hover:text-white rounded-md hover:bg-surface-elevated">Vision</a>
                  <a href="/voice" className="block px-3 py-1.5 text-sm text-text-secondary hover:text-white rounded-md hover:bg-surface-elevated">Voice</a>
                  <a href="/code" className="block px-3 py-1.5 text-sm text-text-secondary hover:text-white rounded-md hover:bg-surface-elevated">Code</a>
                  <a href="/documents" className="block px-3 py-1.5 text-sm text-text-secondary hover:text-white rounded-md hover:bg-surface-elevated">Documents</a>
                </div>
              )}
            </div>
          )}

          {!isSidebarCollapsed && (
            <>
              <div className="pt-4 pb-1">
                <div className="px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Today</div>
                <a href="#" className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors group">
                  <span className="truncate pr-2">How to build an AI model</span>
                  <div className="hidden group-hover:flex items-center space-x-1 shrink-0">
                    <button className="text-text-secondary hover:text-white"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    <button className="text-text-secondary hover:text-warning"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </a>
              </div>
            </>
          )}
          
          <a href="/code" className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3 px-3'} py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            {!isSidebarCollapsed && <span>Workstation</span>}
          </a>
        </nav>
      </div>

      {/* Account Section - Bottom of Sidebar */}
      <div className={`border-t border-border-brand relative ${isSidebarCollapsed ? 'p-2 flex justify-center' : 'p-4'}`}>
        {/* Account Dropdown */}
        {isAccountMenuOpen && !isSidebarCollapsed && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-surface-dark border border-border-brand rounded-xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-150">
            <div className="p-3 border-b border-border-brand/50">
              <div className="font-semibold text-white">{userProfile?.name || 'Guest User'}</div>
              <div className="text-xs text-text-secondary">{userProfile?.email || 'Sign in to sync'}</div>
              <div className="text-xs text-ai-blue font-bold mt-1">Zeno {userProfile?.plan || 'Free'}</div>
            </div>
            <div className="p-1">
              <a href="/profile" className="flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span>Profile</span>
              </a>
              <a href="/settings" className="flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Settings</span>
              </a>
              <a href="/billing" className="flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                <span>Subscription</span>
              </a>
              <a href="/usage" className="flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <span>Usage</span>
              </a>
              <a href="/security" className="flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span>Security</span>
              </a>
              <a href="/support" className="flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Help & Support</span>
              </a>
            </div>
            <div className="p-1 border-t border-border-brand/50">
              {userProfile?.role === 'ADMIN' && (
                <a href="/admin" className="flex items-center space-x-3 px-3 py-2 text-sm text-ai-blue hover:text-ai-blue/80 hover:bg-ai-blue/10 rounded-lg transition-colors mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                  <span>Admin Panel</span>
                </a>
              )}
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => !isSidebarCollapsed && setIsAccountMenuOpen(!isAccountMenuOpen)}
          className={`w-full text-left bg-surface-elevated hover:bg-surface-elevated/80 rounded-xl ${isSidebarCollapsed ? 'p-2 flex items-center justify-center' : 'p-3 flex flex-col gap-3'} transition-colors border ${isAccountMenuOpen ? 'border-ai-blue' : 'border-border-brand/50'}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">{userProfile ? (userProfile.name?.substring(0,2).toUpperCase() || 'GU') : ''}</span>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col truncate flex-1">
                {userProfile ? (
                  <>
                    <span className="text-sm font-semibold text-white truncate">{userProfile.name || 'Guest User'}</span>
                    <span className="text-[11px] text-ai-blue font-medium tracking-wide">ZENO {userProfile.plan?.toUpperCase() || 'FREE'}</span>
                  </>
                ) : (
                  <div className="animate-pulse flex flex-col gap-1">
                    <div className="h-4 bg-surface-dark rounded w-24"></div>
                    <div className="h-3 bg-surface-dark rounded w-16"></div>
                  </div>
                )}
              </div>
            )}
            {!isSidebarCollapsed && (
              <svg className={`w-4 h-4 text-text-secondary shrink-0 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            )}
          </div>
          
          {!isSidebarCollapsed && (
            userProfile ? (
              <div className="flex flex-col gap-1.5 mt-1 w-full">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-text-secondary">AI Usage</span>
                  <span className="text-white font-mono">72%</span>
                </div>
                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-ai-blue rounded-full w-[72%]"></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-text-secondary mt-0.5">
                  <span>72k / 100k tokens</span>
                  <span>12 days left</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 mt-1 w-full animate-pulse">
                <div className="h-3 bg-surface-dark rounded w-full mb-1"></div>
                <div className="h-1.5 bg-surface-dark rounded-full w-full"></div>
                <div className="h-2 bg-surface-dark rounded w-1/2 mt-0.5"></div>
              </div>
            )
          )}
        </button>
      </div>
    </aside>
  );
}
