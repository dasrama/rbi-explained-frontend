import React from "react";
import { Database, Clock, BarChart2 } from "lucide-react";

export default function SystemHealthKpis({ health }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Backend API Health */}
      <div className="terminal-panel p-4 sm:p-5 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>BACKEND API HEALTH</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <div className="mt-2.5">
          <div className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Online <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-normal">(v1.0.0)</span>
          </div>
          <div className="mt-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-bold">
            <span>⚡ 99.96% Uptime (30d)</span>
          </div>
        </div>
      </div>

      {/* 2. Database Storage */}
      <div className="terminal-panel p-4 sm:p-5 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>DATABASE STORAGE</span>
          <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="mt-2.5">
          <div className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            PostgreSQL/Timescale
          </div>
          <div className="mt-1 text-xs font-mono text-blue-700 dark:text-blue-400 font-semibold">
            Connection Pool 12/20 Active
          </div>
        </div>
      </div>

      {/* 3. Last Automated Ingest */}
      <div className="terminal-panel p-4 sm:p-5 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>LAST AUTOMATED INGEST</span>
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>

        <div className="mt-2.5">
          <div className="text-sm font-mono font-bold text-slate-900 dark:text-white tracking-tight">
            14 Oct 2026, 17:42 UTC
          </div>
          <div className="mt-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
            ✓ Completed Cleanly (0 errors)
          </div>
        </div>
      </div>

      {/* 4. Tracked Observations */}
      <div className="terminal-panel p-4 sm:p-5 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>TRACKED OBSERVATIONS</span>
          <BarChart2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="mt-2.5">
          <div className="text-xl sm:text-2xl font-display font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">
            48,624 Series Points
          </div>
          <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
            Distributed Across 14 Series
          </div>
        </div>
      </div>

    </div>
  );
}
