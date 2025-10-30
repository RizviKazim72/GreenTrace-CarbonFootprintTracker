import axios from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT } from '@/constants';
import { authStorage } from '@/lib/utils';
import toast from 'react-hot-toast';

/**
 * Axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Add auth token to requests
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle common errors
 */
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { response } = error;

    // Network error
    if (!response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    // Handle specific status codes
    switch (response.status) {
      case 400:
        // Bad Request - Show error message from backend
        const errorMsg = response.data?.error || response.data?.message || 'Bad request. Please check your input.';
        toast.error(errorMsg);
        break;

      case 401:
        // Unauthorized - Clear auth and redirect to login
        authStorage.clearAuth();
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
        break;

      case 403:
        toast.error('You are not authorized to perform this action.');
        break;

      case 404:
        toast.error('Resource not found.');
        break;

      case 422:
        // Validation error
        const validationErrors = response.data?.errors || {};
        const errorMessages = Object.values(validationErrors).flat();
        if (errorMessages.length > 0) {
          errorMessages.forEach(msg => toast.error(msg));
        } else {
          toast.error('Validation error. Please check your input.');
        }
        break;

      case 500:
        toast.error('Server error. Please try again later.');
        break;

      default:
        toast.error(response.data?.error || response.data?.message || 'Something went wrong.');
    }

    return Promise.reject(error);
  }
);

/**
 * API Service - Common HTTP methods
 */
export const api = {
  /**
   * GET request
   * @param {string} url - Endpoint URL
   * @param {Object} config - Axios config
   * @returns {Promise} Response data
   */
  get(url, config = {}) {
    return apiClient.get(url, config);
  },

  /**
   * POST request
   * @param {string} url - Endpoint URL
   * @param {Object} data - Request body
   * @param {Object} config - Axios config
   * @returns {Promise} Response data
   */
  post(url, data = {}, config = {}) {
    return apiClient.post(url, data, config);
  },

  /**
   * PUT request
   * @param {string} url - Endpoint URL
   * @param {Object} data - Request body
   * @param {Object} config - Axios config
   * @returns {Promise} Response data
   */
  put(url, data = {}, config = {}) {
    return apiClient.put(url, data, config);
  },

  /**
   * PATCH request
   * @param {string} url - Endpoint URL
   * @param {Object} data - Request body
   * @param {Object} config - Axios config
   * @returns {Promise} Response data
   */
  patch(url, data = {}, config = {}) {
    return apiClient.patch(url, data, config);
  },

  /**
   * DELETE request
   * @param {string} url - Endpoint URL
   * @param {Object} config - Axios config
   * @returns {Promise} Response data
   */
  delete(url, config = {}) {
    return apiClient.delete(url, config);
  },

  /**
   * Upload file
   * @param {string} url - Endpoint URL
   * @param {FormData} formData - Form data with file
   * @param {Function} onUploadProgress - Progress callback
   * @returns {Promise} Response data
   */
  upload(url, formData, onUploadProgress) {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },

  /**
   * Download file
   * @param {string} url - Endpoint URL
   * @param {string} filename - Filename for download
   * @returns {Promise} Blob
   */
  async download(url, filename) {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });
    
    // Create download link
    const blob = new Blob([response]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    
    return response;
  },
};

export default apiClient;
