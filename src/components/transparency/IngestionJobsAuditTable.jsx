import React, { useState } from "react";
import { Download, ShieldCheck, AlertCircle, RefreshCw, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { truncateHash } from "../../utils/formatters";

export default function IngestionJobsAuditTable({ jobs = [], onInspectJob }) {
  const [filter, setFilter] = useState("ALL");

  const filteredJobs = jobs.filter((job) => {
    if (filter === "ALL") return true;
    return job.status === filter;
  });

  const handleExportCsv = () => {
    const headers = ["Job ID,Job Type,Indicator,Status,Extracted,Inserted,Revised,SHA-256 Checksum,Duration,Timestamp\n"];
    const rows = filteredJobs.map(j =>
      `${j.id},${j.job_type},${j.indicator_code},${j.status},${j.records_extracted},${j.records_inserted},${j.records_revised},${j.sha256_checksum},${j.duration},${j.timestamp}`
    );
    const blob = new Blob([headers.concat(rows.join("\n"))], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ingestion_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="terminal-panel p-5 mb-6 bg-[#0f172a] border border-[#334155]">
      
      {/* Table Title and Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#334155]">
        <div>
          <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">
            GET /api/v1/ingestion/jobs | IMMUTABLE EXECUTION LOG
          </span>
          <h3 className="text-base font-display font-bold text-white tracking-wide">
            Ingestion Jobs Audit Trail
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          
          {/* Status Switcher */}
          <div className="flex items-center bg-[#0b0f19] border border-[#334155] p-0.5">
            {["ALL", "COMPLETED", "RUNNING", "FAILED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-2.5 py-1 text-[10px] uppercase font-semibold transition-colors ${
                  filter === st
                    ? "bg-[#3b82f6] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Export Ledger Button */}
          <button
            onClick={handleExportCsv}
            className="px-2.5 py-1 bg-[#0b0f19] hover:bg-[#1e293b] text-slate-300 hover:text-white border border-[#334155] flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export Ledger (CSV)</span>
          </button>

        </div>
      </div>

      {/* Tabular stream */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-[#334155] text-[10px] uppercase text-slate-400 bg-[#0b0f19]">
              <th className="py-2.5 px-3">JOB ID</th>
              <th className="py-2.5 px-3">JOB TYPE</th>
              <th className="py-2.5 px-3">INDICATOR</th>
              <th className="py-2.5 px-3">STATUS</th>
              <th className="py-2.5 px-3">EXTRACTED</th>
              <th className="py-2.5 px-3">INSERTED</th>
              <th className="py-2.5 px-3">REVISED</th>
              <th className="py-2.5 px-3">SHA-256 CHECKSUM</th>
              <th className="py-2.5 px-3">DURATION</th>
              <th className="py-2.5 px-3">TIMESTAMP</th>
              <th className="py-2.5 px-3 text-right">AUDIT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]">
            {filteredJobs.map((job) => (
              <tr
                key={job.id}
                className="hover:bg-[#1e293b] transition-colors"
              >
                <td className="py-2.5 px-3 text-slate-300 font-semibold">
                  {job.id}
                </td>

                <td className="py-2.5 px-3 text-blue-400 text-[11px]">
                  {job.job_type}
                </td>

                <td className="py-2.5 px-3 text-white font-medium text-[11px]">
                  {job.indicator_code}
                </td>

                <td className="py-2.5 px-3">
                  {job.status === "COMPLETED" ? (
                    <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                      ● COMPLETED
                    </span>
                  ) : job.status === "RUNNING" ? (
                    <span className="px-2 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800 text-[10px] font-bold animate-pulse">
                      ◌ RUNNING
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-red-950/80 text-red-300 border border-red-800 text-[10px] font-bold">
                      ✕ FAILED
                    </span>
                  )}
                </td>

                <td className="py-2.5 px-3 text-slate-300">
                  {job.records_extracted > 0 ? job.records_extracted.toLocaleString() : (job.status === "RUNNING" ? "Streaming..." : "0")}
                </td>

                <td className="py-2.5 px-3 font-semibold text-emerald-400">
                  +{job.records_inserted}
                </td>

                <td className="py-2.5 px-3 font-semibold text-amber-400">
                  +{job.records_revised}
                </td>

                <td className="py-2.5 px-3 text-slate-500 text-[10px]">
                  {job.sha256_checksum}
                </td>

                <td className="py-2.5 px-3 text-slate-400">
                  {job.duration}
                </td>

                <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                  {job.timestamp}
                </td>

                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => onInspectJob && onInspectJob(job)}
                    className="p-1 hover:bg-[#334155] text-slate-400 hover:text-blue-400 transition-colors"
                    title="Inspect Job Log"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
        <div>
          Showing {filteredJobs.length} most recent automated jobs (Archival retention: 365 Days)
        </div>
        <div>Page 1 of 492</div>
      </div>

    </div>
  );
}
