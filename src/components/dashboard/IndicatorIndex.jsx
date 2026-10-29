import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { formatIndianNumber, formatDate } from "../../utils/formatters";
import CardInfoPopover from "../common/CardInfoPopover";

export default function IndicatorIndex({ indicators = [], categories = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFrequency, setSelectedFrequency] = useState("all");
  const [provisionalOnly, setProvisionalOnly] = useState(false);
  const [activePopoverId, setActivePopoverId] = useState(null);
  const searchRef = useRef(null);

  // Cmd+K / Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered indicators
  const filteredIndicators = useMemo(() => {
    return indicators.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category_id !== Number(selectedCategory)) {
        return false;
      }
      // Frequency filter
      if (selectedFrequency !== "all" && item.frequency !== selectedFrequency) {
        return false;
      }
      // Provisional filter
      if (provisionalOnly && !item.is_provisional) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        const matchDesc = (item.description || "").toLowerCase().includes(q);
        return matchName || matchCode || matchDesc;
      }
      return true;
    });
  }, [indicators, selectedCategory, selectedFrequency, provisionalOnly, searchQuery]);

  return (
    <section className="terminal-panel p-5 sm:p-6 mb-8 bg-white dark:bg-[#000000] border border-slate-200 dark:border-[#1e293b] shadow-sm">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-[#334155]">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Macroeconomic Indicator Index
          </h2>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
            Validated series directly synced with Database on Indian Economy (DBIE) and MOSPI releases.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indicator (e.g. CPI, USD, repo...)"
            className="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] pl-9 pr-16 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus-terminal"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          ) : (
            <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-slate-700 px-1 py-0.5 leading-none select-none">
              ⌘K
            </span>
          )}
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="pt-4 pb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1e293b]">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 border transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                : "bg-slate-50 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-[#334155] hover:bg-slate-100 dark:hover:bg-[#1e293b]"
            }`}
          >
            All Indicators ({indicators.length})
          </button>

          {categories.map((cat) => {
            const count = indicators.filter((i) => i.category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(String(cat.id))}
                className={`px-3 py-1.5 border transition-colors ${
                  selectedCategory === String(cat.id)
                    ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                    : "bg-slate-50 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-[#334155] hover:bg-slate-100 dark:hover:bg-[#1e293b]"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Right Aux Filters: Frequency + Provisional Toggle */}
        <div className="flex items-center gap-3 font-mono text-xs">
          
          {/* Frequency selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] p-0.5">
            {["all", "MONTHLY", "DAILY", "WEEKLY"].map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedFrequency(freq)}
                className={`px-2.5 py-1 text-xs uppercase transition-colors font-medium ${
                  selectedFrequency === freq
                    ? "bg-white dark:bg-[#334155] text-slate-900 dark:text-white font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {freq === "all" ? "All Freq" : freq.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Provisional Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer bg-amber-50 dark:bg-[#0b0f19] border border-amber-300 dark:border-[#334155] px-3 py-1.5 text-xs text-amber-900 dark:text-amber-300 select-none hover:bg-amber-100 dark:hover:bg-[#1e293b] transition-colors">
            <input
              type="checkbox"
              checked={provisionalOnly}
              onChange={(e) => setProvisionalOnly(e.target.checked)}
              className="accent-[#f59e0b] w-4 h-4 cursor-pointer"
            />
            <span className="font-bold">[P] Provisional Flagged Only</span>
          </label>

        </div>
      </div>

      {/* Grid of Indicator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        {filteredIndicators.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 flex flex-col justify-between h-full shadow-sm relative group"
          >
            <div>
              {/* Header tags with Info Popover */}
              <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                <span className="px-2 py-0.5 bg-blue-50/80 dark:bg-[#000000] text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/60 font-bold uppercase text-[11px]">
                  {item.code}
                </span>

                <div className="flex items-center gap-2">
                  {item.is_provisional ? (
                    <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold text-[11px]">
                      PROVISIONAL [P]
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold text-[11px]">
                      FINAL VERIFIED
                    </span>
                  )}
                  <span className="text-slate-500 dark:text-slate-400 uppercase text-xs font-medium">
                    {item.frequency}
                  </span>
                  <CardInfoPopover
                    cardId={`indicator-${item.id}`}
                    activeId={activePopoverId}
                    onToggle={(id) => setActivePopoverId(activePopoverId === id ? null : id)}
                    title={item.name}
                    subtitle={`Code: ${item.code} • Frequency: ${item.frequency}`}
                    description={item.plain_english}
                    secondaryDescription={item.description}
                    badgeText={item.tolerance_corridor ? "Statutory 2%–6% Band" : "RBI Statistical Series"}
                    actionLink={`/indicators/${item.slug}`}
                    actionText="Open Full Ledger"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>

              {/* Headline numbers */}
              <div className="mt-3.5 flex items-baseline justify-between border-t border-slate-200/70 dark:border-slate-800/70 pt-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.code === "USD_INR_REF_RATE" ? `₹${item.latest_value}` : 
                       item.code === "FOREX_RESERVES_USD" ? `$${item.latest_value}B` :
                       item.code === "NET_LIQUIDITY_LAF" ? `₹${formatIndianNumber(item.latest_value, 0)} Cr` :
                       item.latest_value}
                    </span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
                      {item.code === "CPI_COMBINED_GENERAL" || item.code === "WPI_ALL_COMMODITIES" ? "YoY Headline" : 
                       item.units}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    Observation: {formatDate(item.latest_observation_date, "shortMonth")}
                  </div>
                </div>

                {/* Trajectory pill */}
                {item.yoy_change !== undefined && (
                  <div className="text-right">
                    <span className={`text-xs font-mono font-bold ${
                      item.yoy_change > 0 ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"
                    }`}>
                      {item.yoy_change > 0 ? `+${item.yoy_change}%` : `${item.yoy_change}%`}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">YoY Delta</div>
                  </div>
                )}
              </div>

              {/* Mini Sparkline Graphic */}
              <div className="mt-3 py-1">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 32" fill="none" aria-hidden="true">
                  <path
                    d={
                      item.code === "REPO_RATE"
                        ? "M 0 24 H 60 V 16 H 120 V 8 H 200"
                        : "M 0 24 Q 50 28, 100 16 T 150 12 T 200 6"
                    }
                    stroke={
                      item.code === "CPI_COMBINED_GENERAL" ? "#dc2626" :
                      item.code === "USD_INR_REF_RATE" ? "#2563eb" :
                      item.code === "FOREX_RESERVES_USD" ? "#d97706" :
                      "#059669"
                    }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between">
              <Link
                to={`/indicators/${item.slug}`}
                className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 group-hover:underline"
              >
                <span>Explore Chart & Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                {item.code}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredIndicators.length === 0 && (
        <div className="py-12 text-center font-mono text-slate-600 dark:text-slate-400 text-xs">
          No economic indicators matched your current filter or search criteria.
        </div>
      )}
    </section>
  );
}
