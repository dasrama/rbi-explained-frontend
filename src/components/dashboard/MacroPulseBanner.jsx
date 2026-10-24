import React from "react";
import { Zap, Shield, FileCheck } from "lucide-react";

export default function MacroPulseBanner() {
  return (
    <div className="space-y-4 mb-6">
      
      {/* Top Sovereign Mandate Strip */}
      <div className="terminal-panel p-4 sm:p-5 relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-blue-950/70 border border-blue-700/60 text-blue-300 uppercase tracking-wider">
                <Shield className="w-3 h-3 text-blue-400" />
                SOVEREIGN STATISTICAL OBSERVATORY
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                RBI Act, 1934 Section 45ZB MPC Mandate
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              The Indian Macroeconomy, <span className="text-[#3b82f6]">Translated & Verified</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Official Reserve Bank of India statistics converted into plain-English economic intelligence, live benchmark corridors, and audit-verified time series.
            </p>
          </div>

          {/* Right Status Matrix */}
          <div className="flex sm:self-start lg:self-center items-center gap-3 shrink-0">
            <div className="bg-[#0b0f19] border border-[#334155] p-3 font-mono text-[11px] space-y-1">
              <div className="text-slate-400 text-[10px] flex items-center justify-between gap-4">
                <span>MPC CYCLE</span>
                <span className="text-white font-semibold">FY2026-27 #4</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                <span>Stance: Neutral</span>
              </div>
            </div>

            <div className="bg-[#0b0f19] border border-[#334155] p-3 font-mono text-[11px] space-y-1">
              <div className="text-slate-400 text-[10px] flex items-center justify-between gap-4">
                <span>SHA-256 LEDGER STATE</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Zero Tamper</span>
              </div>
              <div className="text-slate-500 text-[9px]">1,498 Records Sync</div>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Macro Pulse Flash Briefing */}
      <div className="terminal-panel p-3.5 sm:p-4 bg-[#0a0e18] border-l-4 border-l-[#3b82f6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-950/60 border border-blue-800/80 text-blue-400 shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold mb-0.5">
              QUICK MACRO PULSE — Plain-English Flash Briefing
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-snug">
              Retail inflation is currently at <span className="font-semibold text-amber-300">5.66%</span>, remaining safely within the RBI's statutory <span className="font-mono text-emerald-400">2%–6%</span> tolerance corridor despite seasonal vegetable price pressures. The Monetary Policy Committee keeps the benchmark Repo Rate paused at <span className="font-semibold text-blue-400">6.50%</span> with a Neutral stance, while digital payment rails reached a record <span className="font-semibold text-emerald-400">15,042 Million</span> UPI transactions last month.
            </p>
          </div>
        </div>

        <div className="shrink-0 self-end sm:self-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 font-semibold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            SPARKLINE TRAFFIC ACTIVE
          </span>
        </div>
      </div>

    </div>
  );
}
