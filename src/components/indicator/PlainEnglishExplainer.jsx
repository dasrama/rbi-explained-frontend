import React from "react";
import { MessageSquareQuote, TrendingUp, AlertCircle, Sparkles } from "lucide-react";

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
    <div className="terminal-panel p-5 mb-6 bg-[#0a0e18] border-l-4 border-l-[#3b82f6]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Everyday Life Explanation */}
        <div className="lg:col-span-2 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
            <MessageSquareQuote className="w-4 h-4 text-blue-400" />
            <span>What this metric means in everyday life</span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {indicator.everyday_explanation || indicator.description}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-blue-400 font-semibold">Ordinary Citizen Impact:</span>
            <span>Helps families and students gauge how purchasing power fluctuates month-over-month.</span>
          </div>
        </div>

        {/* Right 1 Col: Measurable Driver Box */}
        <div className="p-3.5 bg-[#0f172a] border border-[#334155] font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                {driver.title}
              </span>
              <span className="px-1.5 py-0.2 bg-emerald-950/80 border border-emerald-800 text-[9px]">
                {driver.badge}
              </span>
            </div>

            <p className="text-slate-300 text-[11px] leading-relaxed">
              {driver.content}
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-[#1e293b] text-[10px] text-slate-400 leading-tight">
            {driver.core}
          </div>
        </div>

      </div>
    </div>
  );
}
