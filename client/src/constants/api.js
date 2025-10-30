/**
 * API Configuration Constants
 */

// Base API URL - Change based on environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  
  // Companies
  COMPANIES: {
    BASE: '/companies',
    BY_ID: (id) => `/companies/${id}`,
    PROFILE: '/companies/profile',
    UPDATE: '/companies/update',
  },
  
  // Carbon Footprint
  CARBON: {
    BASE: '/carbon-footprint',
    CALCULATE: '/carbon-footprint/calculate',
    HISTORY: '/carbon-footprint/history',
    BY_ID: (id) => `/carbon-footprint/${id}`,
    STATISTICS: '/carbon-footprint/statistics',
  },
  
  // Green Points
  POINTS: {
    BASE: '/green-points',
    BALANCE: '/green-points/balance',
    HISTORY: '/green-points/history',
    TRANSACTIONS: '/green-points/transactions',
  },
  
  // Leaderboard
  LEADERBOARD: {
    BASE: '/leaderboard',
    TOP: '/leaderboard/top',
    MY_RANKING: '/leaderboard/my-ranking',
    BY_INDUSTRY: (industry) => `/leaderboard/industry/${industry}`,
    RANKINGS: '/leaderboard/rankings',
  },
  
  // Reports
  REPORTS: {
    BASE: '/reports',
    GENERATE: '/reports/generate',
    DOWNLOAD: (id) => `/reports/download/${id}`,
    LIST: '/reports/list',
  },
  
  // Comparison
  COMPARISON: {
    INDUSTRY_AVERAGE: '/comparison/industry-average',
    COMPETITORS: '/comparison/competitors',
    BENCHMARK: '/comparison/benchmark',
  },
  
  // Dashboard
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    ANALYTICS: '/dashboard/analytics',
    INSIGHTS: '/dashboard/insights',
  },
};

// Request timeout (ms)
export const REQUEST_TIMEOUT = 30000;

// Retry configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};
