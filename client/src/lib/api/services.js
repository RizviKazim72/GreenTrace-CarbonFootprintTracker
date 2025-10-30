import { api } from './client';
import { API_ENDPOINTS } from '@/constants';

/**
 * Leaderboard Service
 */
export const leaderboardService = {
  /**
   * Get leaderboard rankings
   * @param {Object} params - Query parameters (period, industry, limit)
   * @returns {Promise} Leaderboard data
   */
  getRankings(params = {}) {
    return api.get(API_ENDPOINTS.LEADERBOARD.RANKINGS, { params });
  },

  /**
   * Get top companies
   * @param {string} industry - Industry filter (optional)
   * @param {number} limit - Number of companies (default: 50)
   * @returns {Promise} Top companies
   */
  getTopCompanies(industry = null, limit = 50) {
    const params = { limit };
    if (industry) params.industry = industry;
    return api.get(API_ENDPOINTS.LEADERBOARD.TOP, { params });
  },

  /**
   * Get my ranking
   * @returns {Promise} My ranking data
   */
  getMyRanking() {
    return api.get(API_ENDPOINTS.LEADERBOARD.MY_RANKING);
  },

  /**
   * Get leaderboard by industry
   * @param {string} industry - Industry type
   * @param {Object} params - Query parameters
   * @returns {Promise} Industry leaderboard
   */
  getByIndustry(industry, params = {}) {
    return api.get(API_ENDPOINTS.LEADERBOARD.BY_INDUSTRY(industry), { params });
  },
};

/**
 * Carbon Footprint Service
 */
export const carbonService = {
  /**
   * Calculate carbon footprint
   * @param {Object} data - Emission data
   * @returns {Promise} Calculation result
   */
  calculate(data) {
    return api.post(API_ENDPOINTS.CARBON.CALCULATE, data);
  },

  /**
   * Get calculation history
   * @param {Object} params - Query parameters
   * @returns {Promise} History data
   */
  getHistory(params = {}) {
    return api.get(API_ENDPOINTS.CARBON.HISTORY, { params });
  },

  /**
   * Get calculation by ID
   * @param {string} id - Calculation ID
   * @returns {Promise} Calculation data
   */
  getById(id) {
    return api.get(API_ENDPOINTS.CARBON.BY_ID(id));
  },

  /**
   * Get statistics
   * @param {Object} params - Query parameters
   * @returns {Promise} Statistics data
   */
  getStatistics(params = {}) {
    return api.get(API_ENDPOINTS.CARBON.STATISTICS, { params });
  },
};

/**
 * Green Points Service
 */
export const greenPointsService = {
  /**
   * Get current points balance
   * @returns {Promise} Points balance
   */
  getBalance() {
    return api.get(API_ENDPOINTS.POINTS.BALANCE);
  },

  /**
   * Get points history
   * @param {string} startDate - Start date (optional)
   * @param {string} endDate - End date (optional)
   * @returns {Promise} Points history
   */
  getHistory(startDate = null, endDate = null) {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return api.get(API_ENDPOINTS.POINTS.HISTORY, { params });
  },

  /**
   * Get points transactions
   * @param {Object} params - Query parameters (page, size, type)
   * @returns {Promise} Transactions
   */
  getTransactions(params = {}) {
    return api.get(API_ENDPOINTS.POINTS.TRANSACTIONS, { params });
  },
};

/**
 * Company Service
 */
export const companyService = {
  /**
   * Get company profile
   * @returns {Promise} Company data
   */
  getProfile() {
    return api.get(API_ENDPOINTS.COMPANIES.PROFILE);
  },

  /**
   * Update company profile
   * @param {Object} data - Updated data
   * @returns {Promise} Updated company
   */
  updateProfile(data) {
    return api.put(API_ENDPOINTS.COMPANIES.UPDATE, data);
  },

  /**
   * Get company by ID
   * @param {string} id - Company ID
   * @returns {Promise} Company data
   */
  getById(id) {
    return api.get(API_ENDPOINTS.COMPANIES.BY_ID(id));
  },

  /**
   * Get all companies (admin)
   * @param {Object} params - Query parameters
   * @returns {Promise} Companies list
   */
  getAll(params = {}) {
    return api.get(API_ENDPOINTS.COMPANIES.BASE, { params });
  },
};

/**
 * Reports Service
 */
export const reportsService = {
  /**
   * Generate sustainability report
   * @param {Object} data - Report parameters (period, format)
   * @returns {Promise} Report data
   */
  generate(data) {
    return api.post(API_ENDPOINTS.REPORTS.GENERATE, data);
  },

  /**
   * Download report
   * @param {string} id - Report ID
   * @param {string} filename - Filename for download
   * @returns {Promise} Blob
   */
  download(id, filename) {
    return api.download(API_ENDPOINTS.REPORTS.DOWNLOAD(id), filename);
  },

  /**
   * Get reports list
   * @param {Object} params - Query parameters
   * @returns {Promise} Reports list
   */
  getList(params = {}) {
    return api.get(API_ENDPOINTS.REPORTS.LIST, { params });
  },
};

/**
 * Comparison Service
 */
export const comparisonService = {
  /**
   * Get industry average comparison
   * @param {string} industry - Industry type
   * @returns {Promise} Comparison data
   */
  getIndustryAverage(industry) {
    return api.get(API_ENDPOINTS.COMPARISON.INDUSTRY_AVERAGE, { 
      params: { industry } 
    });
  },

  /**
   * Get competitors comparison
   * @param {Object} params - Query parameters
   * @returns {Promise} Comparison data
   */
  getCompetitors(params = {}) {
    return api.get(API_ENDPOINTS.COMPARISON.COMPETITORS, { params });
  },

  /**
   * Get benchmark data
   * @returns {Promise} Benchmark data
   */
  getBenchmark() {
    return api.get(API_ENDPOINTS.COMPARISON.BENCHMARK);
  },
};

/**
 * Dashboard Service
 */
export const dashboardService = {
  /**
   * Get dashboard overview
   * @returns {Promise} Overview data
   */
  getOverview() {
    return api.get(API_ENDPOINTS.DASHBOARD.OVERVIEW);
  },

  /**
   * Get analytics data
   * @param {Object} params - Query parameters (period, metrics)
   * @returns {Promise} Analytics data
   */
  getAnalytics(params = {}) {
    return api.get(API_ENDPOINTS.DASHBOARD.ANALYTICS, { params });
  },

  /**
   * Get insights and recommendations
   * @returns {Promise} Insights data
   */
  getInsights() {
    return api.get(API_ENDPOINTS.DASHBOARD.INSIGHTS);
  },
};
