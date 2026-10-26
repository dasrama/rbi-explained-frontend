import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function TransparencyHeader() {
  return (
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>OFFICIAL DATA GOVERNANCE & SOVEREIGN PROVENANCE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Data Governance & Sovereign Publication Provenance
          </h1>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed font-sans">
            Every economic data series displayed on this platform is reconciled directly against official Reserve Bank of India (RBI), Ministry of Statistics and Programme Implementation (MoSPI), and National Payments Corporation (NPCI) primary gazettes, preserving complete historical revision chains.
          </p>
        </div>

        {/* Right Badges */}
        <div className="flex sm:self-start lg:self-center items-center gap-3 shrink-0">
          <div className="px-3.5 py-1.5 bg-emerald-50 dark:bg-[#0b0f19] border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 font-mono text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold">Zero-Tamper Ledger Active</span>
          </div>

          <div className="px-3.5 py-1.5 bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] text-slate-800 dark:text-slate-300 font-mono text-xs flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Verified Central Bank Releases</span>
          </div>
        </div>

      </div>
    </div>
  );
}
