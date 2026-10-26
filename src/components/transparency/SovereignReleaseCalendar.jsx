import React, { useState } from "react";
import { Calendar, Clock, Landmark, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const RELEASE_SCHEDULE = [
  {
    id: "cpi",
    name: "Consumer Price Index (Combined)",
    code: "CPI_COMBINED_GENERAL",
    slug: "cpi-combined-general",
    authority: "MoSPI National Statistical Office (NSO)",
    cadence: "Monthly",
    schedule: "12th of every month @ 17:30 IST",
    statutoryRef: "Base Year 2024=100",
    nature: "Provisional [P] with 1-month final revision",
    status: "Active Cycle",
    statusColor: "emerald",
  },
  {
    id: "wpi",
    name: "Wholesale Price Index (Headline)",
    code: "WPI_INFLATION_ALL",
    slug: "wholesale-price-index",
    authority: "Office of the Economic Adviser (DPIIT)",
    cadence: "Monthly",
    schedule: "14th of every month @ 12:00 IST",
    statutoryRef: "Base Year 2011-12=100",
    nature: "Provisional [P] updated with an 8-week lag",
    status: "Active Cycle",
    statusColor: "emerald",
  },
  {
    id: "forex",
    name: "Foreign Exchange Reserves",
    code: "FOREX_RESERVES_USD",
    slug: "forex-reserves",
    authority: "Reserve Bank of India (RBI WSS)",
    cadence: "Weekly",
    schedule: "Every Friday @ 17:00 IST",
    statutoryRef: "Weekly Statistical Supplement Table 2",
    nature: "Comprehensive reserve assets breakdown",
    status: "Upcoming Friday",
    statusColor: "blue",
  },
  {
    id: "repo",
    name: "Policy Repo Rate & Corridor",
    code: "REPO_RATE",
    slug: "policy-repo-rate",
    authority: "Monetary Policy Committee (MPC)",
    cadence: "Bi-Monthly",
    schedule: "First week of Feb, Apr, Jun, Aug, Oct, Dec",
    statutoryRef: "RBI Act 1934 Section 45ZB Resolution",
    nature: "Binding policy rate + voting stance minutes",
    status: "Dec 4–6, 2026",
    statusColor: "amber",
  },
  {
    id: "fbil",
    name: "FBIL USD / INR Reference Rate",
    code: "FBIL_USD_INR_RATE",
    slug: "fbil-usd-inr-reference-rate",
    authority: "Financial Benchmarks India (FBIL)",
    cadence: "Daily (Trading Days)",
    schedule: "Every Business Day @ 13:30 IST",
    statutoryRef: "15-minute interbank polled snapshot",
    nature: "Spot official benchmark settlement rate",
    status: "Daily Fixing",
    statusColor: "emerald",
  },
  {
    id: "upi",
    name: "UPI Digital Gross Settlement",
    code: "UPI_MONTHLY_VOLUME",
    slug: "upi-transaction-volume",
    authority: "National Payments Corp of India (NPCI)",
    cadence: "Monthly",
    schedule: "1st of every month @ 10:00 IST",
    statutoryRef: "NPCI Central Payment Switch Data",
    nature: "Transactional aggregate volume and value",
    status: "Active Cycle",
    statusColor: "emerald",
  },
];

export default function SovereignReleaseCalendar() {
  const [filterCadence, setFilterCadence] = useState("ALL");

  const filtered = filterCadence === "ALL"
    ? RELEASE_SCHEDULE
    : RELEASE_SCHEDULE.filter((item) => item.cadence.toUpperCase().includes(filterCadence));

  return (
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#334155]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>SOVEREIGN PUBLICATION CADENCE</span>
          </div>
          <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white tracking-wide">
            Official Central Bank & Ministry Release Schedule
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans mt-0.5">
            Standard publication calendar specifying statutory release timing, primary sovereign agencies, and revision lag windows.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 font-mono text-xs shrink-0 self-start sm:self-auto">
          {["ALL", "MONTHLY", "WEEKLY", "DAILY"].map((cadence) => (
            <button
              key={cadence}
              onClick={() => setFilterCadence(cadence)}
              className={`px-3 py-1.5 border transition-colors font-semibold ${
                filterCadence === cadence
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-50 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-[#334155] hover:bg-slate-100 dark:hover:bg-[#1e293b]"
              }`}
            >
              {cadence}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-300 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">Indicator Series</th>
              <th className="py-3 px-4 font-bold">Publishing Authority</th>
              <th className="py-3 px-4 font-bold">Cadence</th>
              <th className="py-3 px-4 font-bold">Official Release Schedule</th>
              <th className="py-3 px-4 font-bold">Lifecycle & Nature</th>
              <th className="py-3 px-4 font-bold text-right">Series Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-[#1e293b]">
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 dark:hover:bg-[#111827] transition-colors"
              >
                {/* Indicator Series */}
                <td className="py-3.5 px-4 font-sans">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-[11px] font-mono text-blue-700 dark:text-blue-400 mt-0.5">
                    {item.code}
                  </div>
                </td>

                {/* Authority */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                    <span>{item.authority}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.statutoryRef}
                  </div>
                </td>

                {/* Cadence */}
                <td className="py-3.5 px-4 font-mono">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-[#0b0f19] border border-slate-300 dark:border-[#334155] text-slate-800 dark:text-slate-300 text-[11px] font-bold">
                    {item.cadence}
                  </span>
                </td>

                {/* Schedule */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{item.schedule}</span>
                  </div>
                </td>

                {/* Nature & Lifecycle */}
                <td className="py-3.5 px-4">
                  <span className="text-slate-700 dark:text-slate-300 leading-snug">
                    {item.nature}
                  </span>
                </td>

                {/* Action Link */}
                <td className="py-3.5 px-4 text-right">
                  <Link
                    to={`/indicators/${item.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2"
                  >
                    <span>View Series</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info Strip */}
      <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-[#1e293b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Statutory release schedules are governed by the Special Data Dissemination Standard (SDDS) of the IMF.</span>
        </div>
        <div className="text-slate-500 dark:text-slate-400 text-[11px]">
          All times Indian Standard Time (IST = UTC+05:30)
        </div>
      </div>

    </div>
  );
}