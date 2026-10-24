import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { formatIndianNumber, formatDate } from "../../utils/formatters";

export default function IndicatorIndex({ indicators = [], categories = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFrequency, setSelectedFrequency] = useState("all");
  const [provisionalOnly, setProvisionalOnly] = useState(false);

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
    <section className="terminal-panel p-5 mb-8 bg-[#0f172a]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#334155]">
        <div>
          <h2 className="text-xl font-display font-bold text-white tracking-tight">
            Macroeconomic Indicator Index
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Validated series directly synced with Database on Indian Economy (DBIE) and MOSPI releases.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indicator (e.g. CPI, USD, repo...)"
            className="w-full bg-[#0b0f19] border border-[#334155] pl-9 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus-terminal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2 text-xs font-mono text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="pt-4 pb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b]">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 border transition-colors ${
              selectedCategory === "all"
                ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold"
                : "bg-[#0b0f19] text-slate-400 border-[#334155] hover:text-slate-200 hover:bg-[#1e293b]"
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
                className={`px-3 py-1 border transition-colors ${
                  selectedCategory === String(cat.id)
                    ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold"
                    : "bg-[#0b0f19] text-slate-400 border-[#334155] hover:text-slate-200 hover:bg-[#1e293b]"
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
          <div className="flex items-center gap-1 bg-[#0b0f19] border border-[#334155] p-0.5">
            {["all", "MONTHLY", "DAILY", "WEEKLY"].map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedFrequency(freq)}
                className={`px-2 py-0.5 text-[11px] uppercase transition-colors ${
                  selectedFrequency === freq
                    ? "bg-[#334155] text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {freq === "all" ? "All Freq" : freq.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Provisional Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer bg-[#0b0f19] border border-[#334155] px-2.5 py-1 text-[11px] text-amber-300 select-none hover:bg-[#1e293b] transition-colors">
            <input
              type="checkbox"
              checked={provisionalOnly}
              onChange={(e) => setProvisionalOnly(e.target.checked)}
              className="accent-[#f59e0b] w-3.5 h-3.5"
            />
            <span className="font-semibold">[P] Provisional Flagged Only</span>
          </label>

        </div>
      </div>

      {/* Grid of Indicator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        {filteredIndicators.map((item) => (
          <div
            key={item.id}
            className="terminal-panel p-4 bg-[#0a0e18] border border-[#334155] hover:border-[#3b82f6] flex flex-col justify-between group transition-all"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="px-1.5 py-0.2 bg-[#0f172a] text-blue-400 border border-blue-900/60 font-semibold uppercase">
                  {item.code}
                </span>

                <div className="flex items-center gap-1.5">
                  {item.is_provisional ? (
                    <span className="px-1.5 py-0.2 bg-amber-950/80 text-amber-400 border border-amber-800 font-semibold">
                      PROVISIONAL [P]
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-semibold">
                      FINAL VERIFIED
                    </span>
                  )}
                  <span className="text-slate-500 uppercase">{item.frequency}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-display font-semibold text-white group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* Headline numbers */}
              <div className="mt-4 flex items-baseline justify-between border-t border-[#1e293b] pt-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-display font-bold text-white tracking-tight">
                      {item.code === "USD_INR_REF_RATE" ? `₹${item.latest_value}` : 
                       item.code === "FOREX_RESERVES_USD" ? `$${item.latest_value}B` :
                       item.code === "NET_LIQUIDITY_LAF" ? `₹${formatIndianNumber(item.latest_value, 0)} Cr` :
                       item.latest_value}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.code === "CPI_COMBINED_GENERAL" || item.code === "WPI_ALL_COMMODITIES" ? "YoY Headline" : 
                       item.units}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Observation: {formatDate(item.latest_observation_date, "shortMonth")}
                  </div>
                </div>

                {/* Trajectory pill */}
                {item.yoy_change !== undefined && (
                  <div className="text-right">
                    <span className={`text-xs font-mono font-semibold ${
                      item.yoy_change > 0 ? "text-emerald-400" : "text-slate-300"
                    }`}>
                      {item.yoy_change > 0 ? `+${item.yoy_change}%` : `${item.yoy_change}%`}
                    </span>
                    <div className="text-[9px] font-mono text-slate-500 uppercase">YoY Delta</div>
                  </div>
                )}
              </div>

              {/* Mini Sparkline Graphic */}
              <div className="mt-3 py-1">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 32" fill="none">
                  <path
                    d={
                      item.code === "REPO_RATE"
                        ? "M 0 24 H 60 V 16 H 120 V 8 H 200"
                        : "M 0 24 Q 50 28, 100 16 T 150 12 T 200 6"
                    }
                    stroke={
                      item.code === "CPI_COMBINED_GENERAL" ? "#ef4444" :
                      item.code === "USD_INR_REF_RATE" ? "#3b82f6" :
                      item.code === "FOREX_RESERVES_USD" ? "#f59e0b" :
                      "#10b981"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Plain-English Takeaway */}
              <div className="mt-2 p-2 bg-[#0b0f19] border border-[#1e293b] text-[11px] text-slate-300 leading-snug">
                <span className="font-semibold text-blue-400 font-mono">Plain-English: </span>
                {item.plain_english}
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                {item.tolerance_corridor ? "Statutory 2%–6% Band" : "RBI Statistical Series"}
              </span>

              <Link
                to={`/indicators/${item.slug}`}
                className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group-hover:underline"
              >
                <span>Explore Chart & Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredIndicators.length === 0 && (
        <div className="py-12 text-center font-mono text-slate-400 text-xs">
          No economic indicators matched your current filter or search criteria.
        </div>
      )}
    </section>
  );
}
