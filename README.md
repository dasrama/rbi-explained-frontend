# RBI India Explained (Sovereign Macroeconomic Dashboard)

> A modern, responsive, production-ready financial data terminal for the **Reserve Bank of India (RBI) Economic Indicators**. Converts dry central bank statistical bulletins into interactive visual corridors, key metrics, plain-English explanations, and cryptographic revision audit trails.

---

## 🏛️ Sovereign Macro Terminal Aesthetic
Designed according to institutional financial terminal specifications:
- **Palette:** Void Navy (`#0B0F19`), Slate Base (`#0F172A`), Active Surface (`#1E293B`), Structural Divider (`#334155`), Sovereign Blue (`#3B82F6`), Vibrant Emerald (`#10B981`), Ruby Red (`#EF4444`), Policy Amber (`#F59E0B`).
- **Typography:**
  - **Space Grotesk:** Display headlines & metric titles.
  - **JetBrains Mono:** Tabular figures (`tnum`, `zero`), timestamps, basis point deltas, and terminal codes.
  - **Geist / Inter:** Analytical plain-English narratives.
- **Geometry:** 0px radius sharp rectilinear architectural structure with 1px border dividers.
- **Theme Support:** Sovereign High-Contrast Dark Mode & Clean Institutional Light Mode.

---

## ⚡ Core Pages & Features

### 1. Macro Overview (`/`)
- **Sovereign Marquee Ticker:** Real-time ticker stream displaying CPI Headline, USD/INR, Repo Rate, UPI Volume, Forex Reserves, WPI Inflation, and WACR.
- **Hero Pulse Briefing:** Plain-English flash briefing summarizing monetary stance, MPC cycle, and SHA-256 ledger sync status.
- **Top 4 Macro Cards:**
  - **Retail Inflation (CPI Combined):** 5.66% YoY, 110.37 index, Target Band 4.0% ± 2.0%, sparkline delta.
  - **USD / INR Reference Spot:** ₹84.05 / USD, 52-week slider (₹82.80 - ₹84.40), day change.
  - **Policy Repo Rate:** 6.50% annual, SDF/MSF corridors, next MPC meeting schedule, and interactive **Home Loan EMI Simulator**.
  - **UPI Digital Volume:** 15,042.8 Million transactions (₹20.64 Lakh Crore value, +35.4% YoY).
- **Corridor Real-Time Status:** Systemic liquidity tracking (₹45,862 Cr surplus, WACR at 6.43%).
- **Macroeconomic Indicator Index:** Searchable and filterable catalog with category tabs, frequency selectors, and `[P] Provisional` filter.
- **Monetary Economics Primer:** Explains Section 45ZB statutory tolerance corridors (2% floor, 4% target, 6% ceiling) and why central banks revise provisional statistics.

### 2. Indicator Detail View (`/indicators/:slug`)
- **Sovereign Breadcrumbs & Badges:** Frequency, units, and `[P] Provisional Figure Active` indicators.
- **Plain-English Explainer:** Real-life narrative translating dry index points into household grocery and purchasing power impact.
- **Measurable Price Driver Card:** Pinpoints specific category drivers (e.g., Food & Beverages seasonal vegetable spikes vs. anchored Core CPI).
- **Key Statistics Strip:** Current YoY Rate, Headline Index Level, 52-Week Range slider, 1-Year Moving Average, and Last Revised Series delta.
- **Interactive Recharts Canvas:**
  - Benchmark tolerance corridor (2.0% to 6.0%) with shaded band and 4.0% target dashed line.
  - Timeframe toggles (`6M`, `1Y`, `3Y`, `ALL`).
  - View modes: `YoY Inflation % (Corridor)`, `Index Level (2024=100)`, and `Dual-Axis Combo`.
  - Custom tooltips and dots highlighting provisional (`[P]`) and revised (`[R]`) points.
- **Dual Tabular Inspector:**
  - **Historical Observation Table:** 1-based pagination, CSV/Excel export, raw file tags, and status filters.
  - **Central Bank Revision Audit Trail:** Variance analysis (`+0.36 index pts`, `+0.33%`), revision reasons, and SHA-256 hashes.
- **Intelligence Nexus Widgets:** MPC Repo Rate Stance nexus, Wholesale Price Divergence (WPI vs CPI wedge), and Automated Ingestion API snippet.

### 3. Transparency & Ingestion View (`/transparency`)
- **System Health KPIs:** Backend API health, PostgreSQL/Timescale connection pool status, last automated ingest timestamp, and tracked observations count.
- **Admin Crawler Dispatcher & Telemetry Terminal:**
  - Allows triggering on-demand Selenium Chromium crawler for specific indicators or all series.
  - Live monospaced terminal displaying worker logs, SHA-256 checksums, and inserted/revised record counts.
  - Raw execution dump export.
- **30-Day Pipeline Consistency Chart:** Throughput area chart tracking extracted rows and verified checksums.
- **Upstream Sovereign Publishing Directory:** Official citations for RBI Bulletin, FBIL, NPCI, and MOSPI.
- **Ingestion Jobs Audit Trail:** Filterable execution log with CSV export.
- **Integrity Architecture Guide:** Deduplication via file-level SHA hashing, superseded record archiving, and open REST verification.

### 4. Interactive Modals
- **OpenAPI / Swagger Explorer:** Test live API endpoints interactively with JSON responses and copy functionality.
- **Home Loan EMI Simulator:** Interactive slider showing how a 25 bps shift in the Policy Repo Rate changes monthly EMIs and lifetime interest on loans up to ₹2 Crores.
- **Revision Detail Inspector:** Explains specific rural/urban survey coverage expansions and official Gazette notices.

---

## 🛠️ Tech Stack
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom terminal design system & CSS variables
- **Charts:** Recharts (ComposedChart, Area, Bar, Line, ReferenceArea, ReferenceLine)
- **Data Fetching:** TanStack React Query v5 & Axios
- **Icons:** Lucide React
- **Routing:** React Router DOM v7

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

### Backend API Connection & Fallback Engine
The frontend connects to `http://localhost:8000/api/v1` (configurable via `VITE_API_BASE_URL`).
If the backend is offline or starting up, the built-in **Sovereign Mock Engine** automatically engages with realistic, high-fidelity RBI and MOSPI dataset mocks, ensuring zero broken states or blank screens during testing or demos.
