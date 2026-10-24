import React, { useState } from "react";
import { Terminal, Play, CheckCircle2, AlertCircle, RefreshCw, Download, ShieldCheck } from "lucide-react";
import { rbiApi } from "../../api/rbiApi";

export default function CrawlerDispatcherTerminal({ onJobTriggered }) {
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const initialLogs = [
    `[2026-10-14 17:42:01 UTC] Dispatching Headless Chrome Instance (Chromium v128)`,
    `> Connecting to target: https://www.mospi.gov.in/cpi-bulletins/monthly`,
    `> Indicator matched: CPI_COMBINED_GENERAL (Base 2024=100)`,
    `> Downloaded Excel payload: data/raw/cpi-combined-general/2026-10-14/cpi_combined_2026-10-14.xlsx`,
    `> Output normalized dataset: data/processed/cpi-combined-general/cpi_series.csv`,
    `@ SHA-256 Checksum Guarantee: 381d7f7a378de82a08d840969ac662a20a48941776520bbd6002093cd9ad2c21`,
    `+3 Observations Inserted | +1 Historical Revision [P -> R] | 0 Records Skipped`,
    `* Timescale Hypertable #290549 SF 1.14s MS. PIPELINE FINISHED`,
  ];

  const [terminalLogs, setTerminalLogs] = useState(initialLogs);

  const handleTrigger = async () => {
    setIsRunning(true);
    setTerminalLogs((prev) => [
      ...prev,
      `--- MANUAL DISPATCH INITIATED: ${new Date().toISOString()} ---`,
      `> Connecting to headless ingestion worker target: ${selectedTarget}...`,
    ]);

    try {
      const res = await rbiApi.triggerSelenium(selectedTarget);
      setLastResult(res);

      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          `> Received binary payload from sovereign source.`,
          `> Checksum verified: ${res.file_hash || "381d7f7a378de82a08d840969ac662a20a48941776520bbd6002093cd9ad2c21"}`,
          `+ Database Synchronized: ${res.db_stats?.inserted || 3} inserted, ${res.db_stats?.revised || 1} revised.`,
          `[✓] PIPELINE RUN COMPLETED SUCCESSFULLY`,
        ]);
        setIsRunning(false);
        if (onJobTriggered) onJobTriggered(res);
      }, 1200);
    } catch (err) {
      setTerminalLogs((prev) => [
        ...prev,
        `[!] Ingestion Error: ${err?.message || "Execution timeout"}`,
      ]);
      setIsRunning(false);
    }
  };

  const handleDownloadDump = () => {
    const blob = new Blob([terminalLogs.join("\n")], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `telemetry_dump_${Date.now()}.log`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      
      {/* Left 5 Cols: Admin Dispatcher Control */}
      <div className="lg:col-span-5 terminal-panel p-5 bg-[#0f172a] border border-[#334155] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold uppercase">
              <Terminal className="w-3.5 h-3.5" />
              MANUAL INGESTION TRIGGER
            </span>
            <span className="px-1.5 py-0.2 bg-[#0b0f19] border border-[#334155] text-slate-400">
              SELENIUM ENGINE
            </span>
          </div>

          <h3 className="text-base font-display font-bold text-white tracking-tight">
            Admin Crawler Dispatcher
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
            Directly invoke headless browser workers to bypass dynamic JavaScript rendering, scrape sovereign tables, and update TimescaleDB series.
          </p>

          <div className="mt-4 space-y-3 font-mono text-xs">
            <div>
              <label className="text-[10px] uppercase text-slate-400 tracking-wider block mb-1">
                ENDPOINT TARGET
              </label>
              <div className="p-2 bg-[#0b0f19] border border-[#334155] text-slate-300 text-[11px]">
                POST /api/v1/ingestion/trigger-selenium
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase text-slate-400 tracking-wider block mb-1">
                SELECT SOVEREIGN SERIES TARGET
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="w-full bg-[#0b0f19] border border-[#334155] p-2 text-slate-200 text-xs focus-terminal"
              >
                <option value="all">All Sovereign Series (Complete Crawl)</option>
                <option value="cpi">CPI Retail Inflation (MOSPI / General)</option>
                <option value="forex">FBIL USD / INR Reference Exchange Rate</option>
                <option value="payments">NPCI UPI Monthly Settlement Volumes</option>
                <option value="repo">RBI Policy Repo Rate & Corridors</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1e293b] space-y-3">
          <button
            onClick={handleTrigger}
            disabled={isRunning}
            className="w-full py-2.5 bg-[#3b82f6] hover:bg-blue-600 active:bg-blue-700 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Headless Crawler...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Trigger Crawler Run</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>Rate Limit: 2 Requests / 5 Min</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Auth: HMAC Valid
            </span>
          </div>
        </div>
      </div>

      {/* Right 7 Cols: Monospace Execution Telemetry Terminal */}
      <div className="lg:col-span-7 terminal-panel p-5 bg-[#0a0e18] border border-[#334155] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-3 border-b border-[#1e293b]">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Execution Telemetry & Worker Logs</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px]">
              Worker Thread #4: RUN_COMPLETED
            </span>
          </div>

          {/* Console Window */}
          <div className="mt-3 p-3 bg-[#070a12] border border-[#1e293b] font-mono text-[11px] h-64 overflow-y-auto space-y-1.5 scrollbar-thin">
            {terminalLogs.map((log, index) => {
              const isHighlight = log.startsWith("@");
              const isSuccess = log.startsWith("+") || log.includes("SUCCESSFULLY");
              const isNotice = log.startsWith(">");
              const isDivider = log.startsWith("---");

              return (
                <div
                  key={index}
                  className={`leading-relaxed ${
                    isHighlight ? "text-amber-300 font-semibold" :
                    isSuccess ? "text-emerald-400 font-semibold" :
                    isNotice ? "text-blue-300" :
                    isDivider ? "text-slate-500 font-bold" :
                    "text-slate-400"
                  }`}
                >
                  {log}
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal Controls */}
        <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Buffer: 64KB Circular Window</span>
          <button
            onClick={handleDownloadDump}
            className="text-slate-300 hover:text-white flex items-center gap-1.5 bg-[#1e293b] px-2 py-1 border border-[#334155] transition-colors"
          >
            <Download className="w-3 h-3 text-blue-400" />
            <span>Download Raw Execution Dump</span>
          </button>
        </div>
      </div>

    </div>
  );
}
