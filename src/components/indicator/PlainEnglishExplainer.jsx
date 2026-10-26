import React from "react";
import { MessageSquareQuote, Sparkles } from "lucide-react";

export default function PlainEnglishExplainer({ indicator }) {
  if (!indicator) return null;

  // Custom driver text based on indicator code
  const getDriver = () => {
    if (indicator.code === "CPI_COMBINED_GENERAL") {
      return {
        title: "MEASURABLE PRICE DRIVER (AUG 2026)",
        badge: "NSO MOSPI",
        content: "Food & Beverages stood elevated at 6.10%, pressurized by seasonal supply disruptions across tomato and onion transport corridors.",
        core: "Core CPI (Ex Food & Fuel): 3.40% YoY. Underlying consumer goods demand remains anchored safely below the 4% statutory target.",
      };
    }
    if (indicator.code === "USD_INR_REF_RATE") {
      return {
        title: "PRIMARY FOREX DRIVER (OCT 2026)",
        badge: "FBIL DESK",
        content: "Elevated US Treasury yields and crude oil import demand offset by active RBI dollar-selling intervention via state-run banks.",
        core: "Real Effective Exchange Rate (REER): Index indicates Rupee is trading close to fair sovereign trade-weighted parity.",
      };
    }
    if (indicator.code === "REPO_RATE") {
      return {
        title: "MPC RESOLUTION STANCE (OCT 2026)",
        badge: "MPC 5-1 VOTE",
        content: "Monetary Policy Committee voted 5-1 to maintain status quo at 6.50% while shifting stance from 'Withdrawal of Accommodation' to 'Neutral'.",
        core: "Transmission Tracker: Cumulative 250 bps repo hike fully passed to external benchmark loan rates (EBLR).",
      };
    }
    return {
      title: "DIGITAL INFRASTRUCTURE DRIVER",
      badge: "NPCI REPORT",
      content: "Merchant QR code payments (P2M) represent 62% of transaction count, with average ticket size ₹1,372.",
      core: "Systemic Reliability: 99.98% uptime achieved across major commercial bank CBS switches.",
    };
  };

  const driver = getDriver();

  return (
    <div className="terminal-panel p-5 sm:p-6 mb-6 bg-white dark:bg-[#0a0e18] border border-slate-200 dark:border-[#334155] border-l-4 border-l-blue-600 dark:border-l-[#3B82F6 ] shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Everyday Life Explanation */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>What this metric means in everyday life</span>
          </div>

          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
            {indicator.everyday_explanation || indicator.description}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="text-blue-700 dark:text-blue-400 font-bold">Ordinary Citizen Impact:</span>
            <span>Helps families and students gauge how purchasing power fluctuates month-over-month.</span>
          </div>
        </div>

        {/* Right 1 Col: Measurable Driver Box */}
        <div className="p-4 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {driver.title}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-[10px] text-emerald-900 dark:text-emerald-300 font-bold">
                {driver.badge}
              </span>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-sans">
              {driver.content}
            </p>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-slate-200 dark:border-[#1e293b] text-xs text-slate-600 dark:text-slate-400 leading-snug">
            {driver.core}
          </div>
        </div>

      </div>
    </div>
  );
}
