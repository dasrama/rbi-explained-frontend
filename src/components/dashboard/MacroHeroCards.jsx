import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Minus, 
  ChevronRight,
  Calculator,
  RotateCcw
} from "lucide-react";

/** Animated SVG sparkline with draw-on animation */
function Sparkline({ d, color, cx, cy }) {
  return (
    <svg className="w-24 h-6 overflow-visible" viewBox="0 0 100 24" fill="none">
      <path
        d={d}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        className="spark-animated"
      />
      <circle cx={cx} cy={cy} r="3" fill={color} />
    </svg>
  );
}

/** A single flip-card that is hover-flipped on desktop, click-flipped on touch devices */
function FlipCard({ children, minHeight = "min-h-[300px]" }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = useCallback((e) => {
    // Only use click-to-flip on touch-capable devices (coarse pointer)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      // Allow links inside to still navigate
      if (e.target.closest("a") || e.target.closest("button")) return;
      setFlipped((f) => !f);
    }
  }, []);

  return (
    <div
      className={`flip-card ${minHeight} h-full cursor-pointer${flipped ? " flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        {children}
      </div>
    </div>
  );
}

export default function MacroHeroCards({ onOpenEmiCalculator }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. CPI Retail Inflation */}
      <FlipCard>
        {/* Front Face */}
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
              <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight count-up">
                5.66%
              </span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">YoY</span>
            </div>

            <div className="mt-1 text-xs font-mono text-slate-600 dark:text-slate-400">
              Index: 110.37 <span className="text-slate-500 font-normal">(Base 2024=100)</span>
            </div>

            {/* Corridor Tag */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60 text-xs font-mono text-blue-800 dark:text-blue-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Target Band: 4.0% ± 2.0%
            </div>

            {/* Corridor progress bar */}
            <div className="mt-2 w-full">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>2%</span><span className="text-emerald-600 dark:text-emerald-400 font-bold">4%</span><span className="text-red-500">6%</span>
              </div>
              <div className="relative h-1.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-red-300 dark:from-emerald-900 dark:via-emerald-700 dark:to-red-900">
                {/* Current position marker at 5.66% → (5.66-2)/(6-2) = 91.5% */}
                <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-500 border-2 border-white dark:border-slate-900 rounded-full shadow-md" style={{ left: "91.5%", transform: "translate(-50%, -50%)" }} />
              </div>
            </div>

            {/* Sparkline & Delta */}
            <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200/70 dark:border-slate-800/70">
              <div className="flex items-center gap-1 text-xs font-mono text-red-600 dark:text-red-400 font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>+0.41% MoM</span>
              </div>
              <Sparkline d="M 0 18 Q 20 22, 40 14 T 70 12 T 100 4" color="#dc2626" cx={100} cy={4} />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
            <Link to="/indicators/cpi-combined-general" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold">
              <span>Explore Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1 opacity-60">
              <RotateCcw className="w-3 h-3" /> hover to explain
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/97 dark:bg-[#0c1427]/97 border-2 border-blue-500/60 shadow-xl">
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
              Retail Inflation (CPI Headline)
            </h4>
            <div className="mt-1 text-xs font-mono text-red-600 dark:text-red-400 font-bold">
              Current: 5.66% YoY [Target 4% ±2%]
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
              Groceries and everyday household services cost <strong>5.66%</strong> more than the same month last year. Near the 6% ceiling, central bank rate cuts stay paused to protect purchasing power.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
            <Link to="/indicators/cpi-combined-general" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold flex items-center gap-1">
              <span>Open Full Series Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </FlipCard>

      {/* 2. USD / INR Spot */}
      <FlipCard>
        {/* Front Face */}
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
              <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight count-up">
                ₹84.05
              </span>
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
              <Sparkline d="M 0 18 Q 30 16, 50 12 T 80 8 T 100 4" color="#2563eb" cx={100} cy={4} />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
            <Link to="/indicators/fbil-usd-inr-reference-rate" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold">
              <span>Explore Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1 opacity-60">
              <RotateCcw className="w-3 h-3" /> hover to explain
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/97 dark:bg-[#0c1427]/97 border-2 border-blue-500/60 shadow-xl">
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
              USD / INR Reference Spot
            </h4>
            <div className="mt-1 text-xs font-mono text-blue-700 dark:text-blue-400 font-bold">
              Polled Rate: ₹84.0520 / USD
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
              Official FBIL/RBI reference rate. The Rupee remains anchored due to robust Reserve Bank foreign exchange interventions and historic reserves ($704B+), limiting import cost volatility.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
            <Link to="/indicators/fbil-usd-inr-reference-rate" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold flex items-center gap-1">
              <span>Open Full Series Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </FlipCard>

      {/* 3. Policy Repo Rate */}
      <FlipCard>
        {/* Front Face */}
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
              <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight count-up">
                6.50%
              </span>
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

            {/* Sparkline & Delta */}
            <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-200/70 dark:border-slate-800/70">
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                <Minus className="w-4 h-4" />
                <span>Paused 9 Quarters</span>
              </div>
              <Sparkline d="M 0 20 H 30 V 12 H 60 V 6 H 100" color="#059669" cx={100} cy={6} />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
            <Link to="/indicators/policy-repo-rate" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold">
              <span>Explore Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1 opacity-60">
              <RotateCcw className="w-3 h-3" /> hover to explain
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/97 dark:bg-[#0c1427]/97 border-2 border-blue-500/60 shadow-xl">
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
              Monetary Policy Repo Rate
            </h4>
            <div className="mt-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              Current Anchor: 6.50% Annual
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
              The key interest rate at which the RBI lends money to commercial banks. A <strong>25 bps shift</strong> in the repo rate adjusts a ₹50 Lakh home loan EMI by ~₹800/month and directly affects fixed deposit yields.
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
            <Link to="/indicators/policy-repo-rate" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold">
              Ledger →
            </Link>
          </div>
        </div>
      </FlipCard>

      {/* 4. UPI Digital Volume */}
      <FlipCard>
        {/* Front Face */}
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
              <span className="text-3xl sm:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-400 tracking-tight count-up">
                15,042.8M
              </span>
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
              <Sparkline d="M 0 20 Q 25 18, 50 14 T 80 8 T 100 2" color="#059669" cx={100} cy={2} />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs font-mono">
            <Link to="/indicators/upi-monthly-volume" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 font-semibold">
              <span>Explore Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1 opacity-60">
              <RotateCcw className="w-3 h-3" /> hover to explain
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div className="flip-card-back glass-panel p-5 flex flex-col justify-between h-full bg-slate-50/97 dark:bg-[#0c1427]/97 border-2 border-blue-500/60 shadow-xl">
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
              UPI Gross Settlement Volume
            </h4>
            <div className="mt-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              15,042.8 Million Transactions
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-sans">
              India's real-time payment network processed over <strong>500 million transactions</strong> every single day, clearing ₹20.64 Lakh Crore through bank rails without settlement lag.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
            <Link to="/indicators/upi-monthly-volume" className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold flex items-center gap-1">
              <span>Open Full Series Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </FlipCard>

    </div>
  );
}
