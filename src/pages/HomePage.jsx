import React from "react";
import { useQuery } from "@tanstack/react-query";
import { rbiApi } from "../api/rbiApi";
import MacroPulseBanner from "../components/dashboard/MacroPulseBanner";
import MacroHeroCards from "../components/dashboard/MacroHeroCards";
import IndicatorIndex from "../components/dashboard/IndicatorIndex";
import MacroEconomicsPrimer from "../components/dashboard/MacroEconomicsPrimer";

export default function HomePage({ onOpenEmiCalculator }) {
  const { data: indicatorsData, isLoading: loadingIndicators } = useQuery({
    queryKey: ["indicators"],
    queryFn: () => rbiApi.getIndicators({ page: 1, page_size: 50 }),
  });

  const { data: categoriesData, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => rbiApi.getCategories({ page: 1, page_size: 50 }),
  });

  const indicators = indicatorsData?.items || [];
  const categories = categoriesData?.items || [];

  return (
    <div className="page-enter max-w-[1720px] mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pt-8 sm:pb-16 space-y-6">
      
      {/* Hero Header & Quick Macro Pulse */}
      <MacroPulseBanner />

      {/* Top 4 Macro Ticker Cards */}
      <MacroHeroCards onOpenEmiCalculator={onOpenEmiCalculator} />

      {/* Macroeconomic Indicator Index (Catalog, Search & Filters) */}
      <IndicatorIndex
        indicators={indicators}
        categories={categories}
      />

      {/* Monetary Economics Primer & Statutory Corridors */}
      <MacroEconomicsPrimer />

    </div>
  );
}
