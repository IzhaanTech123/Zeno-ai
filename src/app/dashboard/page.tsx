import React from 'react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Sidebar } from '@/components/Sidebar';

export default async function Dashboard() {
  // Fetch real conversations from Prisma Memory
  const conversations = await prisma.conversation.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 5,
    include: {
      _count: {
        select: { messages: true }
      }
    }
  });

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <header className="h-14 border-b border-border-brand flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex-1">
            <span className="font-semibold text-sm">Dashboard Overview</span>
          </div>
          <div className="flex items-center space-x-4">
             <a href="/pricing" className="btn-secondary text-xs px-3 py-1">Upgrade</a>
            <button className="w-8 h-8 rounded-full bg-surface-elevated border border-border-brand flex items-center justify-center text-sm font-medium">
              U
            </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
          
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back.</h1>
            <p className="text-text-secondary">Here is what's happening in your workspace today.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/chat" className="bg-gradient-to-br from-surface-elevated to-surface-dark border border-border-brand hover:border-ai-blue rounded-xl p-6 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-ai-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <svg className="w-5 h-5 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="font-semibold mb-1">Start Chatting</h3>
              <p className="text-sm text-text-secondary">Talk to Zeno Orchestrator, analyze images, or ask questions.</p>
            </a>
            <a href="/image" className="bg-gradient-to-br from-surface-elevated to-surface-dark border border-border-brand hover:border-ai-purple rounded-xl p-6 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-ai-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <svg className="w-5 h-5 text-ai-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-semibold mb-1">Generate Images</h3>
              <p className="text-sm text-text-secondary">Create stunning, hyper-realistic images using Zeno Vision.</p>
            </a>
            <a href="/code" className="bg-gradient-to-br from-surface-elevated to-surface-dark border border-border-brand hover:border-success rounded-xl p-6 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="font-semibold mb-1">Open Workstation</h3>
              <p className="text-sm text-text-secondary">Write, run, and debug code instantly in the sandbox.</p>
            </a>
          </div>

          {/* Zeno AI Usage Dashboard */}
          <div className="bg-surface-elevated border border-border-brand rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Zeno AI Usage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-surface-dark border border-border-brand rounded-xl p-4">
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Current Plan</div>
                <div className="text-xl font-bold text-ai-blue">Zeno Pro</div>
              </div>
              <div className="bg-surface-dark border border-border-brand rounded-xl p-4">
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Billing Period</div>
                <div className="text-sm font-bold text-white mt-1">Sept 28 – Oct 28</div>
              </div>
              <div className="bg-surface-dark border border-border-brand rounded-xl p-4">
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Remaining Tokens</div>
                <div className="text-xl font-bold text-success">28,000</div>
              </div>
              <div className="bg-surface-dark border border-border-brand rounded-xl p-4">
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Estimated Reset</div>
                <div className="text-xl font-bold text-white">12 days</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Monthly Usage Breakdown */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Monthly Usage</h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">Text</span>
                      <span className="text-text-secondary">72,000 / 100,000 tokens</span>
                    </div>
                    <div className="w-full bg-surface-dark rounded-full h-2">
                      <div className="bg-ai-blue h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">Images</span>
                      <span className="text-text-secondary">14 / 50 generations</span>
                    </div>
                    <div className="w-full bg-surface-dark rounded-full h-2">
                      <div className="bg-ai-purple h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">Web Search</span>
                      <span className="text-text-secondary">43 / 100 searches</span>
                    </div>
                    <div className="w-full bg-surface-dark rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '43%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">Voice</span>
                      <span className="text-text-secondary">18 / 60 minutes</span>
                    </div>
                    <div className="w-full bg-surface-dark rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">Files</span>
                      <span className="text-text-secondary">2.4 GB / 10 GB</span>
                    </div>
                    <div className="w-full bg-surface-dark rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Example */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Daily Token Usage</h3>
                <div className="bg-surface-dark border border-border-brand rounded-xl p-5 font-mono text-xs text-ai-blue/80 flex flex-col justify-between h-48">
                  <div className="flex items-end gap-3 h-full pb-2 border-b border-border-brand/50">
                    <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                      <div className="w-full bg-ai-blue rounded-sm" style={{ height: '40%' }}></div>
                      <span className="text-text-secondary">Mon</span>
                    </div>
                    <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                      <div className="w-full bg-ai-blue rounded-sm" style={{ height: '70%' }}></div>
                      <span className="text-text-secondary">Tue</span>
                    </div>
                    <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                      <div className="w-full bg-ai-blue rounded-sm" style={{ height: '50%' }}></div>
                      <span className="text-text-secondary">Wed</span>
                    </div>
                    <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                      <div className="w-full bg-ai-blue rounded-sm" style={{ height: '90%' }}></div>
                      <span className="text-text-secondary">Thu</span>
                    </div>
                    <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                      <div className="w-full bg-ai-blue rounded-sm" style={{ height: '80%' }}></div>
                      <span className="text-text-secondary">Fri</span>
                    </div>
                    <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                      <div className="w-full bg-ai-blue rounded-sm" style={{ height: '100%' }}></div>
                      <span className="text-text-secondary">Sat</span>
                    </div>
                    <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                      <div className="w-full bg-ai-blue rounded-sm" style={{ height: '30%' }}></div>
                      <span className="text-text-secondary">Sun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects / DB Memory Chats */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Chat History</h3>
              <button className="text-sm text-ai-blue hover:underline">View all</button>
            </div>
            
            <div className="bg-surface-elevated border border-border-brand rounded-xl overflow-hidden">
              <div className="divide-y divide-border-brand">
                {conversations.length === 0 ? (
                   <div className="p-8 text-center text-text-secondary">
                     No chats yet. Go to Chat AI to start a conversation!
                   </div>
                ) : (
                  conversations.map((chat) => (
                    <div key={chat.id} className="p-4 flex justify-between items-center hover:bg-surface-dark/50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-ai-blue/10 flex items-center justify-center">
                           <svg className="w-4 h-4 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{chat.title || "Untitled Chat"}</div>
                          <div className="text-xs text-text-secondary">Chat • {new Date(chat.updatedAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-xs text-text-secondary">{chat._count.messages} messages</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
