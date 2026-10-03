import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Pulsing logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-blue to-ai-purple flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] animate-pulse mb-6">
          <span className="text-white text-3xl font-bold font-mono">Z</span>
        </div>
        
        {/* Loading track */}
        <div className="w-48 h-1 bg-surface-dark rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-ai-blue to-ai-purple w-1/2 animate-[slide_1.5s_ease-in-out_infinite_alternate] rounded-full"></div>
        </div>
        
        <p className="text-sm text-text-secondary font-mono mt-4 animate-pulse">Initializing Orchestrator...</p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}
