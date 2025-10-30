import { STORAGE_KEYS } from '@/constants';

/**
 * Storage utility for localStorage
 */

export const storage = {
  /**
   * Get item from storage
   * @param {string} key - Storage key
   * @returns {any} Parsed value or null
   */
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  },

  /**
   * Set item in storage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  },

  /**
   * Remove item from storage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
  },

  /**
   * Clear all items from storage
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  /**
   * Check if key exists in storage
   * @param {string} key - Storage key
   * @returns {boolean} True if exists
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },
};

/**
 * Auth-specific storage utilities
 */
export const authStorage = {
  getToken() {
    return storage.get(STORAGE_KEYS.AUTH_TOKEN);
  },

  setToken(token) {
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  removeToken() {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },

  getRefreshToken() {
    return storage.get(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken(token) {
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  removeRefreshToken() {
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  getUser() {
    return storage.get(STORAGE_KEYS.USER);
  },

  setUser(user) {
    storage.set(STORAGE_KEYS.USER, user);
  },

  removeUser() {
    storage.remove(STORAGE_KEYS.USER);
  },

  clearAuth() {
    authStorage.removeToken();
    authStorage.removeRefreshToken();
    authStorage.removeUser();
  },
};
