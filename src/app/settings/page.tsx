"use client";

import React, { useState, useEffect } from 'react';

interface UserProfile {
  id?: string;
  name?: string | null;
  email?: string | null;
  plan?: string;
  role?: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUserProfile(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

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
            <a href="/settings" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white bg-surface-elevated rounded-lg transition-colors">
              <svg className="w-4 h-4 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <header className="h-14 border-b border-border-brand flex items-center px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <span className="font-semibold text-sm">Account Settings</span>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-12">
          
          {/* Settings Nav */}
          <div className="w-full md:w-48 space-y-1">
            <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white hover:bg-surface-dark'}`}>Profile</button>
            <button onClick={() => setActiveTab('appearance')} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${activeTab === 'appearance' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white hover:bg-surface-dark'}`}>Appearance</button>
            <button onClick={() => setActiveTab('billing')} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${activeTab === 'billing' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white hover:bg-surface-dark'}`}>Billing & Usage</button>
            <button onClick={() => setActiveTab('api')} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${activeTab === 'api' ? 'bg-surface-elevated text-white' : 'text-text-secondary hover:text-white hover:bg-surface-dark'}`}>API Keys</button>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === 'appearance' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Appearance</h2>
                  <p className="text-text-secondary text-sm">Customize how Zeno AI looks on your device.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-surface-elevated border border-border-brand rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-ai-blue transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      </div>
                      <div>
                        <div className="font-medium">Light</div>
                        <div className="text-xs text-text-secondary">Clean and bright</div>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-border-brand flex items-center justify-center"></div>
                  </div>
                  
                  <div className="bg-surface-elevated border border-ai-blue rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-ai-blue/5"></div>
                    <div className="flex items-center space-x-4 relative">
                      <div className="w-10 h-10 rounded-full bg-black border border-border-brand flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                      </div>
                      <div>
                        <div className="font-medium text-ai-blue">Dark</div>
                        <div className="text-xs text-text-secondary">Easy on the eyes</div>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-ai-blue flex items-center justify-center relative">
                      <div className="w-2.5 h-2.5 bg-ai-blue rounded-full"></div>
                    </div>
                  </div>

                  <div className="bg-surface-elevated border border-border-brand rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-ai-blue transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-surface-dark border border-border-brand flex items-center justify-center">
                        <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div>
                        <div className="font-medium">System</div>
                        <div className="text-xs text-text-secondary">Matches your OS setting</div>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-border-brand flex items-center justify-center"></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-brand">
                  <button onClick={handleSave} className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Public Profile</h2>
                  <p className="text-text-secondary text-sm">This is how others will see you on the platform.</p>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-surface-elevated border border-border-brand flex items-center justify-center text-xl font-bold">Z</div>
                    <button className="btn-secondary text-sm">Upload Avatar</button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">First Name</label>
                      <input type="text" defaultValue="Zeno" className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-2.5 focus:border-ai-blue outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Last Name</label>
                      <input type="text" defaultValue="Builder" className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-2.5 focus:border-ai-blue outline-none transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Email Address</label>
                    <input type="email" disabled defaultValue="you@company.com" className="w-full bg-surface-dark/50 border border-border-brand text-text-secondary rounded-lg px-4 py-2.5 opacity-70 cursor-not-allowed" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border-brand flex justify-end">
                  <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
                    {isSaving && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Billing & Usage</h2>
                  <p className="text-text-secondary text-sm">Manage your subscription and monitor API limits.</p>
                </div>
                
                <div className="bg-surface-elevated border border-ai-blue/30 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ai-blue/20 rounded-full blur-[50px]"></div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-ai-blue font-bold uppercase tracking-wider mb-1">Current Plan</div>
                      <h3 className="text-2xl font-bold">{userProfile?.plan === "PRO" ? "Zeno Pro" : "Zeno Free"}</h3>
                      <p className="text-text-secondary text-sm mt-1">{userProfile?.plan === "PRO" ? "$20.00 / month" : "Free Forever"}</p>
                    </div>
                    {userProfile?.plan === "PRO" ? (
                      <button className="btn-secondary">Manage via Stripe</button>
                    ) : (
                      <button onClick={async () => {
                        const res = await fetch("/api/checkout", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email: userProfile?.email, planId: "price_1ZenoPlaceholderPriceID" })
                        });
                        const data = await res.json();
                        if (data.url) window.location.href = data.url;
                      }} className="btn-primary flex items-center gap-2">
                        <span>Upgrade to Pro</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-1">API Keys &amp; Providers</h2>
                  <p className="text-text-secondary text-sm">Configure your personal LLM API keys or use the default free models.</p>
                </div>

                <div className="bg-surface-elevated border border-border-brand rounded-xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Google Gemini API Key (Free Tier)</label>
                    <input type="password" placeholder="AIzaSy..." className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-2.5 outline-none focus:border-ai-blue" />
                    <p className="text-xs text-text-secondary mt-1">Get your free key from Google AI Studio (15 req/min free).</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">OpenAI API Key (Optional)</label>
                    <input type="password" placeholder="sk-..." className="w-full bg-surface-dark border border-border-brand text-white rounded-lg px-4 py-2.5 outline-none focus:border-ai-blue" />
                  </div>

                  <div className="pt-2">
                    <button onClick={handleSave} className="btn-primary">
                      {isSaving ? 'Saving...' : 'Save Keys'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
