import React from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function PublishingDirectory({ sources = [] }) {
  const directory = [
    {
      code: "ORG-01",
      name: "RBI Monthly Bulletin",
      description: "Provides granular Table 21 & Table 42 coverage of key macroeconomic aggregates, banking liquidity, and currency circulation.",
      method: "EXCEL_DOWNLOAD",
      host: "rbi.org.in",
      lastSynced: "2 hours ago",
      url: "https://www.rbi.org.in",
    },
    {
      code: "ORG-02",
      name: "Financial Benchmarks (FBIL)",
      description: "Official administrator responsible for benchmark exchange rates, USD/INR reference indices, and overnight MIBOR fixings.",
      method: "SELENIUM_SCRAPER",
      host: "fbil.org.in",
      lastSynced: "18 mins ago",
      url: "https://www.fbil.org.in",
    },
    {
      code: "ORG-03",
      name: "National Payments Corp (NPCI)",
      description: "High-frequency clearing metrics covering Unified Payments Interface (UPI), IMPS, and AePS systemic transactional volumes.",
      method: "API DIRECT REST",
      host: "npci.org.in",
      lastSynced: "Today 06:00 UTC",
      url: "https://www.npci.org.in",
    },
    {
      code: "ORG-04",
      name: "MOSPI Statistics Office",
      description: "National headline Consumer Price Indices (CPI Base 2024=100), item group basket weights, and state-level inflation tables.",
      method: "CSV DOWNLOAD",
      host: "mospi.gov.in",
      lastSynced: "Yesterday, 18:30 UTC",
      url: "https://www.mospi.gov.in",
    },
  ];

  return (
    <div className="terminal-panel p-5 mb-6 bg-[#0f172a] border border-[#334155]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#334155]">
        <div>
          <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">
            UPSTREAM DATA FEEDS
          </span>
          <h3 className="text-sm font-display font-bold text-white tracking-wide">
            Official Sovereign Publishing Directory
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>@ All 4 Providers Certified Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {directory.map((item) => (
          <div
            key={item.code}
            className="p-3.5 bg-[#0a0e18] border border-[#1e293b] hover:border-[#3b82f6] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] mb-2">
                <span className="px-1.5 py-0.2 bg-[#0f172a] text-slate-400 border border-[#334155]">
                  {item.code}
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active
                </span>
              </div>

              <h4 className="text-xs font-display font-bold text-white">
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1e293b] font-mono text-[10px] space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Method:</span>
                <span className="text-blue-300 font-semibold">{item.method}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Base Host:</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-blue-400 flex items-center gap-1"
                >
                  <span>{item.host}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex justify-between text-slate-500 pt-1 border-t border-[#1e293b]/60">
                <span>Last Synced:</span>
                <span className="text-slate-300">{item.lastSynced}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
