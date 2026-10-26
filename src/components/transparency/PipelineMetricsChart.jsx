import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function PipelineMetricsChart() {
  const { darkMode } = useTheme();

  // Generate 30 days of realistic ingestion metric points
  const data = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const baseExtracted = 1200 + Math.sin(i / 3) * 300 + (i % 7 === 0 ? 500 : 0);
    const verified = baseExtracted - (Math.random() > 0.8 ? 5 : 0);
    return {
      day: `${day}d`,
      extracted: Math.round(baseExtracted),
      verified: Math.round(verified),
    };
  });

  const tickColor = darkMode ? "#94a3b8" : "#334155";
  const gridColor = darkMode ? "#1e293b" : "#e2e8f0";

  return (
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-[#334155]">
        <div>
          <span className="text-xs font-mono text-blue-700 dark:text-blue-400 uppercase font-bold">
            PIPELINE FREQUENCY METRICS
          </span>
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white tracking-wide">
            30-Day Crawl Consistency & Throughput
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-700 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-blue-600 dark:bg-blue-500"></span>
            <span>Extracted Rows</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-emerald-600 dark:bg-emerald-500"></span>
            <span>Verified Checksums</span>
          </div>
        </div>
      </div>

      <div className="w-full h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="day"
              stroke={tickColor}
              tick={{ fill: tickColor, fontSize: 11, fontFamily: "monospace", fontWeight: 500 }}
            />
            <YAxis
              stroke={tickColor}
              tick={{ fill: tickColor, fontSize: 11, fontFamily: "monospace", fontWeight: 500 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-[#0b0f19] border-2 border-blue-600 dark:border-[#3b82f6] p-3 font-mono text-xs shadow-xl">
                    <div className="text-slate-600 dark:text-slate-400 font-medium">{d.day} ago</div>
                    <div className="text-blue-700 dark:text-blue-400 font-bold">{d.extracted} rows crawled</div>
                    <div className="text-emerald-700 dark:text-emerald-400 font-bold">{d.verified} checksums validated</div>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="extracted"
              stroke="#2563eb"
              fill={darkMode ? "#1e3a8a" : "#bfdbfe"}
              fillOpacity={darkMode ? 0.25 : 0.4}
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="verified"
              stroke="#059669"
              fill={darkMode ? "#065f46" : "#a7f3d0"}
              fillOpacity={darkMode ? 0.2 : 0.35}
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-2.5 border-t border-slate-200 dark:border-[#1e293b]">
        <span>30 Days Ago</span>
        <span>Mid-Period (Monetary Policy Committee Release)</span>
        <span className="text-blue-700 dark:text-blue-400 font-bold">Latest Cycle (Current)</span>
      </div>

    </div>
  );
}
