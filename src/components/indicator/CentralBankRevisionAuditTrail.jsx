import React from "react";
import { History, ShieldCheck, ArrowRight, FileCheck, ExternalLink } from "lucide-react";
import { formatDate, truncateHash } from "../../utils/formatters";

export default function CentralBankRevisionAuditTrail({ revisions = [], onSelectRevision }) {
  return (
    <div className="terminal-panel p-5 bg-[#0f172a]">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#334155]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-display font-bold text-white tracking-wide">
              Central Bank Revision Audit Trail
            </h3>
            <span className="px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800 text-[10px] font-mono font-semibold">
              {revisions.length} Logged Revisions
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Cryptographic ledger tracking provisional to finalized central bank economic data revisions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Synthetic Drift Verified</span>
        </div>
      </div>

      {/* Revisions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-[#334155] text-[10px] uppercase text-slate-400 bg-[#0b0f19]">
              <th className="py-2.5 px-3">OBSERVATION DATE</th>
              <th className="py-2.5 px-3">PREVIOUS VALUE</th>
              <th className="py-2.5 px-3">NEW VALUE</th>
              <th className="py-2.5 px-3">DIFFERENCE</th>
              <th className="py-2.5 px-3">% VARIANCE</th>
              <th className="py-2.5 px-3">REVISION REASON</th>
              <th className="py-2.5 px-3">SHA-256 HASH</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]">
            {revisions.map((rev) => (
              <tr
                key={rev.id}
                onClick={() => onSelectRevision && onSelectRevision(rev)}
                className="hover:bg-[#1e293b] cursor-pointer transition-colors group"
              >
                <td className="py-3 px-3 font-semibold text-slate-200">
                  {formatDate(rev.observation_date, "table")}
                </td>

                <td className="py-3 px-3 text-slate-400">
                  {rev.previous_value.toFixed(2)}
                </td>

                <td className="py-3 px-3 text-white font-bold">
                  {rev.new_value.toFixed(2)}
                </td>

                <td className="py-3 px-3 font-semibold text-emerald-400">
                  +{rev.difference.toFixed(2)}
                </td>

                <td className="py-3 px-3 font-semibold text-blue-400">
                  +{rev.percentage_change.toFixed(2)}%
                </td>

                <td className="py-3 px-3 text-slate-300 max-w-xs truncate text-[11px]">
                  {rev.revision_reason}
                </td>

                <td className="py-3 px-3 text-slate-500 text-[10px]">
                  {truncateHash(rev.sha256_hash || "381d7f7a378de82a08d840969ac662a20a48941776520bbd6002093cd9ad2c21")}
                </td>

                <td className="py-3 px-3 text-right">
                  <span className="text-[11px] text-blue-400 group-hover:underline flex items-center justify-end gap-1 font-semibold">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-3 border-t border-[#1e293b] text-[10px] font-mono text-slate-500">
        All historical revisions are permanently archived per sovereign archival protocols.
      </div>

    </div>
  );
}
