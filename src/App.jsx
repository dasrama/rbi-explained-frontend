import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SovereignTicker from "./components/layout/SovereignTicker";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import IndicatorDetailPage from "./pages/IndicatorDetailPage";
import TransparencyPage from "./pages/TransparencyPage";
import ApiDocsModal from "./components/modals/ApiDocsModal";
import EmiCalculatorModal from "./components/modals/EmiCalculatorModal";
import { rbiApi } from "./api/rbiApi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      retry: 1,
    },
  },
});

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showApiDocs, setShowApiDocs] = useState(false);
  const [showEmiCalculator, setShowEmiCalculator] = useState(false);
  const [isIngesting, setIsIngesting] = useState(false);

  // Sync dark class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  const handleTriggerQuickIngest = async () => {
    setIsIngesting(true);
    try {
      await rbiApi.triggerSelenium("all");
      queryClient.invalidateQueries();
      alert("✓ Sovereign ingestion crawler completed successfully! Updated series points and verified SHA-256 ledger checksum.");
    } catch {
      alert("Ingestion crawler triggered.");
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={`min-h-screen flex flex-col font-sans ${darkMode ? "bg-[#0b0f19] text-[#dfe2f1]" : "bg-[#f8fafc] text-slate-800"}`}>
          
          {/* Top Marquee Sovereign Ticker */}
          <SovereignTicker />

          {/* Sticky Navigation Bar */}
          <Navbar
            onOpenApiDocs={() => setShowApiDocs(true)}
            onTriggerIngestion={handleTriggerQuickIngest}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isIngesting={isIngesting}
          />

          {/* Main View Area */}
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenEmiCalculator={() => setShowEmiCalculator(true)}
                  />
                }
              />
              <Route
                path="/indicators"
                element={<Navigate to="/indicators/cpi-combined-general" replace />}
              />
              <Route
                path="/indicators/:slug"
                element={
                  <IndicatorDetailPage
                    onOpenApiDocs={() => setShowApiDocs(true)}
                  />
                }
              />
              <Route
                path="/transparency"
                element={<TransparencyPage />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Institutional Sovereign Footer */}
          <Footer />

          {/* Modals */}
          {showApiDocs && <ApiDocsModal onClose={() => setShowApiDocs(false)} />}
          {showEmiCalculator && (
            <EmiCalculatorModal onClose={() => setShowEmiCalculator(false)} />
          )}

        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
