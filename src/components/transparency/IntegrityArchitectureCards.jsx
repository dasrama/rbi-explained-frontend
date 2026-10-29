import React from "react";
import { Fingerprint, GitFork, ShieldCheck } from "lucide-react";

export default function IntegrityArchitectureCards() {
  return (
    <div className="terminal-panel p-5 sm:p-6 bg-white dark:bg-[#000000] border border-slate-200 dark:border-[#1e293b] mb-8 shadow-sm">
      
      <div className="pb-4 border-b border-slate-200 dark:border-[#334155]">
        <span className="text-xs font-mono text-blue-700 dark:text-blue-400 uppercase font-bold">
          INTEGRITY ARCHITECTURE
        </span>
        <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white tracking-wide">
          Data Deduplication & Revision Policy
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">
          How our statistical observatory prevents synthetic duplicate records and strictly respects official central bank revisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
        
        {/* 01. Cryptographic Safeguards */}
        <div className="glass-panel p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-9 h-9 rounded-none border border-blue-300 dark:border-blue-500/50 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-3.5">
              <Fingerprint className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            </div>

            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold">
              01. CRYPTOGRAPHIC SAFEGUARDS
            </div>
            <h4 className="text-sm font-display font-bold text-slate-900 dark:text-white mt-1">
              File-Level SHA Hashing
            </h4>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans mt-2 leading-relaxed">
              Prevents duplicate records when central agencies release updated or re-formatted bulletins. The platform calculates a SHA-256 cryptographic signature before ingestion; if identical to stored archives, duplicate processing is skipped.
            </p>
          </div>

          <div className="mt-4 p-2.5 bg-emerald-50 dark:bg-[#070a12] border border-emerald-200 dark:border-emerald-900/60 font-mono text-xs text-emerald-800 dark:text-emerald-400 font-bold flex items-center justify-between">
            <span>SHA-256 Ledger Signature</span>
            <span className="text-emerald-700 dark:text-emerald-400">Verified Match</span>
          </div>
        </div>

        {/* 02. Sovereign Versioning */}
        <div className="glass-panel p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-9 h-9 rounded-none border border-emerald-300 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3.5">
              <GitFork className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            </div>

            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold">
              02. SOVEREIGN VERSIONING
            </div>
            <h4 className="text-sm font-display font-bold text-slate-900 dark:text-white mt-1">
              Superseded Record Archiving
            </h4>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans mt-2 leading-relaxed">
              Central bank statistical publications frequently update provisional figures (e.g. CPI from Provisional [P] to Revised [R] and Finalized [F]). Numbers are never overwritten or erased; original estimates remain permanently preserved.
            </p>
          </div>

          <div className="mt-4 p-2.5 bg-blue-50 dark:bg-[#070a12] border border-blue-200 dark:border-blue-900/60 font-mono text-xs text-blue-800 dark:text-blue-400 font-bold flex items-center justify-between">
            <span>Statutory Lifecycle</span>
            <span className="text-blue-700 dark:text-blue-300">Provisional → Revised → Final</span>
          </div>
        </div>

        {/* 03. Institutional Auditability */}
        <div className="glass-panel p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-9 h-9 rounded-none border border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 flex items-center justify-center mb-3.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>

            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold">
              03. INSTITUTIONAL AUDITABILITY
            </div>
            <h4 className="text-sm font-display font-bold text-slate-900 dark:text-white mt-1">
              Public Gazette Cross-Verification
            </h4>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans mt-2 leading-relaxed">
              Empowers economists, policy researchers, and journalists to audit any individual indicator's entire historical revision trail. Direct links connect to official central bank press communiqués and statutory Gazette notifications.
            </p>
          </div>

          <div className="mt-4 p-2.5 bg-amber-50 dark:bg-[#070a12] border border-amber-200 dark:border-amber-900/60 font-mono text-xs text-amber-800 dark:text-amber-400 font-bold flex items-center justify-between">
            <span>Public Provenance</span>
            <span className="text-amber-700 dark:text-amber-400">Gazette Cross-Checked</span>
          </div>
        </div>

      </div>

    </div>
  );
}
