import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import IndicatorDetailPage from "./pages/IndicatorDetailPage";
import TransparencyPage from "./pages/TransparencyPage";
import EmiCalculatorModal from "./components/modals/EmiCalculatorModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      retry: 1,
    },
  },
});

function AppContent() {
  const { darkMode, setDarkMode } = useTheme();
  const [showEmiCalculator, setShowEmiCalculator] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#070a12] text-slate-900 dark:text-[#dfe2f1] transition-colors duration-200">
      
      {/* Revamped Sticky Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenEmiCalculator={() => setShowEmiCalculator(true)}
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
            element={<IndicatorDetailPage />}
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

      {/* Home Loan EMI Calculator Modal */}
      {showEmiCalculator && (
        <EmiCalculatorModal onClose={() => setShowEmiCalculator(false)} />
      )}

    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
