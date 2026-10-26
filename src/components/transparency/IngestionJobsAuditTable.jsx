import React, { useState } from "react";
import { Download, FileText } from "lucide-react";
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
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
      
      {/* Table Title and Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#334155]">
        <div>
          <span className="text-xs font-mono text-blue-700 dark:text-blue-400 uppercase font-bold">
            GET /api/v1/ingestion/jobs | IMMUTABLE EXECUTION LOG
          </span>
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white tracking-wide">
            Ingestion Jobs Audit Trail
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          
          {/* Status Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] p-0.5">
            {["ALL", "COMPLETED", "RUNNING", "FAILED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 text-xs uppercase font-bold transition-colors ${
                  filter === st
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Export Ledger Button */}
          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#0b0f19] dark:hover:bg-[#1e293b] text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-[#334155] flex items-center gap-1.5 transition-colors font-bold"
          >
            <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Export Ledger (CSV)</span>
          </button>

        </div>
      </div>

      {/* Tabular stream */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#334155] text-xs uppercase text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-[#0b0f19] font-bold">
              <th className="py-3 px-3.5">JOB ID</th>
              <th className="py-3 px-3.5">JOB TYPE</th>
              <th className="py-3 px-3.5">INDICATOR</th>
              <th className="py-3 px-3.5">STATUS</th>
              <th className="py-3 px-3.5">EXTRACTED</th>
              <th className="py-3 px-3.5">INSERTED</th>
              <th className="py-3 px-3.5">REVISED</th>
              <th className="py-3 px-3.5">SHA-256 CHECKSUM</th>
              <th className="py-3 px-3.5">DURATION</th>
              <th className="py-3 px-3.5">TIMESTAMP</th>
              <th className="py-3 px-3.5 text-right">AUDIT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#1e293b]">
            {filteredJobs.map((job) => (
              <tr
                key={job.id}
                className="hover:bg-slate-50 dark:hover:bg-[#1e293b] transition-colors"
              >
                <td className="py-3 px-3.5 text-slate-900 dark:text-slate-200 font-bold">
                  {job.id}
                </td>

                <td className="py-3 px-3.5 text-blue-700 dark:text-blue-400 font-semibold">
                  {job.job_type}
                </td>

                <td className="py-3 px-3.5 text-slate-900 dark:text-white font-bold">
                  {job.indicator_code}
                </td>

                <td className="py-3 px-3.5">
                  {job.status === "COMPLETED" ? (
                    <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold">
                      ● COMPLETED
                    </span>
                  ) : job.status === "RUNNING" ? (
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 text-xs font-bold animate-pulse">
                      ◌ RUNNING
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800 text-xs font-bold">
                      ✕ FAILED
                    </span>
                  )}
                </td>

                <td className="py-3 px-3.5 text-slate-800 dark:text-slate-300 font-semibold">
                  {job.records_extracted > 0 ? job.records_extracted.toLocaleString() : (job.status === "RUNNING" ? "Streaming..." : "0")}
                </td>

                <td className="py-3 px-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                  +{job.records_inserted}
                </td>

                <td className="py-3 px-3.5 font-bold text-amber-700 dark:text-amber-400">
                  +{job.records_revised}
                </td>

                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400 text-xs">
                  {job.sha256_checksum}
                </td>

                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 font-medium">
                  {job.duration}
                </td>

                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400 text-xs">
                  {job.timestamp}
                </td>

                <td className="py-3 px-3.5 text-right">
                  <button
                    onClick={() => onInspectJob && onInspectJob(job)}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-[#334155] text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    title="Inspect Job Log"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="pt-3.5 border-t border-slate-200 dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
        <div>
          Showing {filteredJobs.length} most recent automated jobs (Archival retention: 365 Days)
        </div>
        <div>Page 1 of 492</div>
      </div>

    </div>
  );
}
