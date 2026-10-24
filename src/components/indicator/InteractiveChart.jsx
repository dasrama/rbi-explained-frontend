import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  CartesianGrid
} from "recharts";
import { formatDate } from "../../utils/formatters";

// Custom marker for points with provisional or revised status
const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;

  if (payload.is_provisional) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="#f59e0b" stroke="#0b0f19" strokeWidth={2} />
        <rect x={cx - 10} y={cy - 22} width={20} height={14} fill="#f59e0b" />
        <text x={cx} y={cy - 12} fill="#000" fontSize={9} fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          P
        </text>
      </g>
    );
  }

  if (payload.is_revised) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={4.5} fill="#3b82f6" stroke="#0b0f19" strokeWidth={2} />
        <rect x={cx - 10} y={cy - 20} width={20} height={13} fill="#1e3a8a" stroke="#3b82f6" strokeWidth={1} />
        <text x={cx} y={cy - 10} fill="#93c5fd" fontSize={8} fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          R
        </text>
      </g>
    );
  }

  return <circle cx={cx} cy={cy} r={3} fill="#38bdf8" stroke="#0f172a" strokeWidth={1.5} />;
};

// Custom Tooltip component
const CustomChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-[#0b0f19] border border-[#3b82f6] p-3 font-mono text-xs shadow-xl min-w-[200px]">
      <div className="flex items-center justify-between border-b border-[#1e293b] pb-1.5 mb-2">
        <span className="text-slate-300 font-semibold">{formatDate(data.date, "shortMonth")}</span>
        {data.is_provisional ? (
          <span className="px-1.5 py-0.2 bg-amber-950 text-amber-300 border border-amber-700 text-[10px] font-bold">
            PROVISIONAL [P]
          </span>
        ) : data.is_revised ? (
          <span className="px-1.5 py-0.2 bg-blue-950 text-blue-300 border border-blue-700 text-[10px] font-bold">
            REVISED [R]
          </span>
        ) : (
          <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
            FINALIZED
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Index Level:</span>
          <span className="text-white font-bold">{data.value} pts</span>
        </div>

        {data.yoy_change !== null && data.yoy_change !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-slate-400">YoY Inflation:</span>
            <span className={`font-bold ${data.yoy_change > 4 ? "text-amber-400" : "text-emerald-400"}`}>
              {data.yoy_change > 0 ? `+${data.yoy_change}%` : `${data.yoy_change}%`}
            </span>
          </div>
        )}

        <div className="pt-1.5 border-t border-[#1e293b] text-[10px] text-slate-500">
          Target Corridor: 2.0% – 6.0% (Anchor: 4.0%)
        </div>
      </div>
    </div>
  );
};

export default function InteractiveChart({ seriesData }) {
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

  return (
    <div className="terminal-panel p-5 mb-6 bg-[#0f172a]">
      
      {/* Chart Header & Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#334155]">
        <div>
          <h2 className="text-base font-display font-bold text-white tracking-tight">
            Monetary Policy Corridor & Price Index Trajectory
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Statutory Target: 4.00% ± 200 bps tolerance interval (2.00% SDF floor to 6.00% ceiling).
          </p>
        </div>

        {/* View mode & Range controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#0b0f19] border border-[#334155] p-0.5">
            <button
              onClick={() => setViewMode("corridor")}
              className={`px-2.5 py-1 text-[11px] transition-colors ${
                viewMode === "corridor" ? "bg-[#3b82f6] text-white font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              YoY Inflation % (Corridor)
            </button>
            <button
              onClick={() => setViewMode("index")}
              className={`px-2.5 py-1 text-[11px] transition-colors ${
                viewMode === "index" ? "bg-[#3b82f6] text-white font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              Index Level (2024=100)
            </button>
            <button
              onClick={() => setViewMode("combo")}
              className={`px-2.5 py-1 text-[11px] transition-colors ${
                viewMode === "combo" ? "bg-[#3b82f6] text-white font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              Dual-Axis Combo
            </button>
          </div>

          {/* Timeframe Toggles */}
          <div className="flex items-center bg-[#0b0f19] border border-[#334155] p-0.5">
            {["6M", "1Y", "3Y", "ALL"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2 py-1 text-[11px] transition-colors ${
                  timeRange === range
                    ? "bg-[#334155] text-white font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Chart Legend Strip */}
      <div className="pt-3 pb-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400 border-b border-[#1e293b] mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/60"></span>
            <span>RBI Statutory Tolerance Band (2.0% – 6.0%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-b-2 border-dashed border-emerald-400"></span>
            <span>RBI 4.0% Mid-Point Anchor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-[#38bdf8]"></span>
            <span>YoY Inflation Rate (%)</span>
          </div>
          {viewMode === "combo" && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-blue-900 border border-blue-500"></span>
              <span>Index Level (Right Axis)</span>
            </div>
          )}
        </div>

        <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Hover points for central bank ledger metadata</span>
        </div>
      </div>

      {/* Recharts Canvas */}
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 20, right: 30, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#64748b"
              tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
              tickFormatter={(val) => formatDate(val, "shortMonth")}
            />

            {/* Left Y-Axis: YoY Inflation Rate */}
            <YAxis
              yAxisId="left"
              domain={viewMode === "index" ? [98, 114] : [0, 8]}
              stroke="#64748b"
              tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
              tickFormatter={(val) => (viewMode === "index" ? `${val}` : `${val}%`)}
            />

            {/* Right Y-Axis for Combo mode */}
            {viewMode === "combo" && (
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[98, 114]}
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
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
                  fillOpacity={0.06}
                />

                <ReferenceLine
                  yAxisId="left"
                  y={6.0}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "6.0% (Ceiling)",
                    fill: "#ef4444",
                    fontSize: 10,
                    fontFamily: "monospace",
                    position: "insideTopLeft",
                  }}
                />

                <ReferenceLine
                  yAxisId="left"
                  y={4.0}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: "RBI 4.0% TARGET",
                    fill: "#10b981",
                    fontSize: 10,
                    fontFamily: "monospace",
                    position: "insideRight",
                  }}
                />

                <ReferenceLine
                  yAxisId="left"
                  y={2.0}
                  stroke="#10b981"
                  strokeDasharray="3 3"
                  label={{
                    value: "2.0% (Floor)",
                    fill: "#10b981",
                    fontSize: 10,
                    fontFamily: "monospace",
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
                fill="#1e3a8a"
                fillOpacity={0.5}
                barSize={18}
              />
            )}

            {/* Primary line or area */}
            {viewMode === "index" ? (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="#1e3a8a"
                fillOpacity={0.2}
                dot={<CustomDot />}
              />
            ) : (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="yoy_change"
                stroke="#38bdf8"
                strokeWidth={2.5}
                fill="#0284c7"
                fillOpacity={0.12}
                dot={<CustomDot />}
                activeDot={{ r: 6, fill: "#38bdf8", stroke: "#ffffff" }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Meta */}
      <div className="pt-3 border-t border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
        <div>
          Methodological Framework: Base Year 2024 revisions applied per MOSPI Expert Advisory Note 2025/11.
        </div>
        <div className="text-slate-400">
          Updated today at 17:30 IST via Automated NSO DBIE Ingestion
        </div>
      </div>

    </div>
  );
}
