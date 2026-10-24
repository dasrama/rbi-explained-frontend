import React from "react";
import { ShieldCheck, ExternalLink, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#070a12] border-t border-[#334155] text-slate-400 text-xs mt-16">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#1e293b]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-[#3b82f6] bg-[#0f172a] flex items-center justify-center text-[#3b82f6]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-white text-sm tracking-wide">
                RBI INDIA EXPLAINED
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
              Translating complex Reserve Bank of India monetary policy bulletins, statistical supplements, and systemic liquidity data into clean, transparent, and interpretable intelligence for citizens, academic researchers, and financial institutions.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-1">
              Data sourced under Open Government Data License (OGDL India) and RBI Statutory Disclosure Mandates.
            </div>
          </div>

          {/* Sovereign Data Sources */}
          <div>
            <h4 className="font-mono text-xs uppercase text-slate-200 tracking-wider mb-3">
              SOVEREIGN DATA SOURCES
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://dbie.rbi.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  DBIE (Database on Indian Economy)
                </a>
              </li>
              <li>
                <a
                  href="https://www.mospi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  MOSPI National Statistical Office
                </a>
              </li>
              <li>
                <a
                  href="https://www.npci.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  NPCI Digital Payment Reports
                </a>
              </li>
              <li>
                <a
                  href="https://www.fbil.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  FBIL Reference Rates
                </a>
              </li>
            </ul>
          </div>

          {/* Integrity & Ledger */}
          <div>
            <h4 className="font-mono text-xs uppercase text-slate-200 tracking-wider mb-3">
              DATA INTEGRITY & LEDGER
            </h4>
            <div className="bg-[#0f172a] border border-[#334155] p-3 space-y-2 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                SHA-256 Ledger Certified
              </div>
              <div className="text-slate-400 text-[10px] break-all font-mono">
                9c7a8c385b41ce45d078174f4b2ffb3662d
              </div>
              <div className="text-slate-500 text-[9px] uppercase tracking-wider">
                ZERO-TAMPER PIPELINE ACTIVE
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 Reserve Bank of India Statistical Intelligence Observatory. Statutory Public Domain Disclosures Apply.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Methodology & Revisions</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Developer REST Specs</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Disclaimer of Liability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
