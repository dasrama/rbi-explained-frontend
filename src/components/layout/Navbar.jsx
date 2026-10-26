import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  Database, 
  RefreshCw, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Layers
} from "lucide-react";

export default function Navbar({ onTriggerRefresh, darkMode, setDarkMode, isRefreshing }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur border-b border-slate-200 dark:border-[#334155] transition-colors">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 h-15 flex items-center justify-between">
        
        {/* Brand Logo & Authority Label */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-none border border-blue-600 dark:border-[#3b82f6] bg-blue-50 dark:bg-[#0f172a] flex items-center justify-center text-blue-600 dark:text-[#3b82f6] shadow-sm group-hover:border-blue-500 transition-colors">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-[#3b82f6]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm sm:text-base tracking-wide text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  RBI INDIA EXPLAINED
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-semibold uppercase">
                  SOVEREIGN
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-tight hidden sm:inline">
                Macroeconomic Indicators & Sovereign Data Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
          <Link
            to="/"
            className={`px-4 py-2 transition-all flex items-center gap-1.5 border font-medium ${
              isActive("/")
                ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] border-transparent"
            }`}
          >
            <Activity className="w-4 h-4" />
            Macro Overview
          </Link>

          <Link
            to="/indicators/cpi-combined-general"
            className={`px-4 py-2 transition-all flex items-center gap-1.5 border font-medium ${
              isActive("/indicators")
                ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] border-transparent"
            }`}
          >
            <Layers className="w-4 h-4" />
            Indicator Explorer
          </Link>

          <Link
            to="/transparency"
            className={`px-4 py-2 transition-all flex items-center gap-1.5 border font-medium ${
              isActive("/transparency")
                ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] border-transparent"
            }`}
          >
            <Database className="w-4 h-4" />
            Data Transparency
          </Link>
        </nav>

        {/* Right Status Block & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Data Freshness Indicator */}
          <div className="flex flex-col text-right font-mono text-xs leading-tight text-slate-500 dark:text-slate-400">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">DATA FRESHNESS</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold">Today, 17:42 IST</span>
          </div>

          {/* Refresh Data Button */}
          <button
            onClick={onTriggerRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-[#334155] text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-[#334155] text-xs font-mono flex items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50 font-semibold"
            title="Refresh Economic Data Series"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#0f172a] dark:hover:bg-[#1e293b] border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-slate-300 transition-colors"
            title="Toggle Dark / Light Mode"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex border-t border-slate-200 dark:border-[#334155] bg-slate-100 dark:bg-[#0f172a] font-mono text-xs overflow-x-auto">
        <Link
          to="/"
          className={`flex-1 text-center py-2.5 px-2 border-r border-slate-200 dark:border-[#334155] whitespace-nowrap font-medium ${
            isActive("/") ? "bg-blue-600 text-white font-bold" : "text-slate-700 dark:text-slate-300"
          }`}
        >
          Overview
        </Link>
        <Link
          to="/indicators/cpi-combined-general"
          className={`flex-1 text-center py-2.5 px-2 border-r border-slate-200 dark:border-[#334155] whitespace-nowrap font-medium ${
            isActive("/indicators") ? "bg-blue-600 text-white font-bold" : "text-slate-700 dark:text-slate-300"
          }`}
        >
          Explorer
        </Link>
        <Link
          to="/transparency"
          className={`flex-1 text-center py-2.5 px-2 whitespace-nowrap font-medium ${
            isActive("/transparency") ? "bg-blue-600 text-white font-bold" : "text-slate-700 dark:text-slate-300"
          }`}
        >
          Data Transparency
        </Link>
      </div>
    </header>
  );
}
