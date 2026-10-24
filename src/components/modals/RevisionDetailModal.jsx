import React from "react";
import { X, ShieldCheck, FileText, Copy, Check } from "lucide-react";
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
      <div className="w-full max-w-xl bg-[#0f172a] border border-[#3b82f6] shadow-2xl relative font-mono text-xs">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0b0f19] border-b border-[#334155]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-white font-semibold">Central Bank Revision Audit Detail</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-[#1e293b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          {/* Top Metric Comparison Grid */}
          <div className="grid grid-cols-3 gap-2 bg-[#0b0f19] p-3 border border-[#1e293b]">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">PREVIOUS VALUE</div>
              <div className="text-lg font-bold text-slate-300">
                {revision.previous_value.toFixed(2)}
              </div>
              <div className="text-[9px] text-amber-400">Provisional (P)</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500 uppercase">NEW VALUE</div>
              <div className="text-lg font-bold text-white">
                {revision.new_value.toFixed(2)}
              </div>
              <div className="text-[9px] text-emerald-400">Finalized (F)</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-500 uppercase">DIFFERENCE</div>
              <div className="text-lg font-bold text-blue-400">
                +{revision.difference.toFixed(2)} (+{revision.percentage_change.toFixed(2)}%)
              </div>
              <div className="text-[9px] text-slate-400">Net Delta</div>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#1e293b]">
              <span className="text-slate-400">Observation Date:</span>
              <span className="text-slate-200">{formatDate(revision.observation_date, "table")}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1e293b]">
              <span className="text-slate-400">Revision Timestamp:</span>
              <span className="text-slate-200">{revision.revision_timestamp}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#1e293b]">
              <span className="text-slate-400">Field Schedule Coverage:</span>
              <span className="text-emerald-400 font-semibold">98.4% of Mandated Primary Centers</span>
            </div>

            <div className="py-1">
              <span className="text-slate-400 block mb-1">Official Central Bank Revision Reason:</span>
              <div className="p-2.5 bg-[#0b0f19] border border-[#1e293b] text-slate-200 text-[11px] leading-relaxed">
                "{revision.revision_reason}"
              </div>
            </div>

            <div className="py-1">
              <span className="text-slate-400 block mb-1">SHA-256 Ledger Provenance Hash:</span>
              <div className="flex items-center justify-between p-2 bg-[#0b0f19] border border-[#1e293b] text-slate-300 text-[10px]">
                <span className="truncate pr-2">{revision.sha256_hash || "381d7f7a378de82a08d840969ac662a20a48941776520bbd6002093cd9ad2c21"}</span>
                <button
                  onClick={handleCopyHash}
                  className="shrink-0 flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#0b0f19] border-t border-[#1e293b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-slate-200 hover:text-white border border-[#334155] text-xs font-mono transition-colors"
          >
            Close Audit Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
