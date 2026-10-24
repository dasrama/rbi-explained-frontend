import React from "react";
import { Server, Database, Clock, BarChart2 } from "lucide-react";

export default function SystemHealthKpis({ health }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Backend API Health */}
      <div className="terminal-panel p-4 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>BACKEND API HEALTH</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <div className="mt-2">
          <div className="text-xl font-display font-bold text-white tracking-tight">
            Online <span className="text-xs font-mono text-slate-400">(v1.0.0)</span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
            <span>⚡ 99.96% Uptime (30d)</span>
          </div>
        </div>
      </div>

      {/* 2. Database Storage */}
      <div className="terminal-panel p-4 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>DATABASE STORAGE</span>
          <Database className="w-3.5 h-3.5 text-blue-400" />
        </div>

        <div className="mt-2">
          <div className="text-xl font-display font-bold text-white tracking-tight">
            PostgreSQL/Timescale
          </div>
          <div className="mt-1 text-[11px] font-mono text-blue-400">
            Connection Pool 12/20 Active
          </div>
        </div>
      </div>

      {/* 3. Last Automated Ingest */}
      <div className="terminal-panel p-4 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>LAST AUTOMATED INGEST</span>
          <Clock className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <div className="mt-2">
          <div className="text-sm font-mono font-bold text-white tracking-tight">
            14 Oct 2026, 17:42 UTC
          </div>
          <div className="mt-1 text-[11px] font-mono text-emerald-400 font-semibold">
            ✓ Completed Cleanly (0 errors)
          </div>
        </div>
      </div>

      {/* 4. Tracked Observations */}
      <div className="terminal-panel p-4 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>TRACKED OBSERVATIONS</span>
          <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        <div className="mt-2">
          <div className="text-xl font-display font-bold text-emerald-400 tracking-tight">
            48,624 Series Points
          </div>
          <div className="mt-1 text-[11px] font-mono text-slate-400">
            Distributed Across 14 Series
          </div>
        </div>
      </div>

    </div>
  );
}
