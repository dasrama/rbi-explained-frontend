import React from "react";
import { ShieldCheck, Clock, Terminal } from "lucide-react";

export default function TransparencyHeader() {
  return (
    <div className="terminal-panel p-5 mb-6 bg-[#0f172a]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>ADMINISTRATIVE GOVERNANCE & DATA PROVENANCE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Data Provenance, Freshness & Central Bank Audit Trail
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
            Every economic data point displayed on this platform is cryptographically verified against official Reserve Bank of India (RBI) and MOSPI publications, preserving full historical revision chains.
          </p>
        </div>

        {/* Right Badges */}
        <div className="flex sm:self-start lg:self-center items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 bg-[#0b0f19] border border-emerald-800 text-emerald-400 font-mono text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold">Zero-Tamper Ledger Active</span>
          </div>

          <div className="px-3 py-1.5 bg-[#0b0f19] border border-[#334155] text-slate-300 font-mono text-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>CRON Ingestion: 20m Cadence</span>
          </div>
        </div>

      </div>
    </div>
  );
}
