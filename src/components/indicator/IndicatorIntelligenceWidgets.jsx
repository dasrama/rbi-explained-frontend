import React from "react";
import { Link } from "react-router-dom";
import { Landmark, GitCompare, Code2, ArrowRight, ExternalLink } from "lucide-react";

export default function IndicatorIntelligenceWidgets({ indicator, onOpenApiDocs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      {/* 1. MPC Repo Rate Stance Nexus */}
      <div className="terminal-panel p-4 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-wider mb-2">
            <Landmark className="w-3.5 h-3.5 text-blue-400" />
            <span>MONETARY POLICY IMPACT</span>
          </div>

          <h3 className="text-sm font-display font-bold text-white">
            MPC Repo Rate Stance Nexus
          </h3>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
            With CPI climbing to 5.66%, headline inflation remains within the statutory 2–6% corridor but presses against the 6.00% upper ceiling. This reduces scope for immediate policy easing at the forthcoming Bi-Monthly MPC review.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#1e293b]">
          <Link
            to="/indicators/policy-repo-rate"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold group"
          >
            <span>Read Latest MPC Resolution Minutes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 2. Wholesale Price Divergence */}
      <div className="terminal-panel p-4 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
            <GitCompare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WPI VS CPI WEDGE</span>
          </div>

          <h3 className="text-sm font-display font-bold text-white">
            Wholesale Price Divergence
          </h3>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
            Wholesale Price Index (WPI) currently records 1.84% YoY. The +382 bps gap reflects retail supply markups, transport logistics frictions, and high food weight in CPI (45.86%) versus WPI (24.38%).
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#1e293b]">
          <Link
            to="/indicators/wholesale-price-index"
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold group"
          >
            <span>Explore WPI Inflation Explorer</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 3. API Integration Feed */}
      <div className="terminal-panel p-4 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 font-semibold uppercase tracking-wider mb-2">
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>API INTEGRATION</span>
          </div>

          <h3 className="text-sm font-display font-bold text-white">
            Automated Ingestion Feed
          </h3>

          {/* Monospace API endpoint callout */}
          <div className="mt-2 p-2 bg-[#0b0f19] border border-[#1e293b] font-mono text-[10px] text-emerald-400 break-all select-all">
            GET /api/v1/indicators/{indicator?.code || "CPI_COMBINED_GENERAL"}?horizon=2Y&amp;format=json&amp;revisions=true
          </div>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
            Access programmatic time series and revision metadata in real time with sub-millisecond caching for algorithmic macro terminals.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#1e293b]">
          <button
            onClick={onOpenApiDocs}
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold group"
          >
            <span>Open Interactive Swagger Docs</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
