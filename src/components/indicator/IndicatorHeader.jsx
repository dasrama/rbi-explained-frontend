import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  ExternalLink, 
  Code, 
  Bookmark, 
  Share2, 
  ShieldCheck 
} from "lucide-react";

export default function IndicatorHeader({ indicator, onOpenJsonFeed, onCiteSeries }) {
  if (!indicator) return null;

  return (
    <div className="terminal-panel p-5 mb-6 bg-[#0f172a]">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-3">
        <Link to="/" className="hover:text-blue-400 transition-colors">Macro Overview</Link>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-slate-400">{indicator.category?.name || "Inflation & Price Indices"}</span>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-slate-200 font-semibold">{indicator.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Title & Metadata */}
        <div>
          {/* Badges Strip */}
          <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-[10px]">
            <span className="px-2 py-0.5 bg-[#0b0f19] text-blue-400 border border-blue-900 font-semibold uppercase">
              {indicator.code}
            </span>

            <span className="px-2 py-0.5 bg-[#0b0f19] text-slate-300 border border-[#334155] uppercase">
              FREQUENCY: {indicator.frequency}
            </span>

            <span className="px-2 py-0.5 bg-[#0b0f19] text-slate-300 border border-[#334155] uppercase">
              UNIT: {indicator.units}
            </span>

            {indicator.is_provisional && (
              <span className="px-2 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Provisional Figure Active [P]
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {indicator.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-1.5">
            <span>Primary Reference: {indicator.source?.name || "RBI Monetary Policy Bulletin & MOSPI NSO"}</span>
            <span>•</span>
            <span>Latest Observation Window: August 2026</span>
            <span>•</span>
            <a
              href={indicator.source?.base_url || "https://www.rbi.org.in"}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 underline underline-offset-2"
            >
              <span>View Sovereign Release Document</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Action Matrix */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5 shrink-0">
          
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">SOVEREIGN MANDATE STATUS:</span>
            <span className="px-2.5 py-0.5 bg-blue-950/70 border border-blue-700 text-blue-300 font-semibold text-[11px]">
              Corridor: Upper Quadrant
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={onOpenJsonFeed}
              className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-blue-400" />
              <span>Series Feed (JSON)</span>
            </button>

            <button
              onClick={onCiteSeries}
              className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Cite Series</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
