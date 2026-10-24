import React from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Landmark, 
  Scale, 
  ShieldCheck, 
  ArrowRight,
  History,
  FileText
} from "lucide-react";

export default function MacroEconomicsPrimer() {
  return (
    <div className="space-y-6">
      
      {/* 2-Column Educational Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Inflation Target Primer */}
        <div className="lg:col-span-2 terminal-panel p-6 bg-[#0f172a] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
              <Scale className="w-4 h-4 text-blue-400" />
              <span>MONETARY ECONOMICS PRIMER</span>
            </div>

            <h3 className="text-xl font-display font-bold text-white tracking-tight">
              How Does the Reserve Bank Target Inflation?
            </h3>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
              Under Section 45ZB of the Reserve Bank of India Act, 1934, the Central Government, in consultation with the RBI, sets a flexible inflation target of <strong className="text-white">4.0% with a tolerance band of ±2%</strong> (2% minimum to 6% maximum). When headline retail inflation exceeds 6% or dips under 2% for three consecutive quarters, the RBI is statutorily mandated to submit a formal report to the Central Government detailing the reasons and remedial action plans.
            </p>

            {/* 3 Corridor Target Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              
              <div className="p-3 bg-[#0b0f19] border border-red-900/60 font-mono">
                <div className="text-xl font-bold text-red-400">6.00%</div>
                <div className="text-[10px] uppercase text-red-300 font-semibold mt-0.5">
                  UPPER TOLERANCE CEILING
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Breach mandates formal Parliamentary letter and rate hikes.
                </p>
              </div>

              <div className="p-3 bg-[#0b0f19] border border-blue-800/80 font-mono">
                <div className="text-xl font-bold text-blue-400">4.00%</div>
                <div className="text-[10px] uppercase text-blue-300 font-semibold mt-0.5">
                  STATUTORY CENTER TARGET
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Optimized balance between economic growth and price stability.
                </p>
              </div>

              <div className="p-3 bg-[#0b0f19] border border-emerald-900/60 font-mono">
                <div className="text-xl font-bold text-emerald-400">2.00%</div>
                <div className="text-[10px] uppercase text-emerald-300 font-semibold mt-0.5">
                  LOWER INFLATION FLOOR
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Safeguards against systemic deflationary demand shock.
                </p>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-400">
              Last formal corridor breach report: <strong className="text-slate-200">November 2022</strong>
            </span>
            <Link
              to="/indicators/cpi-combined-general"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              <span>Read MPC Resolution Explainer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right 1 Col: DESACS & MOSPI Data Integrity Card */}
        <div className="terminal-panel p-6 bg-[#0f172a] flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="w-full h-36 bg-gradient-to-br from-[#1e293b] to-[#0b0f19] border border-[#334155] p-3 flex flex-col justify-between mb-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 z-10">
                <span className="text-blue-400 font-semibold">PARLIAMENTARY MANDATE</span>
                <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-800">
                  OFFICIAL
                </span>
              </div>
              
              <div className="z-10">
                <Landmark className="w-8 h-8 text-slate-200 mb-1" />
                <div className="font-display font-bold text-white text-base">
                  DESACS & MOSPI Data Integrity
                </div>
              </div>

              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <Landmark className="w-40 h-40 text-blue-400" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Every data series on this dashboard is ingested via machine-readable pipelines and verified against public domain Gazette notifications.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e293b] font-mono text-[11px] text-slate-400">
            Automated crawler hashes check for zero synthetic drift across all publishing schedules.
          </div>
        </div>

      </div>

      {/* Bottom Full-Width Revision Explanation Strip */}
      <div className="terminal-panel p-5 bg-[#0a0e18] border border-[#334155] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-blue-950/60 border border-blue-800/80 text-blue-400 shrink-0">
            <History className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold">
              METHODOLOGY SPOTLIGHT — Statutory Data Lifecycle
            </div>
            <h4 className="text-sm font-display font-semibold text-white mt-0.5">
              Provisional vs. Revised Data: Why Central Banks Update Numbers
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-4xl leading-relaxed">
              Economic data is published promptly to inform immediate monetary policy choices. Macro releases tagged with <span className="font-mono text-amber-400 font-semibold">[P] Provisional</span> reflect initial surveys covering ~65% of regional collection centers. Subsequent revisions incorporate lagged reports and seasonal price weighting adjustments, reaching <span className="font-mono text-blue-400 font-semibold">[R] Revised</span> status with a 30 to 60 day coverage finalization lag.
            </p>
          </div>
        </div>

        <Link
          to="/transparency"
          className="shrink-0 px-3.5 py-2 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-xs font-mono text-slate-200 hover:text-white flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span>View Full Revision Logger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
