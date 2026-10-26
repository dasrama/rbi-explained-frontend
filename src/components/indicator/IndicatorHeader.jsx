import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  ExternalLink, 
  Download, 
  Share2 
} from "lucide-react";

export default function IndicatorHeader({ indicator, onOpenJsonFeed, onCiteSeries }) {
  if (!indicator) return null;

  return (
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 mb-3">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Macro Overview</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
        <span className="text-slate-600 dark:text-slate-400">{indicator.category?.name || "Inflation & Price Indices"}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
        <span className="text-slate-900 dark:text-slate-100 font-bold">{indicator.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Title & Metadata */}
        <div>
          {/* Badges Strip */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5 font-mono text-xs">
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-[#0b0f19] text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900 font-bold uppercase">
              {indicator.code}
            </span>

            <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-[#334155] font-medium uppercase">
              FREQUENCY: {indicator.frequency}
            </span>

            <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-[#334155] font-medium uppercase">
              UNIT: {indicator.units}
            </span>

            {indicator.is_provisional && (
              <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Provisional Figure Active [P]
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {indicator.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 mt-2">
            <span>Primary Reference: <strong className="text-slate-800 dark:text-slate-200">{indicator.source?.name || "RBI Monetary Policy Bulletin & MOSPI NSO"}</strong></span>
            <span>•</span>
            <span>Latest Observation Window: August 2026</span>
            <span>•</span>
            <a
              href={indicator.source?.base_url || "https://www.rbi.org.in"}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 underline underline-offset-2 font-semibold"
            >
              <span>View Sovereign Release Document</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Action Matrix */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
          
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">SOVEREIGN MANDATE STATUS:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-300 font-bold text-xs">
              Corridor: Upper Quadrant
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={onOpenJsonFeed}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-[#334155] border border-slate-300 dark:border-[#334155] text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Series Data</span>
            </button>

            <button
              onClick={onCiteSeries}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-[#334155] border border-slate-300 dark:border-[#334155] text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Cite Series</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
