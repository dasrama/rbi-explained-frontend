import React from "react";
import { Landmark, ExternalLink, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100 dark:bg-[#070a12] border-t border-slate-200 dark:border-[#334155] text-slate-600 dark:text-slate-400 text-xs mt-16 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200 dark:border-[#1e293b]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 border border-blue-700 dark:border-blue-500 bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0">
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white text-base tracking-wide">
                INDIAN ECONOMY DECODED
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-sans">
              Translating RBI monetary policy data and macroeconomic indicators into clear, accessible intelligence.
            </p>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
              Data sourced under Open Government Data License (OGDL India) and RBI Statutory Disclosure Mandates.
            </div>
          </div>

          {/* Sovereign Data Sources */}
          <div>
            <h4 className="font-mono text-xs uppercase text-slate-900 dark:text-slate-200 font-bold tracking-wider mb-3">
              DATA SOURCES
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://dbie.rbi.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  DBIE (Database on Indian Economy)
                </a>
              </li>
              <li>
                <a
                  href="https://www.mospi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  MOSPI National Statistical Office
                </a>
              </li>
              <li>
                <a
                  href="https://www.npci.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  NPCI Digital Payment Reports
                </a>
              </li>
              <li>
                <a
                  href="https://www.fbil.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  FBIL Reference Rates
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>
            © 2026 Indian Economy Decoded — An independent economic intelligence platform. Not affiliated with the Reserve Bank of India. Data sourced under Open Government Data License.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">Methodology & Revisions</span>
            <span>•</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">Statutory Disclosures</span>
            <span>•</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">Disclaimer of Liability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
