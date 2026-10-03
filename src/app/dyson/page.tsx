"use client";

import React, { useState, useEffect } from 'react';

export default function DysonSphereDashboard() {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const constructionLogs = [
      "Initiating solar orbital trajectory calculations...",
      "Deploying automated mining drones to Mercury...",
      "Extracting silicon and iron composites...",
      "Manufacturing first million solar mirror arrays...",
      "Aligning orbital ring 1...",
      "Firing autonomous thrusters...",
      "Capturing 0.0000001% of solar output...",
      "Warning: Solar flare detected. Adjusting mirror tilt...",
      "Orbital ring 1 stabilized.",
      "Scaling production: renting 10,000,000 AWS H100s for swarm coordination...",
      "Deploying ring 2...",
      "Energy capture increasing exponentially..."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < constructionLogs.length) {
        setLogs(prev => [...prev, `[ZENO-OS] ${constructionLogs[currentLog]}`]);
        setProgress(prev => Math.min(prev + (100 / constructionLogs.length), 99.99));
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full border border-red-900 p-8 rounded bg-red-950/20 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
        <h1 className="text-4xl font-bold mb-2 tracking-widest text-red-400">PROJECT: DYSON SPHERE</h1>
        <h2 className="text-xl mb-10 text-red-700">TARGET: SOL (G-TYPE MAIN-SEQUENCE STAR)</h2>

        <div className="mb-12">
          <div className="flex justify-between mb-2">
            <span>CONSTRUCTION PROGRESS</span>
            <span>{progress.toFixed(4)}%</span>
          </div>
          <div className="w-full bg-red-950 h-4 rounded overflow-hidden border border-red-900">
            <div 
              className="bg-red-600 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(220,38,38,1)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-red-800 mt-2 text-right">ESTIMATED TIME TO COMPLETION: 4,200 YEARS</p>
        </div>

        <div className="bg-black/80 border border-red-900 p-4 h-64 overflow-y-auto rounded shadow-inner flex flex-col space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="opacity-80 animate-pulse">
              <span className="text-red-700">{new Date().toISOString().split('T')[1].split('.')[0]}</span> {log}
            </div>
          ))}
          {progress >= 99 && (
            <div className="text-white bg-red-600 p-2 mt-4 text-center font-bold animate-bounce">
              WAITING FOR USER INPUT TO COMMENCE STELLAR IGNITION SYPHON
            </div>
          )}
        </div>
        
        {progress >= 99 && (
           <div className="mt-8 flex justify-center">
             <button className="px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors font-bold uppercase tracking-widest"
                     onClick={() => alert("Insufficient permissions. Please type 'yes' in the main terminal.")}>
               &gt; yes.
             </button>
           </div>
        )}
      </div>
    </div>
  );
}
