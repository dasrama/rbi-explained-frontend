import React from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function PublishingDirectory({ sources = [] }) {
  const directory = [
    {
      code: "PUB-01",
      name: "RBI Monthly Bulletin",
      description: "Official monetary statistics covering Table 21 & Table 42, banking system liquidity balances, currency in circulation, and foreign currency assets.",
      method: "Gazette Statistical Bulletin",
      host: "rbi.org.in",
      lastSynced: "Today, Current Cycle",
      url: "https://www.rbi.org.in",
    },
    {
      code: "PUB-02",
      name: "Financial Benchmarks (FBIL)",
      description: "Statutory administrator for India's benchmark exchange rates, USD/INR reference rates, and overnight money market MIBOR fixings.",
      method: "Daily Reference Rate Survey",
      host: "fbil.org.in",
      lastSynced: "Today, 13:30 IST",
      url: "https://www.fbil.org.in",
    },
    {
      code: "PUB-03",
      name: "National Payments Corp (NPCI)",
      description: "High-frequency clearing metrics for Unified Payments Interface (UPI), IMPS, and systemic retail electronic settlement volume.",
      method: "Central Settlement Clearing Rail",
      host: "npci.org.in",
      lastSynced: "Monthly Close Cycle",
      url: "https://www.npci.org.in",
    },
    {
      code: "PUB-04",
      name: "MoSPI Statistics Office",
      description: "National headline Consumer Price Indices (CPI Combined Base 2024=100), commodity basket weights, and state-level price releases.",
      method: "National Accounts Gazette",
      host: "mospi.gov.in",
      lastSynced: "Monthly Gazette Schedule",
      url: "https://www.mospi.gov.in",
    },
  ];

  return (
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#000000] border border-slate-200 dark:border-[#1e293b] shadow-sm">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#334155]">
        <div>
          <span className="text-xs font-mono text-blue-700 dark:text-blue-400 uppercase font-bold">
            UPSTREAM DATA FEEDS
          </span>
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white tracking-wide">
            Official Sovereign Publishing Directory
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>@ All 4 Providers Certified Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {directory.map((item) => (
          <div
            key={item.code}
            className="glass-panel p-4 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-2.5">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-[#070a12] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-[#1e293b] font-bold">
                  {item.code}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>

              <h4 className="text-sm font-display font-bold text-slate-900 dark:text-white">
                {item.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1e293b] font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Publishing Rail:</span>
                <span className="text-blue-700 dark:text-blue-400 font-bold">{item.method}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Base Host:</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-semibold"
                >
                  <span>{item.host}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200 dark:border-[#1e293b]/60">
                <span>Last Synced:</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item.lastSynced}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
