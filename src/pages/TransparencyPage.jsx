import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { rbiApi } from "../api/rbiApi";
import TransparencyHeader from "../components/transparency/TransparencyHeader";
import SystemHealthKpis from "../components/transparency/SystemHealthKpis";
import CrawlerDispatcherTerminal from "../components/transparency/CrawlerDispatcherTerminal";
import PipelineMetricsChart from "../components/transparency/PipelineMetricsChart";
import PublishingDirectory from "../components/transparency/PublishingDirectory";
import IngestionJobsAuditTable from "../components/transparency/IngestionJobsAuditTable";
import IntegrityArchitectureCards from "../components/transparency/IntegrityArchitectureCards";
import { X, ShieldCheck } from "lucide-react";

export default function TransparencyPage() {
  const queryClient = useQueryClient();
  const [inspectedJob, setInspectedJob] = useState(null);

  const { data: health } = useQuery({
    queryKey: ["health"],
    queryFn: () => rbiApi.getHealth(),
  });

  const { data: sourcesData } = useQuery({
    queryKey: ["sources"],
    queryFn: () => rbiApi.getSources(),
  });

  const { data: jobsData } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => rbiApi.getJobs({ page: 1, page_size: 50 }),
  });

  const sources = sourcesData?.items || [];
  const jobs = jobsData?.items || [];

  const handleJobTriggered = () => {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    queryClient.invalidateQueries({ queryKey: ["health"] });
  };

  return (
    <div className="max-w-[1720px] mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* 1. Header */}
      <TransparencyHeader />

      {/* 2. System Health KPI Strip */}
      <SystemHealthKpis health={health} />

      {/* 3. Admin Crawler Dispatcher & Execution Telemetry */}
      <CrawlerDispatcherTerminal onJobTriggered={handleJobTriggered} />

      {/* 4. 30-Day Pipeline Metrics Area Chart */}
      <PipelineMetricsChart />

      {/* 5. Upstream Sovereign Publishing Directory */}
      <PublishingDirectory sources={sources} />

      {/* 6. Ingestion Jobs Audit Trail Table */}
      <IngestionJobsAuditTable
        jobs={jobs}
        onInspectJob={(job) => setInspectedJob(job)}
      />

      {/* 7. Integrity Architecture & Deduplication Policy */}
      <IntegrityArchitectureCards />

      {/* Job Inspection Modal */}
      {inspectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#0f172a] border border-[#3b82f6] shadow-2xl relative font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0b0f19] border-b border-[#334155]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-semibold">Job Audit: {inspectedJob.id}</span>
              </div>
              <button
                onClick={() => setInspectedJob(null)}
                className="p-1 text-slate-400 hover:text-white hover:bg-[#1e293b]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex justify-between py-1 border-b border-[#1e293b]">
                <span className="text-slate-400">Indicator Target:</span>
                <span className="text-white font-bold">{inspectedJob.indicator_code}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]">
                <span className="text-slate-400">Execution Type:</span>
                <span className="text-blue-400">{inspectedJob.job_type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">{inspectedJob.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]">
                <span className="text-slate-400">Database Operations:</span>
                <span className="text-slate-200">
                  +{inspectedJob.records_inserted} inserted, +{inspectedJob.records_revised} revised, {inspectedJob.records_skipped || 0} skipped
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1e293b]">
                <span className="text-slate-400">SHA-256 Checksum:</span>
                <span className="text-slate-300 text-[10px]">{inspectedJob.sha256_checksum}</span>
              </div>
              <div className="py-2">
                <span className="text-slate-400 block mb-1">Execution Log Summary:</span>
                <div className="p-2.5 bg-[#0b0f19] border border-[#1e293b] text-slate-200 text-[11px]">
                  {inspectedJob.log_summary || inspectedJob.error_message || "Executed cleanly with zero errors."}
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-[#0b0f19] border-t border-[#1e293b] flex justify-end">
              <button
                onClick={() => setInspectedJob(null)}
                className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155] text-xs font-mono"
              >
                Close Job Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
