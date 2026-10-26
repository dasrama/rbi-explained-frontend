import React from "react";
import { Link } from "react-router-dom";
import { 
  Scale, 
  ArrowRight,
  History,
  FileText
} from "lucide-react";

export default function MacroEconomicsPrimer() {
  return (
    <div className="space-y-6">
      
      {/* Inflation Target Primer */}
      <div className="glass-panel p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>MONETARY ECONOMICS PRIMER</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            How Does the Reserve Bank Target Inflation?
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed font-sans max-w-4xl">
            The Central Government, in consultation with the Reserve Bank of India, sets a flexible inflation target of <strong className="text-slate-900 dark:text-white">4.0% with a statutory tolerance band of ±2%</strong> (2% minimum to 6% maximum). When headline retail inflation exceeds 6% or dips under 2% for three consecutive quarters, the central bank initiates formal remedial action plans.
          </p>

          {/* 3 Corridor Target Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            
            <div className="p-4 bg-red-50/70 dark:bg-[#0b0f19] border border-red-200 dark:border-red-900/60 font-mono">
              <div className="text-2xl sm:text-3xl font-bold text-red-700 dark:text-red-400">6.00%</div>
              <div className="text-xs uppercase text-red-900 dark:text-red-300 font-bold mt-1">
                UPPER TOLERANCE CEILING
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug font-sans">
                Corridor breach triggers formal statutory review and monetary policy rate tightening.
              </p>
            </div>

            <div className="p-4 bg-blue-50/70 dark:bg-[#0b0f19] border border-blue-200 dark:border-blue-800/80 font-mono">
              <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400">4.00%</div>
              <div className="text-xs uppercase text-blue-900 dark:text-blue-300 font-bold mt-1">
                STATUTORY CENTER TARGET
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug font-sans">
                Optimized macroeconomic balance between economic growth and price stability.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 dark:bg-[#0b0f19] border border-emerald-200 dark:border-emerald-900/60 font-mono">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400">2.00%</div>
              <div className="text-xs uppercase text-emerald-900 dark:text-emerald-300 font-bold mt-1">
                LOWER INFLATION FLOOR
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug font-sans">
                Safeguards against systemic deflationary demand slowdowns.
              </p>
            </div>

          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            Last formal corridor breach report: <strong className="text-slate-900 dark:text-slate-200">November 2022</strong>
          </span>
          <Link
            to="/indicators/cpi-combined-general"
            className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-bold"
          >
            <span>Read MPC Resolution Explainer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Full-Width Revision Explanation Strip */}
      <div className="glass-panel p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 shrink-0">
            <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-700 dark:text-blue-400 font-bold">
              METHODOLOGY SPOTLIGHT — Statutory Data Lifecycle
            </div>
            <h4 className="text-base font-display font-bold text-slate-900 dark:text-white mt-1">
              Provisional vs. Revised Data: Why Central Banks Update Numbers
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 max-w-4xl leading-relaxed font-sans">
              Economic data is published promptly to inform immediate monetary policy choices. Macro releases tagged with <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">[P] Provisional</span> reflect initial surveys covering ~65% of regional collection centers. Subsequent revisions incorporate lagged reports and seasonal price weighting adjustments, reaching <span className="font-mono text-blue-700 dark:text-blue-400 font-bold">[R] Revised</span> status with a 30 to 60 day coverage finalization lag.
            </p>
          </div>
        </div>

        <Link
          to="/transparency"
          className="shrink-0 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-[#334155] border border-slate-300 dark:border-[#334155] text-xs font-mono text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors whitespace-nowrap font-bold"
        >
          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>View Full Revision Logger</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
