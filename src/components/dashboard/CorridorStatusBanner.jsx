import React from "react";
import { ShieldCheck, Activity } from "lucide-react";

export default function CorridorStatusBanner() {
  return (
    <div className="terminal-panel p-4 mb-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-none border border-emerald-300 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
        </div>
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-2">
            <span>Monetary Policy Corridor Real-Time Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-mono mt-1 leading-relaxed">
            Systemic liquidity in a slight surplus of <strong className="text-emerald-700 dark:text-emerald-400 font-bold">₹45,862 Cr</strong>. Weighted Average Call Rate (WACR) anchored at <strong className="text-slate-900 dark:text-white font-bold">6.43%</strong> (SDF 6.25% floor, MSF 6.75% ceiling).
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <span className="px-3 py-1.5 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/70 text-amber-900 dark:text-amber-300 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          SOVEREIGN TARGET ACTIVE
        </span>
      </div>
    </div>
  );
}
