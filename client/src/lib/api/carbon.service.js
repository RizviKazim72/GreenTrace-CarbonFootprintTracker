import { api } from './client';
import { API_ENDPOINTS } from '@/constants';

/**
 * Carbon Footprint Service
 */
export const carbonService = {
  /**
   * Calculate carbon footprint
   * @param {Object} data - Input data (electricity, fuel, transport, etc.)
   * @returns {Promise} Calculation result
   */
  calculate(data) {
    return api.post(API_ENDPOINTS.CARBON.CALCULATE, data);
  },

  /**
   * Get carbon footprint history
   * @param {Object} params - Query parameters (page, size, period)
   * @returns {Promise} History data
   */
  getHistory(params = {}) {
    return api.get(API_ENDPOINTS.CARBON.HISTORY, { params });
  },

  /**
   * Get carbon footprint by ID
   * @param {string} id - Footprint ID
   * @returns {Promise} Footprint data
   */
  getById(id) {
    return api.get(API_ENDPOINTS.CARBON.BY_ID(id));
  },

  /**
   * Get carbon footprint statistics
   * @param {Object} params - Query parameters (period, groupBy)
   * @returns {Promise} Statistics data
   */
  getStatistics(params = {}) {
    return api.get(API_ENDPOINTS.CARBON.STATISTICS, { params });
  },

  /**
   * Delete carbon footprint entry
   * @param {string} id - Footprint ID
   * @returns {Promise} Success message
   */
  delete(id) {
    return api.delete(API_ENDPOINTS.CARBON.BY_ID(id));
  },
};
