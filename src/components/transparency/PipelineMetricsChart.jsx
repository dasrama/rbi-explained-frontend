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

export default function PipelineMetricsChart() {
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

  return (
    <div className="terminal-panel p-5 mb-6 bg-[#0f172a] border border-[#334155]">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#334155]">
        <div>
          <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold">
            PIPELINE FREQUENCY METRICS
          </span>
          <h3 className="text-sm font-display font-bold text-white tracking-wide">
            30-Day Crawl Consistency & Throughput
          </h3>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-blue-500"></span>
            <span>Extracted Rows</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500"></span>
            <span>Verified Checksums</span>
          </div>
        </div>
      </div>

      <div className="w-full h-44 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#64748b"
              tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-[#0b0f19] border border-[#3b82f6] p-2 font-mono text-xs">
                    <div className="text-slate-400">{d.day} ago</div>
                    <div className="text-blue-400 font-bold">{d.extracted} rows crawled</div>
                    <div className="text-emerald-400 font-bold">{d.verified} checksums validated</div>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="extracted"
              stroke="#3b82f6"
              fill="#1e3a8a"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="verified"
              stroke="#10b981"
              fill="#065f46"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-[#1e293b]">
        <span>30 Days Ago</span>
        <span>Mid-Period (Monetary Policy Committee Release)</span>
        <span className="text-blue-400 font-semibold">Latest Cycle (Current)</span>
      </div>

    </div>
  );
}
