import axios from "axios";
import {
  mockCategories,
  mockIndicators,
  mockSources,
  mockCpiSeries,
  mockUsdInrSeries,
  mockUpiSeries,
  mockRepoRateSeries,
  mockObservations,
  mockRevisions,
} from "./mockData";

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3500, // Quick timeout so fallback engages cleanly if backend is off
  headers: { "Content-Type": "application/json" },
});

let isUsingMock = false;

export const rbiApi = {
  // Catalog & Categories
  getCategories: async (params = { page: 1, page_size: 50 }) => {
    try {
      if (isUsingMock) {
        return {
          items: mockCategories,
          total: mockCategories.length,
          page: params.page || 1,
          page_size: params.page_size || 50,
          total_pages: 1,
        };
      }
      const res = await apiClient.get("/categories", { params });
      return res.data;
    } catch {
      isUsingMock = true;
      return {
        items: mockCategories,
        total: mockCategories.length,
        page: params.page || 1,
        page_size: params.page_size || 50,
        total_pages: 1,
      };
    }
  },

  getIndicators: async (params = { page: 1, page_size: 50 }) => {
    try {
      if (isUsingMock) {
        let items = [...mockIndicators];
        if (params.category_id) {
          items = items.filter((i) => i.category_id === Number(params.category_id));
        }
        if (params.search) {
          const q = params.search.toLowerCase();
          items = items.filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              i.code.toLowerCase().includes(q) ||
              i.description.toLowerCase().includes(q)
          );
        }
        return {
          items,
          total: items.length,
          page: params.page || 1,
          page_size: params.page_size || 50,
          total_pages: 1,
        };
      }
      const res = await apiClient.get("/indicators", { params });
      return res.data;
    } catch {
      isUsingMock = true;
      let items = [...mockIndicators];
      if (params.category_id) {
        items = items.filter((i) => i.category_id === Number(params.category_id));
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        items = items.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            i.code.toLowerCase().includes(q) ||
            i.description.toLowerCase().includes(q)
        );
      }
      return {
        items,
        total: items.length,
        page: params.page || 1,
        page_size: params.page_size || 50,
        total_pages: 1,
      };
    }
  },

  getIndicatorDetail: async (idOrSlug) => {
    try {
      if (isUsingMock) {
        const found =
          mockIndicators.find(
            (i) => i.id === Number(idOrSlug) || i.slug === idOrSlug || i.code === idOrSlug
          ) || mockIndicators[0];
        const category = mockCategories.find((c) => c.id === found.category_id);
        const source = mockSources.find((s) => s.id === found.source_id);
        return { ...found, category, source };
      }
      const res = await apiClient.get(`/indicators/${idOrSlug}`);
      return res.data;
    } catch {
      isUsingMock = true;
      const found =
        mockIndicators.find(
          (i) => i.id === Number(idOrSlug) || i.slug === idOrSlug || i.code === idOrSlug
        ) || mockIndicators[0];
      const category = mockCategories.find((c) => c.id === found.category_id);
      const source = mockSources.find((s) => s.id === found.source_id);
      return { ...found, category, source };
    }
  },

  // Time Series for Charts
  getSeries: async (indicatorId, params = {}) => {
    try {
      if (isUsingMock) {
        if (Number(indicatorId) === 2 || indicatorId === "usd-inr-reference-rate") return mockUsdInrSeries;
        if (Number(indicatorId) === 3 || indicatorId === "upi-monthly-volume") return mockUpiSeries;
        if (Number(indicatorId) === 4 || indicatorId === "policy-repo-rate") return mockRepoRateSeries;
        return mockCpiSeries;
      }
      const res = await apiClient.get(`/indicators/${indicatorId}/series`, { params });
      return res.data;
    } catch {
      isUsingMock = true;
      if (Number(indicatorId) === 2 || indicatorId === "usd-inr-reference-rate") return mockUsdInrSeries;
      if (Number(indicatorId) === 3 || indicatorId === "upi-monthly-volume") return mockUpiSeries;
      if (Number(indicatorId) === 4 || indicatorId === "policy-repo-rate") return mockRepoRateSeries;
      return mockCpiSeries;
    }
  },

  // Raw Observations & Historical Revisions
  getObservations: async (indicatorId, params = { page: 1, page_size: 50 }) => {
    try {
      if (isUsingMock) {
        return {
          items: mockObservations,
          total: mockObservations.length,
          page: params.page || 1,
          page_size: params.page_size || 50,
          total_pages: 1,
        };
      }
      const res = await apiClient.get(`/indicators/${indicatorId}/observations`, { params });
      return res.data;
    } catch {
      isUsingMock = true;
      return {
        items: mockObservations,
        total: mockObservations.length,
        page: params.page || 1,
        page_size: params.page_size || 50,
        total_pages: 1,
      };
    }
  },

  getRevisions: async (indicatorId, params = { page: 1, page_size: 50 }) => {
    try {
      if (isUsingMock) {
        return {
          items: mockRevisions,
          total: mockRevisions.length,
          page: params.page || 1,
          page_size: params.page_size || 50,
          total_pages: 1,
        };
      }
      const res = await apiClient.get(`/indicators/${indicatorId}/revisions`, { params });
      return res.data;
    } catch {
      isUsingMock = true;
      return {
        items: mockRevisions,
        total: mockRevisions.length,
        page: params.page || 1,
        page_size: params.page_size || 50,
        total_pages: 1,
      };
    }
  },

  // Sources & Directory
  getSources: async () => {
    try {
      if (isUsingMock) return { items: mockSources, total: mockSources.length };
      const res = await apiClient.get("/sources");
      return res.data;
    } catch {
      isUsingMock = true;
      return { items: mockSources, total: mockSources.length };
    }
  },
};
