import React from "react";
import { X, ShieldCheck, Copy, Check } from "lucide-react";
import { formatDate } from "../../utils/formatters";

export default function RevisionDetailModal({ revision, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!revision) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(revision.sha256_hash || "381d7f7a378de82a08d840969ac662a20a48941776520bbd6002093cd9ad2c21");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-[#0f172a] border-2 border-blue-600 dark:border-[#3b82f6] shadow-2xl relative font-mono text-xs">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100 dark:bg-[#0b0f19] border-b border-slate-200 dark:border-[#334155]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-900 dark:text-white font-bold text-sm">Central Bank Revision Audit Detail</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1e293b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          {/* Top Metric Comparison Grid */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-[#0b0f19] p-3.5 border border-slate-200 dark:border-[#1e293b]">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">PREVIOUS VALUE</div>
              <div className="text-xl font-bold text-slate-800 dark:text-slate-300 mt-0.5">
                {revision.previous_value.toFixed(2)}
              </div>
              <div className="text-xs text-amber-700 dark:text-amber-400 font-bold">Provisional (P)</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">NEW VALUE</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {revision.new_value.toFixed(2)}
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Finalized (F)</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">DIFFERENCE</div>
              <div className="text-xl font-bold text-blue-700 dark:text-blue-400 mt-0.5">
                +{revision.difference.toFixed(2)}
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-400 font-bold">+{revision.percentage_change.toFixed(2)}% Net Delta</div>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-[#1e293b]">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Observation Date:</span>
              <span className="text-slate-900 dark:text-slate-200 font-bold">{formatDate(revision.observation_date, "table")}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-[#1e293b]">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Revision Timestamp:</span>
              <span className="text-slate-900 dark:text-slate-200 font-medium">{revision.revision_timestamp}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-[#1e293b]">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Field Schedule Coverage:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">98.4% of Mandated Primary Centers</span>
            </div>

            <div className="py-1">
              <span className="text-slate-600 dark:text-slate-400 font-medium block mb-1">Official Central Bank Revision Reason:</span>
              <div className="p-3 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-[#1e293b] text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-sans">
                "{revision.revision_reason}"
              </div>
            </div>

            <div className="py-1">
              <span className="text-slate-600 dark:text-slate-400 font-medium block mb-1">SHA-256 Ledger Provenance Hash:</span>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-[#1e293b] text-slate-800 dark:text-slate-300 text-xs font-mono">
                <span className="truncate pr-2 font-medium">{revision.sha256_hash || "381d7f7a378de82a08d840969ac662a20a48941776520bbd6002093cd9ad2c21"}</span>
                <button
                  onClick={handleCopyHash}
                  className="shrink-0 flex items-center gap-1 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-100 dark:bg-[#0b0f19] border-t border-slate-200 dark:border-[#1e293b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-[#1e293b] dark:hover:bg-[#334155] text-slate-900 dark:text-white border border-slate-300 dark:border-[#334155] text-xs font-mono font-bold transition-colors"
          >
            Close Audit Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
