import React from "react";
import { 
  TrendingUp, 
  Layers, 
  Sliders, 
  BarChart3, 
  History,
  AlertTriangle 
} from "lucide-react";

export default function KeyStatsStrip({ indicator, onOpenRevision }) {
  if (!indicator) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
      
      {/* 1. Current YoY Rate */}
      <div className="glass-panel p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>CURRENT YOY RATE</span>
          <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400" />
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              {indicator.code === "USD_INR_REF_RATE" ? `₹${indicator.latest_value}` : 
               indicator.code === "REPO_RATE" ? `${indicator.latest_value}%` :
               indicator.yoy_change ? `${indicator.yoy_change}%` : `${indicator.latest_value}`}
            </span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
              {indicator.code === "USD_INR_REF_RATE" ? "Spot" : "YoY"}
            </span>
          </div>

          <div className="mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-xs font-mono text-amber-900 dark:text-amber-300 font-bold">
              <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              Upper Half of Band (2-6%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Current Index Level */}
      <div className="glass-panel p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>CURRENT INDEX LEVEL</span>
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              {indicator.latest_value}
            </span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">pts</span>
          </div>

          <div className="mt-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            Base: 2024 = 100.0
          </div>
        </div>
      </div>

      {/* 3. 52-Week Range */}
      <div className="glass-panel p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>52-WEEK RANGE</span>
          <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="mt-2.5">
          <div className="text-sm font-mono font-bold text-slate-900 dark:text-white tracking-tight">
            3.65% to 5.85%
          </div>

          {/* Visual Slider Meter */}
          <div className="mt-2.5 w-full bg-slate-200 dark:bg-[#0b0f19] h-2 border border-slate-300 dark:border-[#334155] overflow-hidden relative">
            <div
              className="bg-blue-600 dark:bg-[#3b82f6] h-full"
              style={{ width: "84%" }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Low 3.65%</span>
            <span>High 5.85%</span>
          </div>
        </div>
      </div>

      {/* 4. 1-Yr Moving Average */}
      <div className="glass-panel p-4 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>1-YR MOVING AVERAGE</span>
          <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">4.78%</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">12M Mean</span>
          </div>

          <div className="mt-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
            +78 bps vs Central Target
          </div>
        </div>
      </div>

      {/* 5. Last Revised Series */}
      <div 
        onClick={onOpenRevision}
        className="glass-panel p-4 hover:border-blue-500 cursor-pointer transition-colors flex flex-col justify-between group shadow-sm"
      >
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
          <span>LAST REVISED SERIES</span>
          <History className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-45 transition-transform" />
        </div>

        <div className="mt-2.5">
          <div className="text-sm font-mono font-bold text-blue-700 dark:text-blue-300">
            July 2026
          </div>

          <div className="mt-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold leading-tight">
            +0.36 index pts <span className="text-slate-500 dark:text-slate-400 font-normal">in final release</span>
          </div>
        </div>
      </div>

    </div>
  );
}
