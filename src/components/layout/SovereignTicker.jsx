import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function SovereignTicker() {
  const tickerItems = [
    { label: "CPI Headline", value: "5.66% YoY", meta: "Target: 4.0% ±2%", trend: "up", color: "text-red-400" },
    { label: "USD/INR", value: "₹84.05", meta: "+0.14% Day", trend: "up", color: "text-blue-400" },
    { label: "Repo Rate", value: "6.50%", meta: "Neutral Stance", trend: "neutral", color: "text-emerald-400" },
    { label: "UPI Volume", value: "15,042M Txns", meta: "₹20.64L Cr", trend: "up", color: "text-emerald-400" },
    { label: "Forex Reserves", value: "$704.88B", meta: "All-Time High", trend: "up", color: "text-amber-400" },
    { label: "WPI Inflation", value: "1.84%", meta: "Producer Costs Modest", trend: "down", color: "text-emerald-400" },
    { label: "WACR Call Rate", value: "6.43%", meta: "Target 6.50%", trend: "neutral", color: "text-slate-300" },
    { label: "Bank Credit", value: "+13.8% YoY", meta: "Retail/Services", trend: "up", color: "text-blue-400" },
  ];

  return (
    <div className="w-full bg-[#070a12] border-b border-[#1e293b] text-[11px] font-mono tracking-wider text-slate-400 py-1.5 px-3 overflow-hidden flex items-center select-none">
      <div className="flex items-center gap-1.5 shrink-0 pr-4 border-r border-[#334155] text-slate-300 font-semibold uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-slate-200">SOVEREIGN TICKER (RBI/FBIL)</span>
      </div>

      <div className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-none gap-6 pl-4 animate-marquee hover:pause">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">{item.label}:</span>
            <span className={`font-semibold ${item.color}`}>{item.value}</span>
            <span className="text-slate-500 text-[10px]">({item.meta})</span>
            <span className="text-slate-600 font-bold">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
