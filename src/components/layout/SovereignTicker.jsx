import React from "react";

export default function SovereignTicker() {
  const tickerItems = [
    { label: "CPI Headline", value: "5.66% YoY", meta: "Target: 4.0% ±2%", trend: "up", color: "text-red-600 dark:text-red-400" },
    { label: "USD/INR", value: "₹84.05", meta: "+0.14% Day", trend: "up", color: "text-blue-700 dark:text-blue-400" },
    { label: "Repo Rate", value: "6.50%", meta: "Neutral Stance", trend: "neutral", color: "text-emerald-700 dark:text-emerald-400" },
    { label: "UPI Volume", value: "15,042M Txns", meta: "₹20.64L Cr", trend: "up", color: "text-emerald-700 dark:text-emerald-400" },
    { label: "Forex Reserves", value: "$704.88B", meta: "All-Time High", trend: "up", color: "text-amber-700 dark:text-amber-400" },
    { label: "WPI Inflation", value: "1.84%", meta: "Producer Costs Modest", trend: "down", color: "text-emerald-700 dark:text-emerald-400" },
    { label: "WACR Call Rate", value: "6.43%", meta: "Target 6.50%", trend: "neutral", color: "text-slate-700 dark:text-slate-300" },
    { label: "Bank Credit", value: "+13.8% YoY", meta: "Retail/Services", trend: "up", color: "text-blue-700 dark:text-blue-400" },
  ];

  return (
    <div className="w-full bg-slate-100 dark:bg-[#070a12] border-b border-slate-200 dark:border-[#1e293b] text-xs font-mono tracking-wider text-slate-600 dark:text-slate-300 py-1.5 px-3 overflow-hidden flex items-center select-none transition-colors">
      <div className="flex items-center gap-1.5 shrink-0 pr-4 border-r border-slate-300 dark:border-[#334155] text-slate-800 dark:text-slate-200 font-semibold uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-slate-900 dark:text-slate-100 font-bold">SOVEREIGN TICKER (RBI/FBIL)</span>
      </div>

      <div className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-none gap-6 pl-4 animate-marquee hover:pause">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}:</span>
            <span className={`font-bold ${item.color}`}>{item.value}</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs font-normal">({item.meta})</span>
            <span className="text-slate-400 dark:text-slate-600 font-bold">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
