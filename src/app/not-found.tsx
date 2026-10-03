import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-ai-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <h1 className="text-9xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-br from-ai-blue to-ai-purple mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Neural Link Severed</h2>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          The page you are looking for has been relocated, deleted, or never existed in this dimension of the workspace.
        </p>
        <Link href="/" className="inline-block bg-surface-elevated hover:bg-surface-dark border border-border-brand text-white font-medium px-6 py-3 rounded-xl transition-all">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
