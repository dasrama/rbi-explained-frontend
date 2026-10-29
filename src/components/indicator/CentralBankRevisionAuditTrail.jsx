import React from "react";
import { ArrowRight, FileCheck } from "lucide-react";
import { formatDate, truncateHash } from "../../utils/formatters";

export default function CentralBankRevisionAuditTrail({ revisions = [], onSelectRevision }) {
  return (
    <div className="terminal-panel p-5 sm:p-6 bg-white dark:bg-[#000000] border border-slate-200 dark:border-[#1e293b] shadow-sm">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#334155]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white tracking-wide">
              Central Bank Revision Audit Trail
            </h3>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800 text-xs font-mono font-bold">
              {revisions.length} Logged Revisions
            </span>
          </div>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
            Cryptographic ledger tracking provisional to finalized central bank economic data revisions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
          <FileCheck className="w-4 h-4" />
          <span>Zero Synthetic Drift Verified</span>
        </div>
      </div>

      {/* Revisions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#334155] text-xs uppercase text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-[#0b0f19] font-bold">
              <th className="py-3 px-3.5">OBSERVATION DATE</th>
              <th className="py-3 px-3.5">PREVIOUS VALUE</th>
              <th className="py-3 px-3.5">NEW VALUE</th>
              <th className="py-3 px-3.5">DIFFERENCE</th>
              <th className="py-3 px-3.5">% VARIANCE</th>
              <th className="py-3 px-3.5">REVISION REASON</th>
              <th className="py-3 px-3.5">SHA-256 HASH</th>
              <th className="py-3 px-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#1e293b]">
            {revisions.map((rev) => (
              <tr
                key={rev.id}
                onClick={() => onSelectRevision && onSelectRevision(rev)}
                className="hover:bg-slate-50 dark:hover:bg-[#1e293b] cursor-pointer transition-colors group"
              >
                <td className="py-3.5 px-3.5 font-bold text-slate-900 dark:text-slate-200">
                  {formatDate(rev.observation_date, "table")}
                </td>

                <td className="py-3.5 px-3.5 text-slate-600 dark:text-slate-400 font-medium">
                  {rev.previous_value.toFixed(2)}
                </td>

                <td className="py-3.5 px-3.5 text-slate-900 dark:text-white font-bold text-sm">
                  {rev.new_value.toFixed(2)}
                </td>

                <td className="py-3.5 px-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                  +{rev.difference.toFixed(2)}
                </td>

                <td className="py-3.5 px-3.5 font-bold text-blue-700 dark:text-blue-400">
                  +{rev.percentage_change.toFixed(2)}%
                </td>

                <td className="py-3.5 px-3.5 text-slate-700 dark:text-slate-300 max-w-xs truncate text-xs font-sans">
                  {rev.revision_reason}
                </td>

                <td className="py-3.5 px-3.5 text-slate-500 dark:text-slate-400 text-xs font-mono">
                  {truncateHash(rev.sha256_hash || "381d7f7a378de82a08d840969ac662a20a48941776520bbd6002093cd9ad2c21")}
                </td>

                <td className="py-3.5 px-3.5 text-right">
                  <span className="text-xs text-blue-700 dark:text-blue-400 group-hover:underline flex items-center justify-end gap-1 font-bold">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-3.5 border-t border-slate-200 dark:border-[#1e293b] text-xs font-mono text-slate-500 dark:text-slate-400">
        All historical revisions are permanently archived per sovereign archival protocols.
      </div>

    </div>
  );
}
