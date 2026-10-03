"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Users', path: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Plans & Offers', path: '/admin/plans', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'System Usage', path: '/admin/usage', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];

  return (
    <aside className="w-64 bg-surface-dark border-r border-border-brand flex flex-col justify-between hidden md:flex shrink-0 h-full">
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-border-brand/50 flex items-center justify-between sticky top-0 bg-surface-dark z-10">
          <Link href="/admin" className="flex items-center space-x-2 text-white">
            <div className="w-6 h-6 rounded bg-ai-blue flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">Z</span>
            </div>
            <span className="font-semibold tracking-wide">Zeno <span className="text-ai-blue">Admin</span></span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          <div className="text-xs font-semibold text-text-secondary px-3 mb-2 uppercase tracking-wider">Management</div>
          
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${pathname === item.path ? 'bg-ai-blue/10 text-ai-blue font-medium' : 'text-text-secondary hover:text-white hover:bg-surface-elevated'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span>{item.name}</span>
            </Link>
          ))}
          
          <div className="mt-8 text-xs font-semibold text-text-secondary px-3 mb-2 uppercase tracking-wider">Actions</div>
          
          <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2.5 text-text-secondary hover:text-white hover:bg-surface-elevated rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span>Exit to App</span>
          </a>
        </div>
      </div>

      {/* Account Section */}
      <div className="border-t border-border-brand relative p-4 bg-surface-dark">
        {isAccountMenuOpen && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-surface-elevated border border-border-brand rounded-xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-bottom-2 duration-150">
            <div className="p-3 border-b border-border-brand/50">
              <div className="font-semibold text-white">{user?.name}</div>
              <div className="text-xs text-text-secondary">{user?.email}</div>
            </div>
            <div className="p-1 border-t border-border-brand/50">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
          className={`w-full text-left bg-background hover:bg-surface-elevated/80 rounded-xl p-3 flex flex-col gap-3 transition-colors border ${isAccountMenuOpen ? 'border-ai-blue' : 'border-border-brand/50'}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-9 h-9 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 border border-red-500/50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div className="flex flex-col truncate flex-1">
              <span className="text-sm font-semibold text-white truncate">{user?.name || 'Admin User'}</span>
              <span className="text-[11px] text-red-400 font-medium tracking-wide">SYSTEM ADMIN</span>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
