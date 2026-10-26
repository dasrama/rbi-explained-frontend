import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  CartesianGrid
} from "recharts";
import { formatDate } from "../../utils/formatters";
import { useTheme } from "../../context/ThemeContext";

// Custom marker for points with provisional or revised status
const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;

  if (payload.is_provisional) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="#f59e0b" stroke="#ffffff" strokeWidth={2} />
        <rect x={cx - 10} y={cy - 24} width={20} height={16} fill="#f59e0b" rx={2} />
        <text x={cx} y={cy - 12} fill="#000000" fontSize={10} fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          P
        </text>
      </g>
    );
  }

  if (payload.is_revised) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="#2563eb" stroke="#ffffff" strokeWidth={2} />
        <rect x={cx - 10} y={cy - 24} width={20} height={16} fill="#1d4ed8" stroke="#3B82F6 " strokeWidth={1} rx={2} />
        <text x={cx} y={cy - 12} fill="#ffffff" fontSize={10} fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          R
        </text>
      </g>
    );
  }

  return <circle cx={cx} cy={cy} r={3.5} fill="#0284c7" stroke="#ffffff" strokeWidth={1.5} />;
};

// Custom Tooltip component with high contrast in both themes
const CustomChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white dark:bg-[#0b0f19] border-2 border-blue-600 dark:border-[#3B82F6 ] p-3.5 font-mono text-xs shadow-2xl min-w-[220px]">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1e293b] pb-2 mb-2">
        <span className="text-slate-900 dark:text-slate-200 font-bold text-sm">{formatDate(data.date, "shortMonth")}</span>
        {data.is_provisional ? (
          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold">
            PROVISIONAL [P]
          </span>
        ) : data.is_revised ? (
          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-700 text-xs font-bold">
            REVISED [R]
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold">
            FINALIZED
          </span>
        )}
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-400 font-medium">Index Level:</span>
          <span className="text-slate-900 dark:text-white font-bold">{data.value} pts</span>
        </div>

        {data.yoy_change !== null && data.yoy_change !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400 font-medium">YoY Inflation:</span>
            <span className={`font-bold ${data.yoy_change > 4 ? "text-amber-700 dark:text-amber-400" : "text-emerald-700 dark:text-emerald-400"}`}>
              {data.yoy_change > 0 ? `+${data.yoy_change}%` : `${data.yoy_change}%`}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-200 dark:border-[#1e293b] text-xs text-slate-500 dark:text-slate-400">
          Target Corridor: 2.0% – 6.0% (Anchor: 4.0%)
        </div>
      </div>
    </div>
  );
};

export default function InteractiveChart({ seriesData }) {
  const { darkMode } = useTheme();
  const [timeRange, setTimeRange] = useState("1Y"); // 6M, 1Y, 3Y, 5Y, ALL
  const [viewMode, setViewMode] = useState("corridor"); // corridor, index, combo

  const points = seriesData?.data_points || [];

  // Filter points based on timeframe
  const filteredData = useMemo(() => {
    if (!points.length) return [];
    if (timeRange === "6M") return points.slice(-6);
    if (timeRange === "1Y") return points.slice(-12);
    if (timeRange === "3Y") return points.slice(-36);
    if (timeRange === "5Y") return points.slice(-60);
    return points;
  }, [points, timeRange]);

  const tickColor = darkMode ? "#94a3b8" : "#334155";
  const gridColor = darkMode ? "#1e293b" : "#e2e8f0";

  return (
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
      
      {/* Chart Header & Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#334155]">
        <div>
          <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Monetary Policy Corridor & Price Index Trajectory
          </h2>
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
            Statutory Target: 4.00% ± 200 bps tolerance interval (2.00% SDF floor to 6.00% ceiling).
          </p>
        </div>

        {/* View mode & Range controls */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] p-0.5">
            <button
              onClick={() => setViewMode("corridor")}
              className={`px-3 py-1.5 text-xs transition-colors font-medium ${
                viewMode === "corridor" ? "bg-blue-600 text-white font-bold shadow-sm" : "text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              YoY Inflation % (Corridor)
            </button>
            <button
              onClick={() => setViewMode("index")}
              className={`px-3 py-1.5 text-xs transition-colors font-medium ${
                viewMode === "index" ? "bg-blue-600 text-white font-bold shadow-sm" : "text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Index Level (2024=100)
            </button>
            <button
              onClick={() => setViewMode("combo")}
              className={`px-3 py-1.5 text-xs transition-colors font-medium ${
                viewMode === "combo" ? "bg-blue-600 text-white font-bold shadow-sm" : "text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Dual-Axis Combo
            </button>
          </div>

          {/* Timeframe Toggles */}
          <div className="flex items-center bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] p-0.5">
            {["6M", "1Y", "3Y", "ALL"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1.5 text-xs transition-colors font-semibold ${
                  timeRange === range
                    ? "bg-white dark:bg-[#334155] text-slate-900 dark:text-white shadow-sm font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Chart Legend Strip */}
      <div className="pt-3 pb-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-[#1e293b] mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-emerald-500/20 border border-emerald-500/60"></span>
            <span className="font-medium text-slate-800 dark:text-slate-300">RBI Statutory Tolerance Band (2.0% – 6.0%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-b-2 border-dashed border-emerald-600 dark:border-emerald-400"></span>
            <span className="font-medium text-slate-800 dark:text-slate-300">RBI 4.0% Mid-Point Anchor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-blue-600 dark:bg-[#38bdf8]"></span>
            <span className="font-medium text-slate-800 dark:text-slate-300">YoY Inflation Rate (%)</span>
          </div>
          {viewMode === "combo" && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-blue-200 dark:bg-blue-900 border border-blue-600 dark:border-blue-500"></span>
              <span className="font-medium text-slate-800 dark:text-slate-300">Index Level (Right Axis)</span>
            </div>
          )}
        </div>

        <div className="text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Hover points for central bank ledger metadata</span>
        </div>
      </div>

      {/* Recharts Canvas */}
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 20, right: 30, left: -5, bottom: 10 }}>
            <CartesianGrid strokeDasharray="2 2" stroke={gridColor} vertical={false} />

            <XAxis
              dataKey="date"
              stroke={tickColor}
              tick={{ fill: tickColor, fontSize: 11, fontFamily: "monospace", fontWeight: 500 }}
              tickFormatter={(val) => formatDate(val, "shortMonth")}
            />

            {/* Left Y-Axis */}
            <YAxis
              yAxisId="left"
              domain={viewMode === "index" ? [98, 114] : [0, 8]}
              stroke={tickColor}
              tick={{ fill: tickColor, fontSize: 11, fontFamily: "monospace", fontWeight: 500 }}
              tickFormatter={(val) => (viewMode === "index" ? `${val}` : `${val}%`)}
            />

            {/* Right Y-Axis for Combo mode */}
            {viewMode === "combo" && (
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[98, 114]}
                stroke={tickColor}
                tick={{ fill: tickColor, fontSize: 11, fontFamily: "monospace", fontWeight: 500 }}
                tickFormatter={(val) => `${val}`}
              />
            )}

            {/* Corridor Reference Shading (2.0% to 6.0%) */}
            {viewMode !== "index" && (
              <>
                <ReferenceArea
                  yAxisId="left"
                  y1={2.0}
                  y2={6.0}
                  fill="#10b981"
                  fillOpacity={darkMode ? 0.08 : 0.12}
                />

                <ReferenceLine
                  yAxisId="left"
                  y={6.0}
                  stroke="#dc2626"
                  strokeDasharray="3 3"
                  label={{
                    value: "6.0% (Ceiling)",
                    fill: "#dc2626",
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    position: "insideTopLeft",
                  }}
                />

                <ReferenceLine
                  yAxisId="left"
                  y={4.0}
                  stroke="#059669"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  label={{
                    value: "RBI 4.0% TARGET",
                    fill: "#059669",
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    position: "insideRight",
                  }}
                />

                <ReferenceLine
                  yAxisId="left"
                  y={2.0}
                  stroke="#059669"
                  strokeDasharray="3 3"
                  label={{
                    value: "2.0% (Floor)",
                    fill: "#059669",
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    position: "insideBottomLeft",
                  }}
                />
              </>
            )}

            <Tooltip content={<CustomChartTooltip />} />

            {/* Combo Bar mode */}
            {viewMode === "combo" && (
              <Bar
                yAxisId="right"
                dataKey="value"
                fill={darkMode ? "#1e3a8a" : "#93c5fd"}
                fillOpacity={0.7}
                barSize={18}
              />
            )}

            {/* Primary line or area */}
            {viewMode === "index" ? (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                fill={darkMode ? "#1e3a8a" : "#bfdbfe"}
                fillOpacity={darkMode ? 0.25 : 0.4}
                dot={<CustomDot />}
              />
            ) : (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="yoy_change"
                stroke="#0284c7"
                strokeWidth={3}
                fill={darkMode ? "#0284c7" : "#bae6fd"}
                fillOpacity={darkMode ? 0.18 : 0.35}
                dot={<CustomDot />}
                activeDot={{ r: 7, fill: "#0284c7", stroke: "#ffffff", strokeWidth: 2 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Meta */}
      <div className="pt-3.5 border-t border-slate-200 dark:border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
        <div>
          Methodological Framework: Base Year 2024 revisions applied per MOSPI Expert Advisory Note 2025/11.
        </div>
        <div className="text-slate-700 dark:text-slate-300 font-semibold">
          Updated today at 17:30 IST via Automated NSO DBIE Ingestion
        </div>
      </div>

    </div>
  );
}
