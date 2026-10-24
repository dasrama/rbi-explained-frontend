import React from "react";
import { Fingerprint, GitFork, FileCode, CheckCircle2 } from "lucide-react";

export default function IntegrityArchitectureCards() {
  return (
    <div className="terminal-panel p-5 bg-[#0f172a] border border-[#334155] mb-8">
      
      <div className="pb-4 border-b border-[#334155]">
        <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">
          INTEGRITY ARCHITECTURE
        </span>
        <h3 className="text-base font-display font-bold text-white tracking-wide">
          Data Deduplication & Revision Policy
        </h3>
        <p className="text-xs text-slate-400 font-sans mt-0.5">
          How our ingestion pipeline prevents synthetic duplicate records and respects official sovereign revisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
        
        {/* 01. Cryptographic Safeguards */}
        <div className="p-4 bg-[#0a0e18] border border-[#1e293b] flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-none border border-blue-500/50 bg-blue-950/40 text-blue-400 flex items-center justify-center mb-3">
              <Fingerprint className="w-4 h-4 text-blue-400" />
            </div>

            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              01. CRYPTOGRAPHIC SAFEGUARDS
            </div>
            <h4 className="text-sm font-display font-bold text-white mt-0.5">
              File-Level SHA Hashing
            </h4>

            <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
              Prevents duplicate ingestion when the Reserve Bank re-hosts identical spreadsheets. The ingestion crawler hashes the exact binary content via SHA-256 before parsing. If the hash matches, the file is dropped with zero-CPU overhead.
            </p>
          </div>

          <div className="mt-4 p-2 bg-[#070a12] border border-[#1e293b] font-mono text-[10px] text-emerald-400">
            <code>download_file -&gt; sha256 -&gt; check_hash ? SKIP : PARSE</code>
          </div>
        </div>

        {/* 02. Sovereign Versioning */}
        <div className="p-4 bg-[#0a0e18] border border-[#1e293b] flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-none border border-emerald-500/50 bg-emerald-950/40 text-emerald-400 flex items-center justify-center mb-3">
              <GitFork className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              02. SOVEREIGN VERSIONING
            </div>
            <h4 className="text-sm font-display font-bold text-white mt-0.5">
              Superseded Record Archiving
            </h4>

            <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
              Central bank statistical publications frequently revise provisional figures (e.g. CPI from Provisional [P] to Final [F]). We never overwrite or delete rows; original numbers are marked SUPERSEDED with exact revision timestamps.
            </p>
          </div>

          <div className="mt-4 p-2 bg-[#070a12] border border-[#1e293b] font-mono text-[10px] text-blue-400">
            <code>UPDATE status='SUPERSEDED' -&gt; INSERT(revised)</code>
          </div>
        </div>

        {/* 03. Open Verification */}
        <div className="p-4 bg-[#0a0e18] border border-[#1e293b] flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-none border border-amber-500/50 bg-amber-950/40 text-amber-400 flex items-center justify-center mb-3">
              <FileCode className="w-4 h-4 text-amber-400" />
            </div>

            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              03. OPEN VERIFICATION
            </div>
            <h4 className="text-sm font-display font-bold text-white mt-0.5">
              Public Verification API
            </h4>

            <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
              Empowers economists and financial analysts to audit any individual indicator's revision history. Retrieve source documents, download raw timestamps, and compute point revisions via open REST routes.
            </p>
          </div>

          <div className="mt-4 p-2 bg-[#070a12] border border-[#1e293b] font-mono text-[10px] text-amber-400">
            <code>GET /api/v1/indicators/{`{id}`}/revisions</code>
          </div>
        </div>

      </div>

    </div>
  );
}
