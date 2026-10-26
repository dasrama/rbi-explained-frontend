import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Landmark, 
  TrendingUp, 
  BarChart2, 
  ShieldCheck, 
  Calculator, 
  Sun, 
  Moon, 
  Menu, 
  X 
} from "lucide-react";

const FLOATER_HEADLINES = [
  { label: "CPI Headline", value: "5.66% YoY", meta: "Target: 4.0% ±2%", path: "/indicators/cpi-combined-general", color: "text-red-600 dark:text-red-400" },
  { label: "USD / INR Spot", value: "₹84.05", meta: "+0.14% Day", path: "/indicators/fbil-usd-inr-reference-rate", color: "text-blue-700 dark:text-blue-400" },
  { label: "Policy Repo Rate", value: "6.50%", meta: "Neutral Stance", path: "/indicators/policy-repo-rate", color: "text-emerald-700 dark:text-emerald-400" },
  { label: "UPI Monthly Volume", value: "15,042M Txns", meta: "₹20.64L Cr", path: "/indicators/upi-transaction-volume", color: "text-emerald-700 dark:text-emerald-400" },
  { label: "Forex Reserves", value: "$704.88B", meta: "All-Time High", path: "/indicators/forex-reserves", color: "text-amber-700 dark:text-amber-400" },
  { label: "WPI Inflation", value: "1.84%", meta: "Producer Costs Modest", path: "/indicators/wholesale-price-index", color: "text-emerald-700 dark:text-emerald-400" },
  { label: "WACR Call Rate", value: "6.43%", meta: "Target 6.50%", path: "/indicators/policy-repo-rate", color: "text-slate-700 dark:text-slate-300" },
  { label: "Bank Credit", value: "+13.8% YoY", meta: "Retail / Services", path: "/", color: "text-blue-700 dark:text-blue-400" },
];

export default function Navbar({ darkMode, setDarkMode, onOpenEmiCalculator }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: "Macro Overview", path: "/", icon: TrendingUp },
    { name: "Indicator Explorer", path: "/indicators/cpi-combined-general", icon: BarChart2 },
    { name: "Data Transparency", path: "/transparency", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#334155] shadow-xs transition-colors">
      
      {/* 1. Main Navigation Bar */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 border border-blue-700 dark:border-blue-500 bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors shrink-0">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  RBI INDIA EXPLAINED
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-bold uppercase tracking-wider hidden sm:inline-block">
                  CENTRAL BANK OBSERVATORY
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-tight hidden md:inline">
                Reserve Bank of India • Macroeconomic Intelligence & Policy Transparency
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1.5 font-mono text-xs">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 transition-all flex items-center gap-2 border font-semibold ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs font-bold"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Utility Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Live Data Status Pulse (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-[#1e293b] font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">Live Sovereign Data</span>
          </div>

          {/* Home Loan EMI Calculator Trigger */}
          {onOpenEmiCalculator && (
            <button
              onClick={onOpenEmiCalculator}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/70 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Simulate Home Loan EMI changes based on RBI Repo Rate"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>EMI Tool</span>
            </button>
          )}

          {/* Theme Mode Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#0f172a] dark:hover:bg-[#1e293b] border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
            title={darkMode ? "Switch to Clean Light Mode" : "Switch to High-Contrast Dark Mode"}
            aria-label="Toggle display theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#0f172a] dark:hover:bg-[#1e293b] border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* 2. Integrated Floater Headline Marquee Bar */}
      <div className="w-full bg-slate-100 dark:bg-[#070a12] border-t border-slate-200 dark:border-[#1e293b] text-xs font-mono h-8 flex items-center select-none overflow-hidden relative">
        {/* Left Anchor Label with solid background to prevent overlap */}
        <div className="flex items-center gap-2 shrink-0 px-3 sm:px-4 h-full bg-slate-200/90 dark:bg-[#0d1322] border-r border-slate-300 dark:border-[#1e293b] z-20 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] whitespace-nowrap">
            MACRO HEADLINES
          </span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="flex-1 overflow-hidden relative flex items-center h-full">
          {/* Subtle Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-100 dark:from-[#070a12] to-transparent z-10 pointer-events-none" />

          {/* Infinite Marquee Line */}
          <div className="flex items-center whitespace-nowrap animate-marquee hover:pause gap-7 pl-4 text-xs font-mono">
            {FLOATER_HEADLINES.concat(FLOATER_HEADLINES).map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity group cursor-pointer"
              >
                <span className="text-slate-600 dark:text-slate-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.label}:
                </span>
                <span className={`font-bold ${item.color}`}>
                  {item.value}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  ({item.meta})
                </span>
                <span className="text-slate-400 dark:text-slate-600 font-bold ml-3">
                  |
                </span>
              </Link>
            ))}
          </div>

          {/* Subtle Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-100 dark:from-[#070a12] to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* 3. Mobile Drawer / Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-[#334155] bg-white dark:bg-[#0b0f19] px-4 py-3 space-y-2 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1 font-mono text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 flex items-center gap-2 border font-semibold ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#1e293b]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-500"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-200 dark:border-[#1e293b] flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live Central Bank Verified
            </span>
            <span>IST 15:30</span>
          </div>
        </div>
      )}

      {/* 4. Secondary Quick Nav Bar for Medium/Mobile (always visible clean tabs) */}
      <div className="lg:hidden flex border-t border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#070a12] font-mono text-xs overflow-x-auto divide-x divide-slate-200 dark:divide-[#1e293b]">
        {navLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex-1 text-center py-2 px-2 whitespace-nowrap transition-colors font-semibold ${
                active 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-700 dark:text-slate-300 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
