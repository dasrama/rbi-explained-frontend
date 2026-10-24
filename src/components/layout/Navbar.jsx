import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  Database, 
  FileCode, 
  RefreshCw, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Layers
} from "lucide-react";

export default function Navbar({ onOpenApiDocs, onTriggerIngestion, darkMode, setDarkMode, isIngesting }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0f19]/95 backdrop-blur border-b border-[#334155]">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Brand Logo & Authority Label */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-none border border-[#3b82f6] bg-[#0f172a] flex items-center justify-center text-[#3b82f6] shadow-sm group-hover:border-blue-400 transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm tracking-wide text-white group-hover:text-blue-400 transition-colors">
                  RBI INDIA EXPLAINED
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono bg-blue-950/80 text-blue-400 border border-blue-800/80 uppercase">
                  SOVEREIGN
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:inline">
                Macroeconomic Indicators & Sovereign Data Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation Tabs - Modern Pill / Tab System */}
        <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
          <Link
            to="/"
            className={`px-3.5 py-1.5 transition-all flex items-center gap-1.5 border ${
              isActive("/")
                ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-[#1e293b] border-transparent"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Macro Overview
          </Link>

          <Link
            to="/indicators/cpi-combined-general"
            className={`px-3.5 py-1.5 transition-all flex items-center gap-1.5 border ${
              isActive("/indicators")
                ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-[#1e293b] border-transparent"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Indicator Explorer
          </Link>

          <Link
            to="/transparency"
            className={`px-3.5 py-1.5 transition-all flex items-center gap-1.5 border ${
              isActive("/transparency")
                ? "bg-[#3b82f6] text-white border-[#3b82f6] font-semibold shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-[#1e293b] border-transparent"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Transparency & Ingestion
          </Link>

          <button
            onClick={onOpenApiDocs}
            className="px-3.5 py-1.5 text-slate-300 hover:text-white hover:bg-[#1e293b] border border-transparent transition-all flex items-center gap-1.5"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            API Docs / Swagger
          </button>
        </nav>

        {/* Right Status Block & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* API Health Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#0f172a] border border-[#334155] text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-medium">API Online</span>
            <span className="text-slate-500">v1.0.0</span>
          </div>

          {/* Data Freshness */}
          <div className="hidden xl:flex flex-col text-right font-mono text-[10px] leading-tight text-slate-400 border-l border-[#334155] pl-3">
            <span className="text-slate-500 text-[9px] uppercase tracking-wider">DATA FRESHNESS</span>
            <span className="text-slate-200 font-medium">Today, 17:42 IST</span>
          </div>

          {/* Trigger Ingestion Button */}
          <button
            onClick={onTriggerIngestion}
            disabled={isIngesting}
            className="px-2.5 sm:px-3 py-1.5 bg-[#1e293b] hover:bg-[#334155] text-slate-200 hover:text-white border border-[#334155] text-xs font-mono flex items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
            title="Trigger On-Demand Selenium Ingestion Crawler"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isIngesting ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Trigger Ingestion</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 bg-[#0f172a] hover:bg-[#1e293b] border border-[#334155] text-slate-400 hover:text-slate-200 transition-colors"
            title="Toggle High-Contrast Sovereign Dark / Light Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex border-t border-[#334155] bg-[#0f172a] font-mono text-[11px] overflow-x-auto">
        <Link
          to="/"
          className={`flex-1 text-center py-2 px-2 border-r border-[#334155] whitespace-nowrap ${
            isActive("/") ? "bg-[#3b82f6] text-white font-medium" : "text-slate-300"
          }`}
        >
          Overview
        </Link>
        <Link
          to="/indicators/cpi-combined-general"
          className={`flex-1 text-center py-2 px-2 border-r border-[#334155] whitespace-nowrap ${
            isActive("/indicators") ? "bg-[#3b82f6] text-white font-medium" : "text-slate-300"
          }`}
        >
          Explorer
        </Link>
        <Link
          to="/transparency"
          className={`flex-1 text-center py-2 px-2 border-r border-[#334155] whitespace-nowrap ${
            isActive("/transparency") ? "bg-[#3b82f6] text-white font-medium" : "text-slate-300"
          }`}
        >
          Transparency
        </Link>
        <button
          onClick={onOpenApiDocs}
          className="flex-1 text-center py-2 px-2 text-amber-400 whitespace-nowrap"
        >
          Swagger API
        </button>
      </div>
    </header>
  );
}
