import React, { useState } from "react";
import { X, Calculator, ArrowRight, ShieldCheck, TrendingUp, TrendingDown } from "lucide-react";
import { formatIndianNumber } from "../../utils/formatters";

export default function EmiCalculatorModal({ onClose }) {
  const [loanAmountLakhs, setLoanAmountLakhs] = useState(50); // in ₹ Lakhs (50 = ₹50,00,000)
  const [tenureYears, setTenureYears] = useState(20);
  const [bpsChange, setBpsChange] = useState(25); // bps change (-50, -25, 0, 25, 50)

  const baseRepoRate = 6.50;
  const bankSpread = 2.25; // standard retail home loan spread
  const currentInterestRate = baseRepoRate + bankSpread; // 8.75%
  const simulatedRate = currentInterestRate + (bpsChange / 100);

  // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEmi = (principal, annualRate, years) => {
    const monthlyRate = (annualRate / 100) / 12;
    const months = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const principal = loanAmountLakhs * 100000;
  const currentEmi = calculateEmi(principal, currentInterestRate, tenureYears);
  const newEmi = calculateEmi(principal, simulatedRate, tenureYears);
  const emiDifference = newEmi - currentEmi;
  const totalInterestDiff = emiDifference * (tenureYears * 12);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-[#0f172a] border border-[#3b82f6] shadow-2xl relative font-mono text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0b0f19] border-b border-[#334155]">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-white font-display font-bold text-sm tracking-wide">
              Monetary Policy Transmission — Retail Home Loan Calculator
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-[#1e293b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          
          <div className="p-3 bg-[#0b0f19] border border-[#1e293b] text-slate-300 text-xs font-sans leading-relaxed">
            All floating retail home loans in India are pegged to the <strong>External Benchmark Lending Rate (EBLR)</strong>, which is tied directly to the RBI Repo Rate (currently <strong>6.50%</strong>).
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400 text-xs">Loan Principal Amount:</span>
                <span className="text-white font-bold text-sm">₹{loanAmountLakhs} Lakhs</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={loanAmountLakhs}
                onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                className="w-full accent-[#3b82f6] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>₹10 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹2 Crores</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400 text-xs">Loan Tenure:</span>
                <span className="text-white font-bold text-sm">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#3b82f6] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>5 Years</span>
                <span>20 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* BPS Shift Selector */}
            <div>
              <span className="text-slate-400 text-xs block mb-1.5">Simulate MPC Repo Rate Decision:</span>
              <div className="grid grid-cols-5 gap-1.5">
                {[-50, -25, 0, 25, 50].map((shift) => (
                  <button
                    key={shift}
                    onClick={() => setBpsChange(shift)}
                    className={`py-1.5 border text-center font-bold text-xs transition-colors ${
                      bpsChange === shift
                        ? "bg-[#3b82f6] text-white border-[#3b82f6]"
                        : "bg-[#0b0f19] border-[#334155] text-slate-400 hover:text-white"
                    }`}
                  >
                    {shift > 0 ? `+${shift} bps` : shift === 0 ? "Pause (0)" : `${shift} bps`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Calculation Matrix */}
          <div className="p-4 bg-[#0b0f19] border border-[#3b82f6] grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">CURRENT MONTHLY EMI</div>
              <div className="text-xl font-bold text-white mt-0.5">
                ₹{formatIndianNumber(currentEmi, 0)}
              </div>
              <div className="text-[10px] text-slate-500">Rate: {currentInterestRate.toFixed(2)}% (Repo 6.50% + 2.25%)</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase">
                {bpsChange === 0 ? "NO POLICY CHANGE" : bpsChange > 0 ? "AFTER RATE HIKE" : "AFTER RATE CUT"}
              </div>
              <div className={`text-xl font-bold mt-0.5 ${
                bpsChange > 0 ? "text-red-400" : bpsChange < 0 ? "text-emerald-400" : "text-slate-300"
              }`}>
                ₹{formatIndianNumber(newEmi, 0)}
              </div>
              <div className="text-[10px] text-slate-400">
                {emiDifference === 0 ? "0 / month" : `${emiDifference > 0 ? `+₹${emiDifference}` : `−₹${Math.abs(emiDifference)}`} / month`}
              </div>
            </div>
          </div>

          {/* Plain-English summary */}
          <div className="p-3 bg-[#070a12] border border-[#1e293b] text-slate-300 text-xs leading-relaxed font-sans">
            {bpsChange === 0 ? (
              <span>When the MPC keeps the policy rate unchanged at 6.50%, your borrowing costs and EMI remain stable.</span>
            ) : (
              <span>
                A <strong className="text-white">{Math.abs(bpsChange)} bps {bpsChange > 0 ? "hike" : "cut"}</strong> in the Repo Rate adjusts your EMI by approximately <strong className="text-blue-400">₹{Math.abs(emiDifference)}/month</strong>, totaling <strong className="text-emerald-400">₹{formatIndianNumber(Math.abs(totalInterestDiff), 0)}</strong> in lifetime interest impact over {tenureYears} years.
              </span>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#0b0f19] border-t border-[#1e293b] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-slate-200 hover:text-white border border-[#334155] text-xs font-mono transition-colors"
          >
            Close Calculator
          </button>
        </div>

      </div>
    </div>
  );
}
