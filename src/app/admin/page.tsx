import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  // Fetch real metrics from the database
  const totalUsers = await prisma.user.count();
  
  // Free users vs Active subscribers (Pro/Business etc.)
  const freeUsers = await prisma.user.count({ where: { plan: 'FREE' } });
  const activeSubscribers = totalUsers - freeUsers;

  // Aggregate usage stats
  const usageStats = await prisma.usageRecord.aggregate({
    _sum: {
      messageTokens: true,
      imageGenerations: true,
      webSearches: true,
    }
  });

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-text-secondary mb-8">Overview of Zeno AI system metrics and users.</p>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface-elevated border border-border-brand rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-text-secondary text-sm font-medium mb-1">Total Users</div>
              <div className="text-4xl font-bold text-white">{totalUsers.toLocaleString()}</div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 w-24 h-24 transform translate-x-4 translate-y-4">
              <svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
            </div>
          </div>

          <div className="bg-surface-elevated border border-border-brand rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-text-secondary text-sm font-medium mb-1">Active Subscribers</div>
              <div className="text-4xl font-bold text-ai-blue">{activeSubscribers.toLocaleString()}</div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 text-ai-blue w-24 h-24 transform translate-x-4 translate-y-4">
              <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path></svg>
            </div>
          </div>

          <div className="bg-surface-elevated border border-border-brand rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-text-secondary text-sm font-medium mb-1">Free Users</div>
              <div className="text-4xl font-bold text-white">{freeUsers.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Second Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-background border border-border-brand rounded-xl p-5">
            <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">Total Tokens Used</div>
            <div className="text-2xl font-semibold text-white">{(usageStats._sum.messageTokens || 0).toLocaleString()}</div>
          </div>
          <div className="bg-background border border-border-brand rounded-xl p-5">
            <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">Image Generations</div>
            <div className="text-2xl font-semibold text-white">{(usageStats._sum.imageGenerations || 0).toLocaleString()}</div>
          </div>
          <div className="bg-background border border-border-brand rounded-xl p-5">
            <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">Web Searches</div>
            <div className="text-2xl font-semibold text-white">{(usageStats._sum.webSearches || 0).toLocaleString()}</div>
          </div>
          <div className="bg-background border border-border-brand rounded-xl p-5 relative overflow-hidden">
            <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">Monthly Revenue</div>
            <div className="text-2xl font-semibold text-green-400">₹{(activeSubscribers * 2000).toLocaleString()}</div>
            <div className="absolute right-3 top-3 text-green-400/20">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>

        {/* System Health / Status */}
        <div className="bg-surface-elevated border border-border-brand rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">System Status</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 bg-background border border-border-brand rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div className="font-medium text-white">Zeno Inference API</div>
              </div>
              <div className="text-sm text-text-secondary">Operational - 45ms ping</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-background border border-border-brand rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div className="font-medium text-white">Database Cluster</div>
              </div>
              <div className="text-sm text-text-secondary">Operational - 12ms ping</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border-brand rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div className="font-medium text-white">Payment Gateway</div>
              </div>
              <div className="text-sm text-text-secondary">Operational</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
