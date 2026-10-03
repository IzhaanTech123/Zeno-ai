import { Sidebar } from "@/components/Sidebar";

export default function HistoryPage() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center relative p-8">
        <div className="max-w-md text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-surface-dark border border-border-brand flex items-center justify-center">
            <svg className="w-10 h-10 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">No History Yet</h2>
            <p className="text-text-secondary">Your conversation history will appear here. Start a new chat to begin interacting with Zeno AI.</p>
          </div>
          <a href="/chat" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ai-blue text-white rounded-xl font-medium hover:bg-ai-blue/90 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Start New Chat
          </a>
        </div>
      </main>
    </div>
  );
}
