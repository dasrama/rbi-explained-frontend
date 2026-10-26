import React from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ChevronRight,
  Calculator
} from "lucide-react";

export default function MacroHeroCards({ onOpenEmiCalculator }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. CPI Retail Inflation */}
      <div className="terminal-panel p-4 sm:p-5 flex flex-col justify-between hover:border-blue-500 transition-colors group relative bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">CPI COMBINED NSO</span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800 font-bold text-[11px]">
                [P] PROV
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">MONTHLY</span>
            </div>
          </div>

          <h3 className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">Retail Inflation</h3>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">5.66%</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">YoY</span>
          </div>

          <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400">
            Index: 110.37 <span className="text-slate-500 font-normal">(Base 2024=100)</span>
          </div>

          {/* Corridor Tag */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-xs font-mono text-blue-800 dark:text-blue-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Target Band: 4.0% ± 2.0%
          </div>

          {/* Sparkline & Delta */}
          <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200 dark:border-[#1e293b]">
            <div className="flex items-center gap-1 text-xs font-mono text-red-600 dark:text-red-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+0.41% MoM</span>
            </div>

            {/* Red Sparkline */}
            <svg className="w-24 h-6 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 18 Q 20 22, 40 14 T 70 12 T 100 4"
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="4" r="3" fill="#dc2626" />
            </svg>
          </div>
        </div>

        {/* Plain-English Box */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1e293b]">
          <div className="p-2.5 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-[#1e293b] text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
            <strong className="font-semibold text-blue-700 dark:text-blue-400 font-mono">Plain-English: </strong>
            Groceries and services cost 5.66% more than the same month last year.
          </div>

          <Link
            to="/indicators/cpi-combined-general"
            className="mt-2.5 text-xs font-mono text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-between pt-1 font-semibold group-hover:underline"
          >
            <span>Explore Chart & Ledger</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 2. USD / INR Spot */}
      <div className="terminal-panel p-4 sm:p-5 flex flex-col justify-between hover:border-blue-500 transition-colors group relative bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">FBIL REFERENCE</span>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-400 border border-blue-300 dark:border-blue-800 font-bold text-[11px]">
              DAILY
            </span>
          </div>

          <h3 className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">USD / INR Spot</h3>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">₹84.05</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">/ USD</span>
          </div>

          <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400">
            14 Oct 2026 Close
          </div>

          {/* 52W Range Strip */}
          <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0b0f19] px-2.5 py-1.5 border border-slate-200 dark:border-[#1e293b]">
            <span>52W L: ₹82.80</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span>52W H: ₹84.40</span>
          </div>

          {/* Sparkline & Delta */}
          <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200 dark:border-[#1e293b]">
            <div className="flex items-center gap-1 text-xs font-mono text-blue-700 dark:text-blue-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+0.12 (+0.14%) Day</span>
            </div>

            {/* Blue Sparkline */}
            <svg className="w-24 h-6 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 18 Q 30 16, 50 12 T 80 8 T 100 4"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="4" r="3" fill="#2563eb" />
            </svg>
          </div>
        </div>

        {/* Plain-English Box */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1e293b]">
          <div className="p-2.5 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-[#1e293b] text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
            <strong className="font-semibold text-blue-700 dark:text-blue-400 font-mono">Plain-English: </strong>
            Official FBIL/RBI reference rate. Rupee stable under active central bank liquidity interventions.
          </div>

          <Link
            to="/indicators/usd-inr-reference-rate"
            className="mt-2.5 text-xs font-mono text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-between pt-1 font-semibold group-hover:underline"
          >
            <span>Explore Chart & Ledger</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 3. Policy Repo Rate */}
      <div className="terminal-panel p-4 sm:p-5 flex flex-col justify-between hover:border-blue-500 transition-colors group relative bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">MONETARY POLICY</span>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold text-[11px]">
              MONTHLY
            </span>
          </div>

          <h3 className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">Policy Repo Rate</h3>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">6.50%</span>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">Annual</span>
          </div>

          <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <span>SDF Floor: 6.25%</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span>MSF Ceiling: 6.75%</span>
          </div>

          {/* Next MPC Badge */}
          <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#0b0f19] px-2.5 py-1.5 border border-slate-200 dark:border-[#1e293b]">
            <span className="text-amber-700 dark:text-amber-400 font-semibold">NEXT MPC: Dec 4-6, 2026</span>
            <span className="text-slate-600 dark:text-slate-400">Stance: Neutral</span>
          </div>

          {/* Stepped line indicator */}
          <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200 dark:border-[#1e293b]">
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              <Minus className="w-4 h-4" />
              <span>Paused 9 Quarters</span>
            </div>

            {/* Stepped Sparkline */}
            <svg className="w-24 h-6 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 20 H 30 V 12 H 60 V 6 H 100"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              <circle cx="100" cy="6" r="3" fill="#059669" />
            </svg>
          </div>
        </div>

        {/* Plain-English Box & EMI Calculator Button */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1e293b]">
          <div className="p-2.5 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-[#1e293b] text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
            <strong className="font-semibold text-blue-700 dark:text-blue-400 font-mono">Plain-English: </strong>
            A 25 bps shift adjusts a ₹50L home loan EMI by ~₹800 / month.
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <button
              onClick={onOpenEmiCalculator}
              className="text-xs font-mono text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1 font-bold"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulate EMI Impact</span>
            </button>
            <Link
              to="/indicators/policy-repo-rate"
              className="text-xs font-mono text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
            >
              Ledger →
            </Link>
          </div>
        </div>
      </div>

      {/* 4. UPI Digital Volume */}
      <div className="terminal-panel p-4 sm:p-5 flex flex-col justify-between hover:border-blue-500 transition-colors group relative bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] shadow-sm">
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">NPCI INFRASTRUCTURE</span>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold text-[11px]">
              RECORD
            </span>
          </div>

          <h3 className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">UPI Digital Volume</h3>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">15,042.8M</span>
          </div>

          <div className="mt-1 text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">
            15.04 Billion Monthly Txns
          </div>

          {/* Total Value */}
          <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1.5 border border-emerald-200 dark:border-emerald-800/60 font-medium">
            <span>Value: ₹20.64 Lakh Cr</span>
            <span className="text-slate-500 dark:text-slate-400">($248B)</span>
          </div>

          {/* Sparkline & Delta */}
          <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200 dark:border-[#1e293b]">
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+35.4% YoY | +3.4% MoM</span>
            </div>

            {/* Emerald Sparkline */}
            <svg className="w-24 h-6 overflow-visible" viewBox="0 0 100 24" fill="none">
              <path
                d="M 0 20 Q 25 18, 50 14 T 80 8 T 100 2"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="2" r="3" fill="#059669" />
            </svg>
          </div>
        </div>

        {/* Plain-English Box */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#1e293b]">
          <div className="p-2.5 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-[#1e293b] text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
            <strong className="font-semibold text-blue-700 dark:text-blue-400 font-mono">Plain-English: </strong>
            India's real-time payment network processed over 500 million transactions every single day.
          </div>

          <Link
            to="/indicators/upi-monthly-volume"
            className="mt-2.5 text-xs font-mono text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-between pt-1 font-semibold group-hover:underline"
          >
            <span>Explore Chart & Ledger</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}
