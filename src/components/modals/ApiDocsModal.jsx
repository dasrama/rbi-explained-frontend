import React, { useState } from "react";
import { X, Play, Code2, Copy, Check, ExternalLink, Terminal } from "lucide-react";
import { rbiApi } from "../../api/rbiApi";

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/health",
    title: "System Health & Database Connectivity",
    desc: "Checks uptime, PostgreSQL Timescale connectivity, and app version.",
    call: () => rbiApi.getHealth(),
  },
  {
    method: "GET",
    path: "/categories",
    title: "Catalog Categories Taxonomy",
    desc: "Fetches macro categories (Inflation, Forex, Payments, Monetary Policy).",
    call: () => rbiApi.getCategories(),
  },
  {
    method: "GET",
    path: "/indicators",
    title: "All Tracked Economic Indicators",
    desc: "Catalog directory with latest observations, units, and frequencies.",
    call: () => rbiApi.getIndicators(),
  },
  {
    method: "GET",
    path: "/indicators/1",
    title: "Indicator Detail View (CPI Combined)",
    desc: "Full metadata with joined Category and Sovereign Data Source.",
    call: () => rbiApi.getIndicatorDetail(1),
  },
  {
    method: "GET",
    path: "/indicators/1/series",
    title: "Lightweight Time Series Points (Chart Data)",
    desc: "Primary charting endpoint with dates, values, and provisional/revised flags.",
    call: () => rbiApi.getSeries(1),
  },
  {
    method: "GET",
    path: "/indicators/1/observations",
    title: "Tabular Raw Observations",
    desc: "Paginated observation records with revision numbers and raw file IDs.",
    call: () => rbiApi.getObservations(1),
  },
  {
    method: "GET",
    path: "/indicators/1/revisions",
    title: "Central Bank Historical Revision Audit Trail",
    desc: "Tracks provisional to final changes, differences, and percentage deltas.",
    call: () => rbiApi.getRevisions(1),
  },
  {
    method: "GET",
    path: "/sources",
    title: "Sovereign Publishing Sources",
    desc: "Lists RBI Bulletin, DBIE, NPCI, FBIL, and MOSPI metadata.",
    call: () => rbiApi.getSources(),
  },
  {
    method: "GET",
    path: "/ingestion/jobs",
    title: "Crawler Jobs Immutable Execution Log",
    desc: "History of Selenium and API crawler synchronizations.",
    call: () => rbiApi.getJobs(),
  },
  {
    method: "POST",
    path: "/ingestion/trigger-selenium?indicator=all",
    title: "Trigger Headless Ingestion Crawler",
    desc: "Dispatches on-demand Selenium Chromium worker to scrape tables.",
    call: () => rbiApi.triggerSelenium("all"),
  },
];

export default function ApiDocsModal({ onClose }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [responseJson, setResponseJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExecute = async () => {
    setIsLoading(true);
    setResponseJson(null);
    try {
      const data = await selectedEndpoint.call();
      setResponseJson(data);
    } catch (err) {
      setResponseJson({ error: err?.message || "Execution error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!responseJson) return;
    navigator.clipboard.writeText(JSON.stringify(responseJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-5xl h-[85vh] bg-[#0f172a] border border-[#3b82f6] shadow-2xl flex flex-col font-mono text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0b0f19] border-b border-[#334155] shrink-0">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-white font-display font-bold text-sm tracking-wide">
                Interactive Sovereign OpenAPI & Swagger Docs
              </span>
              <span className="ml-2 text-[10px] text-slate-400">v1.0.0 (OAS 3.1)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-[#1e293b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Split: Endpoints list & Live Tester */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left 4 Cols: Endpoints Selector */}
          <div className="md:col-span-4 border-r border-[#334155] bg-[#0b0f19] overflow-y-auto p-3 space-y-1.5">
            <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider px-2 py-1">
              SOVEREIGN REST ENDPOINTS
            </div>

            {API_ENDPOINTS.map((ep, idx) => {
              const isSelected = selectedEndpoint.path === ep.path;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(ep);
                    setResponseJson(null);
                  }}
                  className={`w-full text-left p-2.5 transition-colors border ${
                    isSelected
                      ? "bg-[#1e293b] border-[#3b82f6] text-white"
                      : "bg-[#0f172a] border-[#1e293b] text-slate-400 hover:text-slate-200 hover:bg-[#171e2e]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`px-1.5 py-0.2 text-[9px] font-bold ${
                      ep.method === "POST" ? "bg-amber-950 text-amber-300 border border-amber-700" : "bg-blue-950 text-blue-300 border border-blue-800"
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-semibold text-slate-200 text-[11px] truncate">
                      {ep.path}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {ep.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 8 Cols: Tester Window */}
          <div className="md:col-span-8 bg-[#0f172a] flex flex-col justify-between overflow-hidden p-5">
            <div className="space-y-4 overflow-y-auto">
              
              {/* Endpoint Header */}
              <div className="p-3 bg-[#0b0f19] border border-[#334155]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`px-2 py-0.5 text-[10px] font-bold ${
                    selectedEndpoint.method === "POST" ? "bg-amber-950 text-amber-300 border border-amber-700" : "bg-blue-950 text-blue-300 border border-blue-800"
                  }`}>
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-white font-bold text-sm">
                    {selectedEndpoint.path}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  {selectedEndpoint.desc}
                </p>
              </div>

              {/* Execution Action Button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleExecute}
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-white ${isLoading ? "animate-spin" : ""}`} />
                  <span>{isLoading ? "Executing Request..." : "Try It Out / Execute Request"}</span>
                </button>

                {responseJson && (
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 bg-[#0b0f19] border border-[#334155] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy JSON"}</span>
                  </button>
                )}
              </div>

              {/* Response Display Box */}
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1.5">
                  SERVER RESPONSE (HTTP 200 OK)
                </div>
                <div className="p-3.5 bg-[#070a12] border border-[#1e293b] font-mono text-[11px] h-72 overflow-auto text-emerald-400 leading-relaxed scrollbar-thin">
                  {isLoading ? (
                    <div className="text-slate-400 animate-pulse">
                      Contacting endpoint / generating validated response envelope...
                    </div>
                  ) : responseJson ? (
                    <pre>{JSON.stringify(responseJson, null, 2)}</pre>
                  ) : (
                    <div className="text-slate-500">
                      Click "Try It Out / Execute Request" above to test this live endpoint.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom URL notice */}
            <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-[10px] text-slate-400">
              <span>Base URL: http://localhost:8000/api/v1</span>
              <span>FastAPI &amp; Swagger Spec Compatible</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
