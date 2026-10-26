import React, { useState } from "react";
import { 
  FileSpreadsheet, 
  FileText, 
  Calendar, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { formatDate } from "../../utils/formatters";

export default function HistoricalObservationTable({ observations = [], onSelectObservation }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter observations
  const filtered = observations.filter((obs) => {
    if (statusFilter === "provisional") return obs.is_provisional;
    if (statusFilter === "revised") return obs.is_revised;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExportCsv = () => {
    const headers = ["Observation Date,Index Value,YoY Inflation Rate,Data Status,Revision Count,Raw File Tag\n"];
    const rows = filtered.map(o => 
      `${o.observation_date},${o.value},${o.yoy_change || ""},${o.is_provisional ? "Provisional" : o.is_revised ? "Revised" : "Finalized"},${o.revision_number},${o.raw_file_tag || ""}`
    );
    const blob = new Blob([headers.concat(rows.join("\n"))], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `rbi_observations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="terminal-panel p-5 sm:p-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
      
      {/* Table Controls Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#334155]">
        
        {/* Left Date Range & Filter */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#0b0f19] px-3 py-1.5 border border-slate-300 dark:border-[#334155] text-slate-800 dark:text-slate-300 font-medium">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Range: 01-07-2025 to 01-08-2026</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Status Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] text-slate-900 dark:text-slate-200 text-xs px-2.5 py-1.5 font-mono focus-terminal"
            >
              <option value="all">All Observations</option>
              <option value="provisional">Provisional Only [P]</option>
              <option value="revised">Revised Only [R]</option>
            </select>
          </div>
        </div>

        {/* Right Export Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#0b0f19] dark:hover:bg-[#1e293b] text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-[#334155] flex items-center gap-1.5 transition-colors font-semibold"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#0b0f19] dark:hover:bg-[#1e293b] text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-[#334155] flex items-center gap-1.5 transition-colors font-semibold"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Export Excel (.xlsx)</span>
          </button>
        </div>

      </div>

      {/* Tabular Stream */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#334155] text-xs uppercase text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-[#0b0f19] font-bold">
              <th className="py-3 px-3.5">OBSERVATION DATE</th>
              <th className="py-3 px-3.5">INDEX VALUE (2024=100)</th>
              <th className="py-3 px-3.5">YOY INFLATION RATE</th>
              <th className="py-3 px-3.5">DATA STATUS</th>
              <th className="py-3 px-3.5">REVISION COUNT</th>
              <th className="py-3 px-3.5">RAW FILE / ARCHIVE ID</th>
              <th className="py-3 px-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#1e293b]">
            {paginatedItems.map((obs) => (
              <tr
                key={obs.id}
                className="hover:bg-slate-50 dark:hover:bg-[#1e293b] transition-colors"
              >
                <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-slate-200">
                  {formatDate(obs.observation_date, "table")}
                </td>

                <td className="py-3 px-3.5 text-slate-900 dark:text-white font-bold text-sm">
                  {obs.value.toFixed(2)}
                </td>

                <td className="py-3 px-3.5 font-bold text-red-600 dark:text-red-400">
                  {obs.yoy_change ? `${obs.yoy_change}%` : "—"}
                </td>

                <td className="py-3 px-3.5">
                  {obs.is_provisional ? (
                    <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold">
                      provisional (P)
                    </span>
                  ) : obs.is_revised ? (
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800 text-xs font-bold">
                      Revised (R)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-[#334155] text-xs font-medium">
                      Finalized
                    </span>
                  )}
                </td>

                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 font-medium">
                  {obs.revision_number === 0 ? "0 (Initial)" : obs.revision_number}
                </td>

                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400 text-xs font-medium">
                  {obs.raw_file_tag || "MOSPI_CPI_RAW_FEED"}
                </td>

                <td className="py-3 px-3.5 text-right">
                  <button
                    onClick={() => onSelectObservation && onSelectObservation(obs)}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-[#334155] text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    title="Audit Observation Provenance"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="pt-4 border-t border-slate-200 dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
        <div>
          Showing {paginatedItems.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} monthly observations
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-[#1e293b] flex items-center gap-1 transition-colors font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 border text-center transition-colors font-bold ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-[#0b0f19] border-slate-300 dark:border-[#334155] text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1e293b]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-[#1e293b] flex items-center gap-1 transition-colors font-medium"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
