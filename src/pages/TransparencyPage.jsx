import React from "react";
import { useQuery } from "@tanstack/react-query";
import { rbiApi } from "../api/rbiApi";
import TransparencyHeader from "../components/transparency/TransparencyHeader";
import PublishingDirectory from "../components/transparency/PublishingDirectory";
import SovereignReleaseCalendar from "../components/transparency/SovereignReleaseCalendar";
import IntegrityArchitectureCards from "../components/transparency/IntegrityArchitectureCards";

export default function TransparencyPage() {
  const { data: sourcesData } = useQuery({
    queryKey: ["sources"],
    queryFn: () => rbiApi.getSources(),
  });

  const sources = sourcesData?.items || [];

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pt-8 sm:pb-16 space-y-6">
      
      {/* 1. Sovereign Provenance Header */}
      <TransparencyHeader />

      {/* 2. Upstream Sovereign Publishing Directory */}
      <PublishingDirectory sources={sources} />

      {/* 3. Central Bank Publication & Release Schedule */}
      <SovereignReleaseCalendar />

      {/* 4. Integrity Architecture & Deduplication Policy */}
      <IntegrityArchitectureCards />

    </div>
  );
}
