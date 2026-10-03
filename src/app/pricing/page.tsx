"use client";

import React, { useState } from 'react';

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'business'>('personal');

  const handleCheckout = async (plan: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert("Checkout failed. Please check API keys.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white flex flex-col items-center py-16 px-6 font-sans">
      
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-semibold mb-6">Upgrade your plan</h1>
          
          <div className="flex bg-[#303030] p-1 rounded-full">
            <button 
              onClick={() => setActiveTab('personal')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'personal' ? 'bg-[#424242] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Personal
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'business' ? 'bg-[#424242] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Business
            </button>
          </div>
        </div>

        {activeTab === 'personal' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Free */}
            <div className="bg-[#171717] border border-[#303030] rounded-2xl p-6 flex flex-col">
              <div className="text-sm text-gray-400 font-medium mb-3">Free</div>
              <h3 className="text-2xl font-semibold mb-2">Try Zeno</h3>
              <div className="mb-6 text-gray-400 text-sm h-12 leading-relaxed">See how AI can help find answers, explore ideas, and get things done.</div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">₹0</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
              <button disabled className="w-full bg-[#303030] text-gray-400 py-2.5 rounded-full text-sm font-medium mb-8">Your current plan</button>
              
              <div className="text-sm font-medium mb-4">Start with the basics:</div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Unlimited everyday text chats</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Limited access to image creation</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Limited memory and storage</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Limited voice chats</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Ad supported</li>
              </ul>
            </div>

            {/* Go */}
            <div className="bg-[#171717] border border-[#303030] rounded-2xl p-6 flex flex-col">
              <div className="text-sm text-gray-400 font-medium mb-3">Zeno Go</div>
              <h3 className="text-2xl font-semibold mb-2">Expanded access</h3>
              <div className="mb-6 text-gray-400 text-sm h-12 leading-relaxed">Write, learn, create, and chat more with extended usage of core intelligence.</div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">₹399</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
              <button onClick={() => handleCheckout('go')} className="w-full bg-white text-black hover:bg-gray-200 transition-colors py-2.5 rounded-full text-sm font-medium mb-8">Upgrade to Go</button>
              
              <div className="text-sm font-medium mb-4">Everything in Free, and:</div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> More messages with tools</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> More image creation</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> More memory and storage</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> More voice chats</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> Ad supported</li>
              </ul>
            </div>

            {/* Plus */}
            <div className="bg-[#1b253b] border border-[#2b3a5a] rounded-2xl p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 border border-[#4d6b9f] text-[#81a5e5] text-[10px] font-bold px-2 py-1 rounded">LIMITED TIME</div>
              <div className="text-sm text-[#81a5e5] font-medium mb-3">Zeno Plus</div>
              <h3 className="text-2xl font-semibold mb-2 text-white">Your AI assistant</h3>
              <div className="mb-6 text-gray-300 text-sm h-12 leading-relaxed">Unlock advanced intelligence that adapts to your preferences the more you use it.</div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-3xl font-bold line-through text-gray-500">₹1999</span>
                <span className="text-3xl font-bold text-white">₹0</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
              <button onClick={() => handleCheckout('plus')} className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-colors py-2.5 rounded-full text-sm font-medium mb-8">✦ Claim free offer</button>
              
              <div className="text-sm font-medium mb-4 text-white">Everything in Go, and:</div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Advanced intelligence for complex work</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Higher quality image creation</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Work agent to act across apps</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Expanded memory and 20 GB of storage</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> No ads</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-[#171717] border border-[#303030] rounded-2xl p-6 flex flex-col">
              <div className="text-sm text-gray-400 font-medium mb-3">Zeno Pro</div>
              <h3 className="text-2xl font-semibold mb-2">Maximum power</h3>
              <div className="mb-6 text-gray-400 text-sm h-12 leading-relaxed">For people who rely on our most powerful intelligence throughout the workday.</div>
              <div className="mb-6 flex items-baseline gap-1">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">From</span>
                  <span className="text-3xl font-bold">₹10,699</span>
                </div>
                <span className="text-gray-400 text-sm self-end pb-1"> / month</span>
              </div>
              <button onClick={() => handleCheckout('pro')} className="w-full bg-white text-black hover:bg-gray-200 transition-colors py-2.5 rounded-full text-sm font-medium mb-8">Upgrade to Pro</button>
              
              <div className="text-sm font-medium mb-4">Everything in Plus, and:</div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> Our most capable frontier Pro model</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> More Work and Codex usage</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> Maximum memory and 100 GB of storage</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> Early access to new tools and models</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">✓</span> No ads</li>
              </ul>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
             {/* Free (Personal Context in Business Tab) */}
             <div className="bg-[#171717] border border-[#303030] rounded-2xl p-6 flex flex-col">
              <div className="text-sm text-gray-400 font-medium mb-3">Free</div>
              <h3 className="text-2xl font-semibold mb-2">Try Zeno</h3>
              <div className="mb-6 text-gray-400 text-sm h-12 leading-relaxed">See how AI can help find answers, explore ideas, and get things done in life and work.</div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold">₹0</span>
                <span className="text-gray-400 text-sm"> / month</span>
              </div>
              <button disabled className="w-full bg-[#303030] text-gray-400 py-2.5 rounded-full text-sm font-medium mb-8">Your current plan</button>
              
              <div className="text-sm font-medium mb-4">Start with the basics:</div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Unlimited everyday text chats</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Limited access to image creation</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Limited memory and storage</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Limited voice chats</li>
                <li className="flex items-start gap-3"><span className="text-gray-500 mt-0.5">○</span> Ad supported</li>
              </ul>
            </div>
            
            {/* Business Plan */}
            <div className="bg-[#1b253b] border border-[#2b3a5a] rounded-2xl p-6 flex flex-col relative">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-[#81a5e5] font-medium">Zeno Business</div>
                <div className="flex gap-2">
                  <span className="text-xs text-white bg-[#334155] px-2 py-0.5 rounded-full">Annual</span>
                  <span className="text-xs text-gray-400 px-2 py-0.5">Monthly</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold mb-2 text-white">For growing teams</h3>
              <div className="mb-6 text-gray-300 text-sm leading-relaxed">A secure workspace with company context and flexible user types for any budget.</div>
              
              <div className="mb-4 pb-4 border-b border-[#2b3a5a]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">Standard seat</span>
                  <span className="font-semibold text-white">₹2,250 <span className="text-gray-400 text-xs font-normal">/ month</span></span>
                </div>
                <div className="text-xs text-gray-400">Best for everyday work</div>
              </div>

              <div className="mb-6 pb-4 border-b border-[#2b3a5a]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">Premium seat</span>
                  <span className="font-semibold text-white">₹11,250 <span className="text-gray-400 text-xs font-normal">/ month</span></span>
                </div>
                <div className="text-xs text-gray-400">5x more usage than standard, no 3-hour limit</div>
              </div>

              <button onClick={() => handleCheckout('business')} className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-colors py-2.5 rounded-full text-sm font-medium mb-8">✦ Upgrade to Business</button>
              
              <div className="text-sm font-medium mb-4 text-white">Designed for workspaces:</div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> All Zeno, Zeno Work, and Codex features</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Access across desktop, web, and mobile</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Connect to Google Workspace, Slack, GitHub, Microsoft 365</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Secure workspace with SAML SSO, and MFA</li>
                <li className="flex items-start gap-3"><span className="text-[#81a5e5] mt-0.5">✓</span> Centralized billing and administration</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="text-center mt-12 text-sm text-gray-500">
          Have an existing plan? <a href="#" className="hover:text-white transition-colors underline">See billing help</a>
        </div>
      </div>
    </div>
  );
}
