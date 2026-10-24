import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { rbiApi } from "../api/rbiApi";
import IndicatorHeader from "../components/indicator/IndicatorHeader";
import PlainEnglishExplainer from "../components/indicator/PlainEnglishExplainer";
import KeyStatsStrip from "../components/indicator/KeyStatsStrip";
import InteractiveChart from "../components/indicator/InteractiveChart";
import HistoricalObservationTable from "../components/indicator/HistoricalObservationTable";
import CentralBankRevisionAuditTrail from "../components/indicator/CentralBankRevisionAuditTrail";
import IndicatorIntelligenceWidgets from "../components/indicator/IndicatorIntelligenceWidgets";
import RevisionDetailModal from "../components/modals/RevisionDetailModal";
import { Table, History } from "lucide-react";

export default function IndicatorDetailPage({ onOpenApiDocs }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const activeSlug = slug || "cpi-combined-general";

  const [activeTab, setActiveTab] = useState("observations"); // 'observations' | 'revisions'
  const [selectedRevision, setSelectedRevision] = useState(null);

  // 1. Fetch Indicator Details
  const { data: indicator, isLoading: loadingIndicator } = useQuery({
    queryKey: ["indicator", activeSlug],
    queryFn: () => rbiApi.getIndicatorDetail(activeSlug),
  });

  // 2. Fetch Time Series for Chart
  const { data: seriesData, isLoading: loadingSeries } = useQuery({
    queryKey: ["series", activeSlug, indicator?.id],
    queryFn: () => rbiApi.getSeries(indicator?.id || activeSlug),
    enabled: !!indicator || !!activeSlug,
  });

  // 3. Fetch Observations
  const { data: obsData } = useQuery({
    queryKey: ["observations", activeSlug, indicator?.id],
    queryFn: () => rbiApi.getObservations(indicator?.id || 1),
    enabled: !!indicator || !!activeSlug,
  });

  // 4. Fetch Revisions
  const { data: revData } = useQuery({
    queryKey: ["revisions", activeSlug, indicator?.id],
    queryFn: () => rbiApi.getRevisions(indicator?.id || 1),
    enabled: !!indicator || !!activeSlug,
  });

  const observations = obsData?.items || [];
  const revisions = revData?.items || [];

  const handleOpenJsonFeed = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(seriesData, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `${activeSlug}_series.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCiteSeries = () => {
    const citation = `Reserve Bank of India (2026). "${indicator?.name || "Economic Indicator"}" [Data file]. Sourced from ${indicator?.source?.name || "DBIE / MOSPI"}. Retrievable at https://rbi.org.in.`;
    navigator.clipboard.writeText(citation);
    alert("Official Central Bank Series Citation copied to clipboard!\n\n" + citation);
  };

  if (loadingIndicator && !indicator) {
    return (
      <div className="max-w-[1720px] mx-auto px-4 py-16 text-center font-mono text-slate-400">
        <div className="inline-block animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent mb-3"></div>
        <div>Loading Sovereign Indicator Series Metadata...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1720px] mx-auto px-3 sm:px-6 py-6 space-y-6">
      
      {/* 1. Header & Sovereign Mandate Badges */}
      <IndicatorHeader
        indicator={indicator}
        onOpenJsonFeed={handleOpenJsonFeed}
        onCiteSeries={handleCiteSeries}
      />

      {/* 2. Plain-English Explainer Box */}
      <PlainEnglishExplainer indicator={indicator} />

      {/* 3. Key Statistics Strip */}
      <KeyStatsStrip
        indicator={indicator}
        onOpenRevision={() => {
          setActiveTab("revisions");
          if (revisions.length > 0) setSelectedRevision(revisions[0]);
        }}
      />

      {/* 4. Interactive Chart */}
      <InteractiveChart seriesData={seriesData} />

      {/* 5. Dual-Tab Switcher: Historical Observation Table vs. Revision Audit Trail */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 font-mono text-xs border-b border-[#334155] pb-2">
          <button
            onClick={() => setActiveTab("observations")}
            className={`px-4 py-2 border transition-colors flex items-center gap-2 ${
              activeTab === "observations"
                ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold"
                : "bg-[#0f172a] text-slate-400 border-[#334155] hover:text-slate-200"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Historical Observation Table ({observations.length} Series)</span>
          </button>

          <button
            onClick={() => setActiveTab("revisions")}
            className={`px-4 py-2 border transition-colors flex items-center gap-2 ${
              activeTab === "revisions"
                ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold"
                : "bg-[#0f172a] text-slate-400 border-[#334155] hover:text-slate-200"
            }`}
          >
            <History className="w-3.5 h-3.5 text-blue-400" />
            <span>Central Bank Revision Audit Trail</span>
            <span className="px-1.5 py-0.2 bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">
              {revisions.length} Logged Revisions
            </span>
          </button>
        </div>

        {activeTab === "observations" ? (
          <HistoricalObservationTable
            observations={observations}
            onSelectObservation={(obs) => {
              if (obs.is_revised && revisions.length > 0) {
                setSelectedRevision(revisions[0]);
              }
            }}
          />
        ) : (
          <CentralBankRevisionAuditTrail
            revisions={revisions}
            onSelectRevision={(rev) => setSelectedRevision(rev)}
          />
        )}
      </div>

      {/* 6. Bottom 3 Intelligence Widgets */}
      <IndicatorIntelligenceWidgets
        indicator={indicator}
        onOpenApiDocs={onOpenApiDocs}
      />

      {/* Revision Detail Modal */}
      {selectedRevision && (
        <RevisionDetailModal
          revision={selectedRevision}
          onClose={() => setSelectedRevision(null)}
        />
      )}

    </div>
  );
}
