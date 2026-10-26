import React from "react";
import { Zap, Shield, FileCheck } from "lucide-react";

export default function MacroPulseBanner() {
  return (
    <div className="space-y-4 mb-6">
      
      {/* Top Sovereign Mandate Strip & Headline */}
      <div className="terminal-panel p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-blue-50/70 via-white to-slate-50 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-700/60 text-blue-800 dark:text-blue-300 font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                SOVEREIGN STATISTICAL OBSERVATORY
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              The Indian Macroeconomy, <span className="text-blue-600 dark:text-[#3b82f6]">Translated & Verified</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed font-sans">
              Official Reserve Bank of India statistics converted into plain-English economic intelligence, live benchmark corridors, and audit-verified time series.
            </p>
          </div>

          {/* Right Status Matrix */}
          <div className="flex sm:self-start lg:self-center items-center gap-3 shrink-0">
            <div className="bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-[#334155] p-3.5 font-mono text-xs space-y-1 shadow-xs">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center justify-between gap-4 font-medium">
                <span>MPC CYCLE</span>
                <span className="text-slate-900 dark:text-white font-bold">FY2026-27 #4</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span>Stance: Neutral</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-[#334155] p-3.5 font-mono text-xs space-y-1 shadow-xs">
              <div className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center justify-between gap-4 font-medium">
                <span>SHA-256 LEDGER</span>
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

      {/* Quick Macro Pulse Flash Briefing */}
      <div className="terminal-panel p-4 sm:p-5 bg-white dark:bg-[#0a0e18] border border-slate-200 dark:border-[#334155] border-l-4 border-l-blue-600 dark:border-l-[#3b82f6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-700 dark:text-blue-400 font-bold mb-1">
              QUICK MACRO PULSE — Plain-English Flash Briefing
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              Retail inflation is currently at <span className="font-bold text-amber-700 dark:text-amber-300">5.66%</span>, remaining safely within the RBI's statutory <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">2%–6%</span> tolerance corridor despite seasonal vegetable price pressures. The Monetary Policy Committee keeps the benchmark Repo Rate paused at <span className="font-bold text-blue-700 dark:text-blue-400">6.50%</span> with a Neutral stance, while digital payment rails reached a record <span className="font-bold text-emerald-700 dark:text-emerald-400">15,042 Million</span> UPI transactions last month.
            </p>
          </div>
        </div>

        <div className="shrink-0 self-end sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-400 font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SPARKLINE TRAFFIC ACTIVE
          </span>
        </div>
      </div>

    </div>
  );
}
