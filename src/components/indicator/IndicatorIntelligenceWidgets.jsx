import React from "react";
import { Link } from "react-router-dom";
import { Landmark, GitCompare, ShieldCheck, ArrowRight } from "lucide-react";

export default function IndicatorIntelligenceWidgets({ indicator }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      
      {/* 1. MPC Repo Rate Stance Nexus */}
      <div className="terminal-panel p-5 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider mb-2">
            <Landmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>MONETARY POLICY IMPACT</span>
          </div>

          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
            MPC Repo Rate Stance Nexus
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed font-sans">
            With CPI climbing to 5.66%, headline inflation remains within the statutory 2–6% corridor but presses against the 6.00% upper ceiling. This reduces scope for immediate policy easing at the forthcoming Bi-Monthly MPC review.
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-[#1e293b]">
          <Link
            to="/indicators/policy-repo-rate"
            className="text-xs font-mono text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-bold group"
          >
            <span>Read Latest MPC Resolution Minutes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 2. Wholesale Price Divergence */}
      <div className="terminal-panel p-5 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
            <GitCompare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>WPI VS CPI WEDGE</span>
          </div>

          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
            Wholesale Price Divergence
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed font-sans">
            Wholesale Price Index (WPI) currently records 1.84% YoY. The +382 bps gap reflects retail supply markups, transport logistics frictions, and high food weight in CPI (45.86%) versus WPI (24.38%).
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-[#1e293b]">
          <Link
            to="/indicators/wholesale-price-index"
            className="text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 font-bold group"
          >
            <span>Explore WPI Inflation Explorer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 3. External Sector Resilience */}
      <div className="terminal-panel p-5 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>SOVEREIGN STABILITY</span>
          </div>

          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
            External Sector Resilience
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed font-sans">
            India's foreign exchange reserves stand at historic highs above $700 Billion, providing over 11 months of merchandise import cover. This robust buffer anchors currency stability and buffers domestic liquidity from global capital outflow shocks.
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-[#1e293b]">
          <Link
            to="/indicators/forex-reserves"
            className="text-xs font-mono text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1 font-bold group"
          >
            <span>View Sovereign Reserve Buffer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}
