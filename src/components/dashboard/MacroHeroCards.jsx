import React from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Minus, 
  ChevronRight,
  Calculator,
  Sparkles
} from "lucide-react";

export default function MacroHeroCards({ onOpenEmiCalculator }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. CPI Retail Inflation */}
      <div className="flip-card min-h-[300px] h-full cursor-pointer">
        <div className="flip-card-inner">
          
          {/* Front Face: Clear Values & Headline */}
          <div className="flip-card-front glass-panel p-5 flex flex-col justify-between h-full shadow-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">CPI COMBINED NSO</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800 font-bold text-[11px]">
                    [P] PROV
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">MONTHLY</span>
                </div>
              </div>

              <h3 className="text-sm font-mono text-slate-800 dark:text-slate-200 font-bold tracking-tight">
                Retail Inflation
              </h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">5.66%</span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">YoY</span>
              </div>

              <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                Index: 110.37 <span className="text-slate-500 font-normal">(Base 2024=100)</span>
              </div>

              {/* Corridor Tag */}
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60 text-xs font-mono text-blue-800 dark:text-blue-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Target Band: 4.0% ± 2.0%
              </div>

              {/* Sparkline & Delta */}
              <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200/70 dark:border-slate-800/70">
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

            {/* Resting Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
              <Link
                to="/indicators/cpi-combined-general"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold group-hover:underline"
              >
                <span>Explore Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                CPI Headline
              </span>
            </div>
          </div>

          {/* Back Face: Full Plain-English Meaning */}
          <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/95 dark:bg-[#0c1427]/95 border-2 border-blue-500/60 shadow-xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2.5 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Plain-English Meaning
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  MONTHLY METRIC
                </span>
              </div>

              <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                Retail Inflation (CPI Headline)
              </h4>
              <div className="mt-1 text-xs font-mono text-red-600 dark:text-red-400 font-bold">
                Current Level: 5.66% YoY [Target 4% ±2%]
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
                Groceries and everyday household services cost <strong>5.66%</strong> more than the exact same month last year. When headline inflation sits near the 6.00% ceiling, central bank rate cuts are paused to protect citizen purchasing power.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <Link
                to="/indicators/cpi-combined-general"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold flex items-center gap-1"
              >
                <span>Open Full Series Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 2. USD / INR Spot */}
      <div className="flip-card min-h-[300px] h-full cursor-pointer">
        <div className="flip-card-inner">
          
          {/* Front Face: Clear Values & Headline */}
          <div className="flip-card-front glass-panel p-5 flex flex-col justify-between h-full shadow-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">FBIL REFERENCE</span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-400 border border-blue-300 dark:border-blue-800 font-bold text-[11px]">
                  DAILY
                </span>
              </div>

              <h3 className="text-sm font-mono text-slate-800 dark:text-slate-200 font-bold tracking-tight">
                USD / INR Spot
              </h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">₹84.05</span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">/ USD</span>
              </div>

              <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                14 Oct 2026 Close
              </div>

              {/* 52W Range Strip */}
              <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-[#0b0f19] px-2.5 py-1.5 border border-slate-200/80 dark:border-[#1e293b]">
                <span>52W L: ₹82.80</span>
                <span className="text-slate-400 dark:text-slate-600">|</span>
                <span>52W H: ₹84.40</span>
              </div>

              {/* Sparkline & Delta */}
              <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200/70 dark:border-slate-800/70">
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

            {/* Resting Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
              <Link
                to="/indicators/fbil-usd-inr-reference-rate"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold group-hover:underline"
              >
                <span>Explore Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                Interbank Spot
              </span>
            </div>
          </div>

          {/* Back Face: Full Plain-English Meaning */}
          <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/95 dark:bg-[#0c1427]/95 border-2 border-blue-500/60 shadow-xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2.5 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Plain-English Meaning
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  DAILY BENCHMARK
                </span>
              </div>

              <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                USD / INR Reference Spot
              </h4>
              <div className="mt-1 text-xs font-mono text-blue-700 dark:text-blue-400 font-bold">
                Polled Rate: ₹84.0520 / USD
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
                Official FBIL/RBI reference rate. The Rupee remains remarkably anchored against global currencies due to robust Reserve Bank foreign exchange interventions and historic foreign currency reserve buffers ($704B+).
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <Link
                to="/indicators/fbil-usd-inr-reference-rate"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold flex items-center gap-1"
              >
                <span>Open Full Series Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Policy Repo Rate */}
      <div className="flip-card min-h-[300px] h-full cursor-pointer">
        <div className="flip-card-inner">
          
          {/* Front Face: Clear Values & Headline */}
          <div className="flip-card-front glass-panel p-5 flex flex-col justify-between h-full shadow-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">MONETARY POLICY</span>
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold text-[11px]">
                  MONTHLY
                </span>
              </div>

              <h3 className="text-sm font-mono text-slate-800 dark:text-slate-200 font-bold tracking-tight">
                Policy Repo Rate
              </h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">6.50%</span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">Annual</span>
              </div>

              <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span>SDF Floor: 6.25%</span>
                <span className="text-slate-400 dark:text-slate-600">|</span>
                <span>MSF Ceiling: 6.75%</span>
              </div>

              {/* Next MPC Badge */}
              <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-800 dark:text-slate-200 bg-slate-50/80 dark:bg-[#0b0f19] px-2.5 py-1.5 border border-slate-200/80 dark:border-[#1e293b]">
                <span className="text-amber-700 dark:text-amber-400 font-semibold">NEXT MPC: Dec 4-6, 2026</span>
                <span className="text-slate-600 dark:text-slate-400">Stance: Neutral</span>
              </div>

              {/* Stepped line indicator */}
              <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200/70 dark:border-slate-800/70">
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

            {/* Resting Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
              <Link
                to="/indicators/policy-repo-rate"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold group-hover:underline"
              >
                <span>Explore Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                Key Policy Rate
              </span>
            </div>
          </div>

          {/* Back Face: Full Plain-English Meaning */}
          <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/95 dark:bg-[#0c1427]/95 border-2 border-blue-500/60 shadow-xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2.5 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Plain-English Meaning
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  MONETARY STANCE
                </span>
              </div>

              <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                Monetary Policy Repo Rate
              </h4>
              <div className="mt-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                Current Anchor: 6.50% Annual
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
                The key interest rate at which the RBI lends money to commercial banks. A <strong>25 bps shift</strong> in the repo rate adjusts a ₹50 Lakh home loan EMI by ~₹800 per month and directly affects fixed deposit yields.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              {onOpenEmiCalculator && (
                <button
                  onClick={onOpenEmiCalculator}
                  className="text-xs font-mono text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1 font-bold"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Simulate EMI</span>
                </button>
              )}
              <Link
                to="/indicators/policy-repo-rate"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
              >
                Ledger →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 4. UPI Digital Volume */}
      <div className="flip-card min-h-[300px] h-full cursor-pointer">
        <div className="flip-card-inner">
          
          {/* Front Face: Clear Values & Headline */}
          <div className="flip-card-front glass-panel p-5 flex flex-col justify-between h-full shadow-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">NPCI INFRASTRUCTURE</span>
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-bold text-[11px]">
                  RECORD
                </span>
              </div>

              <h3 className="text-sm font-mono text-slate-800 dark:text-slate-200 font-bold tracking-tight">
                UPI Digital Volume
              </h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">15,042.8M</span>
              </div>

              <div className="mt-1 text-xs font-mono text-slate-700 dark:text-slate-300 font-medium">
                15.04 Billion Monthly Txns
              </div>

              {/* Total Value */}
              <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-emerald-900 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 px-2.5 py-1.5 border border-emerald-200/80 dark:border-emerald-800/60 font-medium">
                <span>Value: ₹20.64 Lakh Cr</span>
                <span className="text-slate-500 dark:text-slate-400">($248B)</span>
              </div>

              {/* Sparkline & Delta */}
              <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200/70 dark:border-slate-800/70">
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

            {/* Resting Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
              <Link
                to="/indicators/upi-monthly-volume"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold group-hover:underline"
              >
                <span>Explore Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                Retail Payments
              </span>
            </div>
          </div>

          {/* Back Face: Full Plain-English Meaning */}
          <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/95 dark:bg-[#0c1427]/95 border-2 border-blue-500/60 shadow-xl">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2.5 pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Plain-English Meaning
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  RECORD VOLUME
                </span>
              </div>

              <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                UPI Gross Settlement Volume
              </h4>
              <div className="mt-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                15,042.8 Million Transactions
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
                India's real-time payment network processed over <strong>500 million transactions</strong> seamlessly through bank rails every single day, clearing ₹20.64 Lakh Crore without settlement lag.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <Link
                to="/indicators/upi-monthly-volume"
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold flex items-center gap-1"
              >
                <span>Open Full Series Ledger</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
