import { api } from './client';
import { API_ENDPOINTS } from '@/constants';

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} User data with token
   */
  login(credentials) {
    return api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  /**
   * Register new company
   * @param {Object} data - Registration data
   * @returns {Promise} User data
   */
  register(data) {
    return api.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  /**
   * Logout user
   * @returns {Promise} Success message
   */
  logout() {
    return api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Refresh auth token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} New tokens
   */
  refreshToken(refreshToken) {
    return api.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  },

  /**
   * Get current user profile
   * @returns {Promise} User data
   */
  getCurrentUser() {
    return api.get(API_ENDPOINTS.AUTH.ME);
  },
};
