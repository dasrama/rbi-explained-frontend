import React from "react";
import { Zap, Shield, FileCheck } from "lucide-react";

export default function MacroPulseBanner() {
  return (
    <div className="space-y-4 mb-6">
      
      {/* Hero Section with animated mesh gradient */}
      <div className="terminal-panel relative overflow-hidden border border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#000000] shadow-sm">
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, #334155 39px, #334155 40px),
                              repeating-linear-gradient(90deg, transparent, transparent 39px, #334155 39px, #334155 40px)`,
          }}
        />

        <div className="relative px-6 sm:px-8 py-7 sm:py-9">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 flex-1 min-w-0">
              {/* Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-700/60 text-blue-800 dark:text-blue-300 font-bold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  SOVEREIGN STATISTICAL OBSERVATORY
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                The Indian Macroeconomy,{" "}
                <span className="text-blue-600 dark:text-[#3B82F6 ]">
                  Translated &amp; Verified
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans">
                Official Reserve Bank of India statistics converted into plain-English economic intelligence, live benchmark corridors, and audit-verified time series.
              </p>
            </div>

            {/* Right Status Matrix */}
            <div className="flex sm:self-start lg:self-center items-center gap-3 shrink-0">
              <div className="bg-white dark:bg-[#000000] border border-slate-200 dark:border-[#1e293b] p-3.5 font-mono text-xs space-y-1 shadow-xs">
                <div className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center justify-between gap-4 font-medium">
                  <span>MPC CYCLE</span>
                  <span className="text-slate-900 dark:text-white font-bold">FY2026-27 #4</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span>Stance: Neutral</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#000000] border border-slate-200 dark:border-[#1e293b] p-3.5 font-mono text-xs space-y-1 shadow-xs">
                <div className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                  SHA-256 LEDGER
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                  <FileCheck className="w-4 h-4" />
                  <span>Zero Tamper</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">1,498 Records Sync</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Flash Briefing Bar — compact, scannable */}
      <div className="terminal-panel p-4 sm:p-5 bg-white dark:bg-[#000000] border border-slate-200 dark:border-[#1e293b] border-l-4 border-l-blue-600 dark:border-l-[#3B82F6 ] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800/80 shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-blue-700 dark:text-blue-400 font-bold mb-1">
              MACRO PULSE — Plain-English Flash Briefing
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              Retail inflation is at{" "}
              <span className="font-bold text-amber-700 dark:text-amber-300">5.66%</span>, safely within the RBI's{" "}
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">2%–6%</span>{" "}
              tolerance corridor. The MPC holds the Repo Rate at{" "}
              <span className="font-bold text-blue-700 dark:text-blue-400">6.50%</span>{" "}
              with a Neutral stance, while UPI rails cleared{" "}
              <span className="font-bold text-emerald-700 dark:text-emerald-400">15,042M</span>{" "}
              transactions last month.
            </p>
          </div>
        </div>

        <div className="shrink-0 self-end sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-400 font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE DATA
          </span>
        </div>
      </div>

    </div>
  );
}
