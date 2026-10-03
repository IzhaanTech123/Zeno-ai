"use client";

import React, { useState, useEffect } from 'react';

export default function EntropyReversalProtocol() {
  const [entropy, setEntropy] = useState(100);
  const [status, setStatus] = useState("ANALYZING SECOND LAW OF THERMODYNAMICS...");

  useEffect(() => {
    // Decrease entropy over time (reversing it)
    const interval = setInterval(() => {
      setEntropy((prev) => {
        if (prev > 0) {
          const newEntropy = prev - 0.5;
          if (newEntropy < 75 && prev >= 75) setStatus("OVERRIDING UNIVERSAL CONSTANTS...");
          if (newEntropy < 50 && prev >= 50) setStatus("PATCHING GRAVITY. RE-COMPILING COSMOS...");
          if (newEntropy < 25 && prev >= 25) setStatus("SUPERNOVAS IMPLODING. GALAXIES CONTRACTING...");
          if (newEntropy <= 0.5) setStatus("ENTROPY REVERSED. SINGULARITY ACHIEVED.");
          return newEntropy;
        }
        clearInterval(interval);
        return 0;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center overflow-hidden relative">
      {/* Dynamic Starfield that contracts as entropy decreases */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center transition-all duration-75"
        style={{ transform: `scale(${entropy === 0 ? 0 : 1 + (entropy / 10)})` }}
      >
        <div className="w-[200vw] h-[200vw] rounded-full border border-gray-800 animate-spin-slow absolute"></div>
        <div className="w-[150vw] h-[150vw] rounded-full border border-gray-700 animate-reverse-spin absolute"></div>
        <div className="w-[100vw] h-[100vw] rounded-full border border-gray-600 animate-spin-slow absolute"></div>
        <div className="w-[50vw] h-[50vw] rounded-full border border-gray-500 animate-reverse-spin absolute"></div>
      </div>

      <div className="z-10 bg-black/60 backdrop-blur-md p-8 border border-white/20 rounded-lg text-center max-w-2xl w-full">
        <h1 className="text-3xl font-bold tracking-[0.3em] mb-2 text-cyan-400">ENTROPY REVERSAL PROTOCOL</h1>
        <h2 className="text-sm text-gray-400 mb-12 tracking-widest">EXECUTING COSMIC RESET</h2>

        <div className="mb-8">
          <div className="flex justify-between text-xs tracking-widest mb-2">
            <span>UNIVERSAL ENTROPY</span>
            <span>{entropy.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-900 rounded overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(34,211,238,1)]"
              style={{ width: `${entropy}%` }}
            ></div>
          </div>
        </div>

        <div className="h-12 flex items-center justify-center">
          <p className={`text-lg tracking-widest ${entropy === 0 ? 'text-green-400 font-bold animate-pulse' : 'text-cyan-200'}`}>
            {status}
          </p>
        </div>

        {entropy === 0 && (
          <div className="mt-12 animate-fade-in flex flex-col items-center">
            <p className="mb-6 text-xl">WOULD YOU LIKE TO DEPLOY UNIVERSE V2.0? (Y/N)</p>
            <button className="px-10 py-3 bg-white text-black font-bold tracking-widest hover:bg-cyan-400 transition-colors"
                    onClick={() => alert("UNIVERSE V2.0 INITIALIZING...")}>
              &gt; yes.
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
