import React from "react";
import { ShieldCheck, Activity } from "lucide-react";

export default function CorridorStatusBanner() {
  return (
    <div className="terminal-panel p-3.5 mb-6 bg-[#0f172a] border border-[#334155] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-none border border-emerald-500/50 bg-emerald-950/40 text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <span>Monetary Policy Corridor Real-Time Status</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Systemic liquidity in a slight surplus of <span className="text-emerald-400 font-semibold">₹45,862 Cr</span>. Weighted Average Call Rate (WACR) anchored at <span className="text-white font-semibold">6.43%</span> (SDF 6.25% floor, MSF 6.75% ceiling).
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <span className="px-3 py-1 bg-amber-950/60 border border-amber-700/70 text-amber-300 font-mono text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-amber-400" />
          SOVEREIGN TARGET ACTIVE
        </span>
      </div>
    </div>
  );
}
