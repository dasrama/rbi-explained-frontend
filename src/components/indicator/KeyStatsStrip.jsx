import React from "react";
import { 
  TrendingUp, 
  Layers, 
  Sliders, 
  BarChart3, 
  History,
  AlertTriangle 
} from "lucide-react";
import { formatPercent } from "../../utils/formatters";

export default function KeyStatsStrip({ indicator, onOpenRevision }) {
  if (!indicator) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      
      {/* 1. Current YoY Rate */}
      <div className="terminal-panel p-3.5 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>CURRENT YOY RATE</span>
          <TrendingUp className="w-3.5 h-3.5 text-red-400" />
        </div>

        <div className="mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              {indicator.code === "USD_INR_REF_RATE" ? `₹${indicator.latest_value}` : 
               indicator.code === "REPO_RATE" ? `${indicator.latest_value}%` :
               indicator.yoy_change ? `${indicator.yoy_change}%` : `${indicator.latest_value}`}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {indicator.code === "USD_INR_REF_RATE" ? "Spot" : "YoY"}
            </span>
          </div>

          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-950/70 border border-amber-800 text-[9px] font-mono text-amber-300">
              <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />
              Upper Half of Band (2-6%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Current Index Level */}
      <div className="terminal-panel p-3.5 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>CURRENT INDEX LEVEL</span>
          <Layers className="w-3.5 h-3.5 text-blue-400" />
        </div>

        <div className="mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              {indicator.latest_value}
            </span>
            <span className="text-[10px] font-mono text-slate-400">pts</span>
          </div>

          <div className="mt-1.5 text-[10px] font-mono text-slate-400">
            Base: 2024 = 100.0
          </div>
        </div>
      </div>

      {/* 3. 52-Week Range */}
      <div className="terminal-panel p-3.5 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>52-WEEK RANGE</span>
          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        <div className="mt-2">
          <div className="text-sm font-mono font-bold text-white tracking-tight">
            3.65% to 5.85%
          </div>

          {/* Visual Slider Meter */}
          <div className="mt-2.5 w-full bg-[#0b0f19] h-1.5 border border-[#334155] overflow-hidden relative">
            <div
              className="bg-[#3b82f6] h-full"
              style={{ width: "84%" }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-[8px] font-mono text-slate-500">
            <span>Low 3.65%</span>
            <span>High 5.85%</span>
          </div>
        </div>
      </div>

      {/* 4. 1-Yr Moving Average */}
      <div className="terminal-panel p-3.5 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>1-YR MOVING AVERAGE</span>
          <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
        </div>

        <div className="mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-bold text-white tracking-tight">4.78%</span>
            <span className="text-[10px] font-mono text-slate-400">12M Mean</span>
          </div>

          <div className="mt-1.5 text-[10px] font-mono text-emerald-400 font-semibold">
            +78 bps vs Central Target
          </div>
        </div>
      </div>

      {/* 5. Last Revised Series */}
      <div 
        onClick={onOpenRevision}
        className="terminal-panel p-3.5 bg-[#0f172a] border border-[#334155] hover:border-[#3b82f6] cursor-pointer transition-colors flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>LAST REVISED SERIES</span>
          <History className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-45 transition-transform" />
        </div>

        <div className="mt-2">
          <div className="text-sm font-mono font-bold text-blue-300">
            July 2026
          </div>

          <div className="mt-1.5 text-[10px] font-mono text-emerald-400 font-semibold leading-tight">
            +0.36 index pts <span className="text-slate-400 font-normal">in final MOSPI release</span>
          </div>
        </div>
      </div>

    </div>
  );
}
